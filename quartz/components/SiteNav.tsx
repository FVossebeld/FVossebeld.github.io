import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"

interface Options {
  links: Record<string, string>
}

// A short, curated wayfinding list for the left rail of reading pages. It
// replaces the recursive Explorer tree there: a small garden wants a fixed map
// plus search, not an unbounded always-open outline. The full Explorer still
// lives on folder/tag pages, where browsing is the task.
export default ((opts?: Options) => {
  const SiteNav: QuartzComponent = ({ fileData, displayClass }: QuartzComponentProps) => {
    const links = opts?.links ?? {}
    const current = fileData.slug ?? ""
    return (
      <nav class={`site-nav ${displayClass ?? ""}`} aria-label="Site sections">
        <ul>
          {Object.entries(links).map(([text, link]) => {
            const seg = link.replace(/^\/+|\/+$/g, "")
            const active = seg !== "" && (current === seg || current.startsWith(`${seg}/`))
            return (
              <li>
                <a
                  href={link}
                  class={active ? "active" : ""}
                  aria-current={active ? "page" : undefined}
                >
                  {text}
                </a>
              </li>
            )
          })}
        </ul>
      </nav>
    )
  }

  return SiteNav
}) satisfies QuartzComponentConstructor
