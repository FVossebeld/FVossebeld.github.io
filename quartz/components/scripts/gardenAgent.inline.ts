import { HttpAgent, randomUUID } from "@ag-ui/client"

function escapeHtml(s: string): string {
  return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
}

// Minimal, safe markdown: escape first, then linkify, bold, inline code, line breaks.
function renderMarkdown(src: string): string {
  let s = escapeHtml(src)
  s = s.replace(
    /\[([^\]]+)\]\((https?:\/\/[^\s)]+)\)/g,
    '<a href="$2" target="_blank" rel="noopener">$1</a>',
  )
  s = s.replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>")
  s = s.replace(/`([^`]+)`/g, "<code>$1</code>")
  return s.replace(/\n/g, "<br>")
}

function setupGardenAgent() {
  const root = document.querySelector<HTMLElement>(".garden-agent")
  if (!root || root.dataset.wired === "true") return
  const endpoint = root.dataset.endpoint
  if (!endpoint) return // no endpoint configured → widget stays dormant
  root.dataset.wired = "true"

  const repo = root.dataset.repo ?? ""
  const label = root.dataset.label ?? "from-agent"
  const launch = root.querySelector<HTMLButtonElement>(".ga-launch")!
  const panel = root.querySelector<HTMLElement>(".ga-panel")!
  const closeBtn = root.querySelector<HTMLButtonElement>(".ga-close")!
  const log = root.querySelector<HTMLElement>(".ga-log")!
  const form = root.querySelector<HTMLFormElement>(".ga-form")!
  const input = root.querySelector<HTMLInputElement>(".ga-input")!
  const send = root.querySelector<HTMLButtonElement>(".ga-send")!

  // HttpAgent invokes its `fetch` as a method, so a bare native fetch throws
  // "Illegal invocation" in the browser — bind it to window.
  const agent = new HttpAgent({
    url: endpoint,
    fetch: window.fetch.bind(window),
  })

  const scrollDown = () => (log.scrollTop = log.scrollHeight)

  const addMessage = (cls: string, html: string): HTMLElement => {
    const el = document.createElement("div")
    el.className = `ga-msg ${cls}`
    el.innerHTML = html
    log.appendChild(el)
    scrollDown()
    return el
  }

  const openIssue = (title: string, body: string) => {
    const url =
      `https://github.com/${repo}/issues/new` +
      `?title=${encodeURIComponent(title)}` +
      `&body=${encodeURIComponent(body)}` +
      `&labels=${encodeURIComponent(label)}`
    window.open(url, "_blank", "noopener")
  }

  const renderIssueCard = (title: string, body: string) => {
    const card = document.createElement("div")
    card.className = "ga-issue"
    card.innerHTML = `
      <span class="ga-issue-tag">Draft issue</span>
      <input class="ga-issue-title" type="text" />
      <textarea class="ga-issue-body"></textarea>
      <button class="ga-issue-open" type="button">Review &amp; open on GitHub →</button>`
    const titleEl = card.querySelector<HTMLInputElement>(".ga-issue-title")!
    const bodyEl = card.querySelector<HTMLTextAreaElement>(".ga-issue-body")!
    titleEl.value = title
    bodyEl.value = body
    card
      .querySelector<HTMLButtonElement>(".ga-issue-open")!
      .addEventListener("click", () => openIssue(titleEl.value, bodyEl.value))
    log.appendChild(card)
    scrollDown()
  }

  const run = async (text: string) => {
    agent.messages.push({ id: randomUUID(), role: "user", content: text })
    addMessage("ga-user", escapeHtml(text))
    send.disabled = true
    input.disabled = true

    let status: HTMLElement | null = addMessage("ga-status", "Thinking…")
    const setStatus = (t: string) => {
      if (status) status.textContent = t
    }
    const clearStatus = () => {
      status?.remove()
      status = null
    }

    const bubbles: Record<string, HTMLElement> = {}
    const issueArgs: Record<string, string> = {}
    let issueCallId = ""

    // Create the assistant bubble lazily, on first content, so messages that
    // only carry a tool call never leave an empty bubble behind.
    const ensureBubble = (id: string): HTMLElement => {
      if (!bubbles[id]) {
        clearStatus()
        bubbles[id] = addMessage("ga-assistant", "")
        bubbles[id].dataset.raw = ""
      }
      return bubbles[id]
    }

    try {
      await agent.runAgent(
        { runId: randomUUID() },
        {
          onToolCallStartEvent({ event }) {
            if (event.toolCallName === "search_garden") {
              setStatus("Searching the garden…")
            } else if (event.toolCallName === "draft_github_issue") {
              issueCallId = event.toolCallId
              issueArgs[event.toolCallId] = ""
              setStatus("Drafting an issue…")
            }
          },
          onToolCallArgsEvent({ event }) {
            if (event.toolCallId in issueArgs) {
              issueArgs[event.toolCallId] += event.delta
            }
          },
          onToolCallEndEvent({ event }) {
            if (event.toolCallId === issueCallId) {
              try {
                const args = JSON.parse(issueArgs[event.toolCallId] || "{}")
                clearStatus()
                renderIssueCard(args.title ?? "Untitled", args.body ?? "")
              } catch {
                /* malformed args → skip the card, the text answer still lands */
              }
            }
          },
          onTextMessageContentEvent({ event }) {
            const el = ensureBubble(event.messageId)
            el.dataset.raw = (el.dataset.raw ?? "") + event.delta
            el.innerHTML = renderMarkdown(el.dataset.raw)
            scrollDown()
          },
          onRunErrorEvent() {
            clearStatus()
            addMessage("ga-error", "Something went wrong reaching the agent. Try again.")
          },
        },
      )
    } catch {
      clearStatus()
      addMessage("ga-error", "Something went wrong reaching the agent. Try again.")
    } finally {
      clearStatus()
      send.disabled = false
      input.disabled = false
      input.focus()
    }
  }

  launch.addEventListener("click", () => {
    panel.hidden = false
    launch.hidden = true
    if (log.childElementCount === 0) {
      addMessage(
        "ga-assistant",
        "Hi — ask me anything about Floris's garden, or describe a thought and I'll draft a GitHub issue you can post.",
      )
    }
    input.focus()
  })
  closeBtn.addEventListener("click", () => {
    panel.hidden = true
    launch.hidden = false
  })
  form.addEventListener("submit", (e) => {
    e.preventDefault()
    const text = input.value.trim()
    if (!text) return
    input.value = ""
    void run(text)
  })
}

document.addEventListener("nav", setupGardenAgent)
