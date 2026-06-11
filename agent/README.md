# agent/ — Foundry Hosted Agent (Microsoft Agent Framework)

The backend brain. A containerized agent that Foundry hosts, built on
**Microsoft Agent Framework**, which speaks the **AG-UI** protocol natively (no
hand-rolled bridge to the widget).

What it does:

- Answers questions **grounded in the garden**. It queries a **Foundry IQ**
  knowledge base over `content/` (agentic retrieval: decompose, parallel
  subqueries, rerank) and returns **cited** answers that link back to pages.
- Turns a visitor's thought into a **GitHub issue draft**, then hands off to
  GitHub's prefilled `issues/new?...` URL on approval. No write token, no OAuth,
  no stored credential (Tier 1 posting).

## Planned stack

Python: FastAPI ingress + `agent-framework` with its AG-UI integration. The
model is a small deployment with a **low TPM ceiling** (see `infra/`). Model
auth is managed identity, never a key in the repo.

## Status

- Phase 1: scaffold only (this README + `.gitignore`).
- Phase 3: knowledge base validated standalone (cited retrieval).
- Phase 4: agent wired to the KB, drafts issues, runs locally.
- Phase 5: containerized, deployed to Azure via `infra/` + `agent-deploy.yml`.
