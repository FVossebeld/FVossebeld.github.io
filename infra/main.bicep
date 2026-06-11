targetScope = 'subscription'

@minLength(1)
@maxLength(64)
@description('Name of the azd environment; used to derive resource names and the resource group.')
param environmentName string

@minLength(1)
@description('Azure region for all resources.')
param location string

@description('Chat model deployed in the Foundry project.')
param modelName string = 'gpt-4o-mini'

@description('Chat model version.')
param modelVersion string = '2024-07-18'

@description('Model capacity in thousands of tokens per minute (the cost ceiling).')
param modelCapacity int = 20

@description('Comma-separated browser origins allowed to call the agent (CORS).')
param allowedOrigins string = 'https://vossebeld.dev,https://www.vossebeld.dev,https://fvossebeld.github.io'

@description('Public site origin used to build citation URLs.')
param siteBaseUrl string = 'https://vossebeld.dev'

var tags = { 'azd-env-name': environmentName }
var resourceToken = toLower(uniqueString(subscription().id, environmentName, location))

resource rg 'Microsoft.Resources/resourceGroups@2024-03-01' = {
  name: 'rg-${environmentName}'
  location: location
  tags: tags
}

module resources 'resources.bicep' = {
  scope: rg
  name: 'resources'
  params: {
    location: location
    tags: tags
    resourceToken: resourceToken
    modelName: modelName
    modelVersion: modelVersion
    modelCapacity: modelCapacity
    allowedOrigins: allowedOrigins
    siteBaseUrl: siteBaseUrl
  }
}

output AZURE_CONTAINER_REGISTRY_ENDPOINT string = resources.outputs.registryLoginServer
output AZURE_RESOURCE_GROUP string = rg.name
output FOUNDRY_PROJECT_ENDPOINT string = resources.outputs.foundryProjectEndpoint
output FOUNDRY_MODEL string = modelName
output SERVICE_AGENT_ENDPOINT string = resources.outputs.agentEndpoint
