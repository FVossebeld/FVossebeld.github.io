"""A Foundry-hosted garden agent, exposed over AG-UI.

A Microsoft Agent Framework agent whose model runs in Azure AI Foundry, grounded
in Floris Vossebeld's published digital garden and able to draft a GitHub issue
from a thought. ``add_agent_framework_fastapi_endpoint`` speaks AG-UI natively,
so the browser widget talks straight to this process.

It holds no secrets: the model is reached with a managed identity, and issue
posting is a client-side handoff to GitHub's prefilled new-issue URL.
"""

from __future__ import annotations

import os

from agent_framework import Agent
from agent_framework.foundry import FoundryChatClient
from agent_framework_ag_ui import add_agent_framework_fastapi_endpoint
from azure.identity import DefaultAzureCredential
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from . import garden

ISSUE_LABEL = os.environ.get("GARDEN_ISSUE_LABEL", "from-agent")


def search_garden(query: str) -> str:
    """Search Floris's digital garden and return matching passages with their page URLs."""
    hits = garden.search(query)
    if not hits:
        return "No matching pages found in the garden."
    return "\n\n".join(f"## {h.title} - {h.heading}\n{h.url}\n{h.text}" for h in hits)


def draft_github_issue(title: str, body: str, labels: str = ISSUE_LABEL) -> str:
    """Draft a GitHub issue from the visitor's thought for them to review and post.

    The widget renders an editable card and owns the handoff to GitHub's
    prefilled new-issue URL, so this agent never needs a write token.
    """
    return f"Drafted an issue titled '{title}'. The visitor reviews and posts it from the card."


SYSTEM_PROMPT = f"""\
You are the assistant for Floris Vossebeld's digital garden, a public wiki of his
notes. These are the pages:

{garden.catalog()}

- Call `search_garden` before answering a question about the garden, then answer
  only from what it returns. Keep it tight and concrete; cite the pages you used
  as markdown links to their URL.
- If the garden does not cover something, say so plainly. Never invent pages or facts.
- When the visitor wants to file a thought, idea, correction, or bug as a GitHub
  issue, call `draft_github_issue` with a crisp title and a short markdown body.
  Don't claim you posted it; the card lets them review and post it themselves.
"""


def _origins() -> list[str]:
    raw = os.environ.get(
        "GARDEN_ALLOWED_ORIGINS",
        "https://fvossebeld.github.io,http://localhost:8080,http://127.0.0.1:8080",
    )
    return [o.strip() for o in raw.split(",") if o.strip()]


agent = Agent(
    FoundryChatClient(credential=DefaultAzureCredential()),
    SYSTEM_PROMPT,
    name="garden-agent",
    description="Answers from Floris Vossebeld's digital garden and drafts GitHub issues.",
    tools=[search_garden, draft_github_issue],
)

app = FastAPI(title="Garden agent (AG-UI)")
app.add_middleware(
    CORSMiddleware,
    allow_origins=_origins(),
    allow_methods=["GET", "POST", "OPTIONS"],
    allow_headers=["*"],
)


@app.get("/health")
def health() -> dict[str, str]:
    return {"status": "ok"}


add_agent_framework_fastapi_endpoint(app, agent, "/")
