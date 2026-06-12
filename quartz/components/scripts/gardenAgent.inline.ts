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

// The widget re-initialises on every Quartz SPA navigation (the DOM is morphed,
// not preserved), so the conversation is kept in sessionStorage and rehydrated.
// This is what lets the agent navigate the visitor to another page mid-chat
// without the panel and its history vanishing.
const OPEN_KEY = "garden-agent:open"
const LOG_KEY = "garden-agent:log"
const MSGS_KEY = "garden-agent:messages"

type Entry =
  | { kind: "user" | "assistant" | "error"; text: string }
  | { kind: "issue"; title: string; body: string }

function readJSON<T>(key: string): T | null {
  try {
    const raw = sessionStorage.getItem(key)
    return raw ? (JSON.parse(raw) as T) : null
  } catch {
    return null
  }
}

const normPath = (p: string) => p.replace(/\/+$/, "") || "/"

function setupGardenAgent() {
  const root = document.querySelector<HTMLElement>(".garden-agent")
  if (!root) return
  const endpoint = root.dataset.endpoint
  if (!endpoint) return // no endpoint configured → widget stays dormant

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

  // Restore prior model context so the conversation continues across pages.
  const savedMessages = readJSON<(typeof agent.messages)[number][]>(MSGS_KEY)
  if (Array.isArray(savedMessages) && savedMessages.length) {
    agent.messages.push(...savedMessages)
  }

  // The stateless agent gets the whole history replayed every turn, so cap the
  // model-facing context to the most recent messages. The visible transcript
  // (LOG_KEY) is untouched, and the server repairs any tool-call/result split at
  // the trim boundary — this just keeps each request small and bounded.
  const MAX_REPLAY_MESSAGES = 20
  const trimHistory = () => {
    const overflow = agent.messages.length - MAX_REPLAY_MESSAGES
    if (overflow > 0) agent.messages.splice(0, overflow)
  }
  trimHistory()

  const scrollDown = () => (log.scrollTop = log.scrollHeight)

  const addMessage = (cls: string, html: string): HTMLElement => {
    const el = document.createElement("div")
    el.className = `ga-msg ${cls}`
    el.innerHTML = html
    log.appendChild(el)
    scrollDown()
    return el
  }

  const greeting =
    "Hi — ask me anything about Floris's garden, I can take you to a page, " +
    "or describe a thought and I'll draft a GitHub issue you can post."
  const showGreeting = () => {
    if (log.childElementCount === 0) addMessage("ga-assistant", escapeHtml(greeting))
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

  // Serialise the visible transcript (including any edits to issue-card fields)
  // so it can be rebuilt verbatim after a navigation morphs the DOM away.
  const snapshotLog = (): Entry[] => {
    const out: Entry[] = []
    for (const node of Array.from(log.children)) {
      const el = node as HTMLElement
      if (el.classList.contains("ga-user")) out.push({ kind: "user", text: el.textContent ?? "" })
      else if (el.classList.contains("ga-assistant"))
        out.push({ kind: "assistant", text: el.dataset.raw ?? el.textContent ?? "" })
      else if (el.classList.contains("ga-error"))
        out.push({ kind: "error", text: el.textContent ?? "" })
      else if (el.classList.contains("ga-issue"))
        out.push({
          kind: "issue",
          title: el.querySelector<HTMLInputElement>(".ga-issue-title")?.value ?? "",
          body: el.querySelector<HTMLTextAreaElement>(".ga-issue-body")?.value ?? "",
        })
    }
    return out
  }

  const rehydrate = (entries: Entry[]) => {
    for (const e of entries) {
      if (e.kind === "issue") {
        renderIssueCard(e.title, e.body)
      } else if (e.kind === "assistant") {
        const el = addMessage("ga-assistant", renderMarkdown(e.text))
        el.dataset.raw = e.text
      } else if (e.kind === "user") {
        addMessage("ga-user", escapeHtml(e.text))
      } else {
        addMessage("ga-error", escapeHtml(e.text))
      }
    }
  }

  const persist = () => {
    try {
      sessionStorage.setItem(OPEN_KEY, panel.hidden ? "0" : "1")
      sessionStorage.setItem(LOG_KEY, JSON.stringify(snapshotLog()))
      sessionStorage.setItem(MSGS_KEY, JSON.stringify(agent.messages))
    } catch {
      /* storage unavailable (private mode / quota) → degrade silently */
    }
  }

  // Build a same-origin garden URL from a page slug; null if it's empty/invalid.
  const toGardenURL = (slug: string | undefined): URL | null => {
    if (typeof slug !== "string") return null
    const clean = slug.trim().replace(/^\/+|\/+$/g, "")
    try {
      return new URL(`/${clean}`, window.location.origin)
    } catch {
      return null
    }
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
    const navArgs: Record<string, string> = {}
    let navCallId = ""
    let pendingNav: URL | null = null

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
            } else if (event.toolCallName === "navigate_garden") {
              navCallId = event.toolCallId
              navArgs[event.toolCallId] = ""
              setStatus("Opening a page…")
            }
          },
          onToolCallArgsEvent({ event }) {
            if (event.toolCallId in issueArgs) {
              issueArgs[event.toolCallId] += event.delta
            } else if (event.toolCallId in navArgs) {
              navArgs[event.toolCallId] += event.delta
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
            } else if (event.toolCallId === navCallId) {
              try {
                const args = JSON.parse(navArgs[event.toolCallId] || "{}")
                const target = toGardenURL(args.slug)
                // Only navigate if it's a different page than the one we're on.
                if (target && normPath(target.pathname) !== normPath(window.location.pathname)) {
                  pendingNav = target
                }
              } catch {
                /* malformed args → stay put, the text answer still lands */
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
      trimHistory()
      send.disabled = false
      input.disabled = false
      input.focus()
      // Hand off to Quartz's SPA router. persist() runs in the nav cleanup hook
      // before the morph, so the destination page rehydrates this conversation.
      if (pendingNav) window.spaNavigate(pendingNav)
    }
  }

  const onLaunch = () => {
    panel.hidden = false
    launch.hidden = true
    showGreeting()
    input.focus()
  }
  const onClose = () => {
    panel.hidden = true
    launch.hidden = false
    persist()
  }
  const onSubmit = (e: Event) => {
    e.preventDefault()
    const text = input.value.trim()
    if (!text) return
    input.value = ""
    void run(text)
  }

  launch.addEventListener("click", onLaunch)
  closeBtn.addEventListener("click", onClose)
  form.addEventListener("submit", onSubmit)

  // Restore the panel state and transcript saved before the last navigation.
  if (sessionStorage.getItem(OPEN_KEY) === "1") {
    panel.hidden = false
    launch.hidden = true
    const savedLog = readJSON<Entry[]>(LOG_KEY)
    if (Array.isArray(savedLog) && savedLog.length) rehydrate(savedLog)
    else showGreeting()
    scrollDown()
  }

  // Save state and detach listeners before Quartz morphs this page away.
  window.addCleanup(() => {
    persist()
    launch.removeEventListener("click", onLaunch)
    closeBtn.removeEventListener("click", onClose)
    form.removeEventListener("submit", onSubmit)
  })
}

document.addEventListener("nav", setupGardenAgent)
