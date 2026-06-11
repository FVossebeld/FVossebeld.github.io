import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"
import { classNames } from "../util/lang"
import style from "./styles/gardenAgent.scss"
// @ts-ignore
import script from "./scripts/gardenAgent.inline"

interface Options {
  // AG-UI endpoint of the Foundry hosted agent. Empty string keeps the widget dormant.
  endpoint: string
  // owner/repo the prefilled new-issue handoff targets.
  repo: `${string}/${string}`
  // label applied to drafted issues.
  label?: string
}

export default ((opts: Options) => {
  const GardenAgent: QuartzComponent = ({ displayClass }: QuartzComponentProps) => {
    if (!opts?.endpoint) return <></>
    return (
      <div
        class={classNames(displayClass, "garden-agent")}
        data-endpoint={opts.endpoint}
        data-repo={opts.repo}
        data-label={opts.label ?? "from-agent"}
      >
        <button class="ga-launch" aria-label="Ask the garden agent">
          Ask the garden
        </button>
        <div class="ga-panel" hidden>
          <div class="ga-head">
            <span>Ask the garden</span>
            <button class="ga-close" aria-label="Close">
              ×
            </button>
          </div>
          <div class="ga-log"></div>
          <form class="ga-form">
            <input
              class="ga-input"
              type="text"
              autocomplete="off"
              placeholder="Ask a question, or describe a thought to file…"
              aria-label="Message the garden agent"
            />
            <button class="ga-send" type="submit">
              Send
            </button>
          </form>
          <div class="ga-foot">AG-UI · Azure AI Foundry hosted agent</div>
        </div>
      </div>
    )
  }

  GardenAgent.afterDOMLoaded = script
  GardenAgent.css = style
  return GardenAgent
}) satisfies QuartzComponentConstructor<Options>
