@description('Azure region for all resources.')
param location string

@description('Tags applied to every resource (includes azd-env-name).')
param tags object

@description('Short unique token used to name resources.')
param resourceToken string

param modelName string
param modelVersion string
param modelCapacity int

// Cognitive Services User — data-plane role the agent needs to call the model.
var cognitiveServicesUserRoleId = 'a97b65f3-24c7-4388-baec-2e87135dc908'
// AcrPull — lets the Container App pull its image from the registry.
var acrPullRoleId = '7f951dda-4ed3-4680-a7ca-43fe172d538d'

resource logAnalytics 'Microsoft.OperationalInsights/workspaces@2023-09-01' = {
  name: 'log-${resourceToken}'
  location: location
  tags: tags
  properties: {
    sku: { name: 'PerGB2018' }
    retentionInDays: 30
  }
}

resource appInsights 'Microsoft.Insights/components@2020-02-02' = {
  name: 'appi-${resourceToken}'
  location: location
  tags: tags
  kind: 'web'
  properties: {
    Application_Type: 'web'
    WorkspaceResourceId: logAnalytics.id
  }
}

resource registry 'Microsoft.ContainerRegistry/registries@2023-11-01-preview' = {
  name: 'acr${resourceToken}'
  location: location
  tags: tags
  sku: { name: 'Basic' }
  properties: {
    adminUserEnabled: false
  }
}

resource identity 'Microsoft.ManagedIdentity/userAssignedIdentities@2023-01-31' = {
  name: 'id-${resourceToken}'
  location: location
  tags: tags
}

resource acrPull 'Microsoft.Authorization/roleAssignments@2022-04-01' = {
  name: guid(registry.id, identity.id, acrPullRoleId)
  scope: registry
  properties: {
    roleDefinitionId: subscriptionResourceId('Microsoft.Authorization/roleDefinitions', acrPullRoleId)
    principalId: identity.properties.principalId
    principalType: 'ServicePrincipal'
  }
}

// Azure AI Foundry resource (AIServices account). Local auth is off, so the only
// way to reach the model is an AAD identity with a data-plane role — no keys exist.
resource foundry 'Microsoft.CognitiveServices/accounts@2025-04-01-preview' = {
  name: 'aif${resourceToken}'
  location: location
  tags: tags
  kind: 'AIServices'
  sku: { name: 'S0' }
  identity: { type: 'SystemAssigned' }
  properties: {
    customSubDomainName: 'aif${resourceToken}'
    publicNetworkAccess: 'Enabled'
    disableLocalAuth: true
    allowProjectManagement: true
  }
}

resource project 'Microsoft.CognitiveServices/accounts/projects@2025-04-01-preview' = {
  parent: foundry
  name: 'garden'
  location: location
  tags: tags
  identity: { type: 'SystemAssigned' }
  properties: {
    displayName: 'Garden'
  }
}

resource model 'Microsoft.CognitiveServices/accounts/deployments@2024-10-01' = {
  parent: foundry
  name: modelName
  sku: {
    name: 'GlobalStandard'
    capacity: modelCapacity
  }
  properties: {
    model: {
      format: 'OpenAI'
      name: modelName
      version: modelVersion
    }
  }
}

resource foundryAccess 'Microsoft.Authorization/roleAssignments@2022-04-01' = {
  name: guid(foundry.id, identity.id, cognitiveServicesUserRoleId)
  scope: foundry
  properties: {
    roleDefinitionId: subscriptionResourceId('Microsoft.Authorization/roleDefinitions', cognitiveServicesUserRoleId)
    principalId: identity.properties.principalId
    principalType: 'ServicePrincipal'
  }
}

resource containerEnv 'Microsoft.App/managedEnvironments@2024-03-01' = {
  name: 'cae-${resourceToken}'
  location: location
  tags: tags
  properties: {
    appLogsConfiguration: {
      destination: 'log-analytics'
      logAnalyticsConfiguration: {
        customerId: logAnalytics.properties.customerId
        sharedKey: logAnalytics.listKeys().primarySharedKey
      }
    }
  }
}

resource containerApp 'Microsoft.App/containerApps@2024-03-01' = {
  name: 'ca-${resourceToken}'
  location: location
  tags: union(tags, { 'azd-service-name': 'agent' })
  identity: {
    type: 'UserAssigned'
    userAssignedIdentities: { '${identity.id}': {} }
  }
  properties: {
    managedEnvironmentId: containerEnv.id
    configuration: {
      activeRevisionsMode: 'Single'
      ingress: {
        external: true
        targetPort: 8000
        transport: 'auto'
      }
      registries: [
        {
          server: registry.properties.loginServer
          identity: identity.id
        }
      ]
    }
    template: {
      containers: [
        {
          name: 'agent'
          // azd replaces this placeholder with the freshly built image.
          image: 'mcr.microsoft.com/azuredocs/containerapps-helloworld:latest'
          resources: {
            cpu: json('0.5')
            memory: '1Gi'
          }
          env: [
            { name: 'FOUNDRY_PROJECT_ENDPOINT', value: 'https://${foundry.name}.services.ai.azure.com/api/projects/${project.name}' }
            { name: 'FOUNDRY_MODEL', value: modelName }
            { name: 'AZURE_CLIENT_ID', value: identity.properties.clientId }
            { name: 'APPLICATIONINSIGHTS_CONNECTION_STRING', value: appInsights.properties.ConnectionString }
          ]
        }
      ]
      scale: {
        minReplicas: 0
        maxReplicas: 1
      }
    }
  }
}

output registryLoginServer string = registry.properties.loginServer
output foundryProjectEndpoint string = 'https://${foundry.name}.services.ai.azure.com/api/projects/${project.name}'
output agentEndpoint string = 'https://${containerApp.properties.configuration.ingress.fqdn}'
