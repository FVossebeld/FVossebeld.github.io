# scripts/index-content/ — publish content/ to the knowledge source

Exports the published garden (`content/**.md`) to **Azure Blob**, which the
**Foundry IQ** knowledge base watches and auto chunks, embeds, and indexes. This
is what keeps the agent's answers grounded in the current pages.

Run by `.github/workflows/index-content.yml`. Phase 3 enables the trigger so it
re-indexes whenever `content/` changes on `main`.

## Status

- Phase 1: scaffold only (this README).
- Phase 3: real exporter (walk `content/`, upload markdown to Blob) plus the
  workflow trigger, validated against agentic retrieval.
