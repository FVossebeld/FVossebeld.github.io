# infra/ — Azure infrastructure (azd + Bicep)

Everything Azure, defined as code so it deploys reproducibly and tears down
cleanly. Deployed by `agent-deploy.yml` via **Azure OIDC** (federated
credential), so there is no stored Azure secret.

## Resources

- **Model deployment** with a **low TPM ceiling** (the per-minute rate cap).
- **Foundry IQ knowledge base** on **Azure AI Search** (the main standing cost;
  start on the Free tier, upgrade only if the garden outgrows it).
- **Azure Blob** holding `content/` markdown as the indexed knowledge source.
- **Hosted agent** for the `agent/` container.
- **Application Insights** for traces and token accounting.
- **Budget + action group kill-switch**: when spend crosses the cap, an action
  group triggers a function/runbook that sets model capacity to 0. The total
  ceiling, on top of the per-minute TPM ceiling.

## Cost model

Two ceilings, bounded by construction: a **rate** ceiling (low TPM) and a
**total** ceiling (budget kill-switch). Layered with Turnstile and a global
daily token cap in the agent ingress.

## Status

- Phase 1: scaffold only (this README).
- Phase 3: Blob + AI Search / Foundry IQ + embeddings model.
- Phase 5: full Bicep with TPM ceiling, App Insights, budget + kill-switch.
