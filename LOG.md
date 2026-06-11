## [2026-06-11] init | Scaffolded the garden (Quartz v4, homepage, About, How-this-works, first thought, AGENTS.md schema).

## [2026-06-11] design | Reskinned the site as quiet frontier editorial (warm paper palette, Literata/Source Sans 3, restrained accents); rewrote homepage as masthead + start-here index.

## [2026-06-11] design | Made Mermaid diagrams clean: themed nodes/edges to the warm palette, removed the code-box chrome so diagrams rest on the paper, added a quiet loading cue (no raw-source flash), and replaced the frosted-glass fullscreen modal with a warm ink scrim. Converted the publish-flow on How-this-works into a real diagram.

## [2026-06-11] schema | Made the AI system consistent with the LLM-wiki pattern: added a Skills layer (`.github/skills/wiki-ingest`, `wiki-query`, `wiki-lint`) implementing the Ingest/Query/Lint operations; rewrote `wiki-librarian` as a thin persona that routes to them; created the referenced `raw/` and `wiki/` layers; and documented the instructions-vs-agents-vs-skills split in AGENTS.md, copilot-instructions, AGENTIC-PIPELINE, and README.
