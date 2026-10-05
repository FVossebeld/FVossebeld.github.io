import assert from "node:assert/strict"
import { createServer } from "node:http"
import { mkdir, readFile, writeFile } from "node:fs/promises"
import { extname, join, resolve, sep } from "node:path"
import { spawnSync } from "node:child_process"
import { pathToFileURL } from "node:url"
import { guardPaths } from "./editorial-path-guards.mjs"

const options = new Map()
for (let index = 2; index < process.argv.length; index += 2) {
  const key = process.argv[index]
  if (!key?.startsWith("--") || !process.argv[index + 1]) {
    throw new Error("Expected --fixture, --output and --screenshots path arguments.")
  }
  options.set(key.slice(2), resolve(process.argv[index + 1]))
}

for (const key of ["fixture", "output", "screenshots"]) {
  if (!options.has(key)) throw new Error(`Missing --${key} path.`)
}

const playwrightModule = process.env.PLAYWRIGHT_MODULE
if (!playwrightModule) {
  throw new Error("Set PLAYWRIGHT_MODULE to an installed Playwright index.mjs module.")
}

const { fixture, output, screenshots, repository } = await guardPaths({
  fixture: options.get("fixture"),
  output: options.get("output"),
  screenshots: options.get("screenshots"),
  repository: resolve(import.meta.dirname, "../../../.."),
})
const quartzCli = join(repository, "quartz", "bootstrap-cli.mjs")
const { status, error } = spawnSync(
  process.execPath,
  [quartzCli, "build", "--directory", fixture, "--output", output],
  { cwd: repository, stdio: "inherit", windowsHide: true },
)
if (error) throw error
if (status !== 0) process.exit(status ?? 1)

await mkdir(screenshots, { recursive: true })
const mimeTypes = {
  ".css": "text/css; charset=utf-8",
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".svg": "image/svg+xml",
  ".woff2": "font/woff2",
}
const server = createServer(async (request, response) => {
  const pathname = decodeURIComponent(new URL(request.url, "http://127.0.0.1").pathname)
  const target = resolve(output, `.${pathname}`)
  if (target !== output && !target.startsWith(output + sep)) {
    response.writeHead(403).end()
    return
  }
  try {
    const file = target === output ? join(output, "index.html") : target
    const data = await readFile(file)
    response.writeHead(200, {
      "Content-Type": mimeTypes[extname(file)] ?? "application/octet-stream",
    })
    response.end(data)
  } catch (failure) {
    if (failure.code !== "ENOENT") {
      console.error(failure)
      response.writeHead(500).end()
      return
    }
    response.writeHead(404).end()
  }
})
await new Promise((resolveListen) => server.listen(0, "127.0.0.1", resolveListen))

const results = []
let browser

try {
  const { chromium } = await import(pathToFileURL(resolve(playwrightModule)).href)
  browser = await chromium.launch({ channel: "msedge", headless: true })
  for (const width of [390, 720, 1440]) {
    for (const theme of ["light", "dark"]) {
      const page = await browser.newPage({
        viewport: { width, height: 3000 },
        reducedMotion: "reduce",
      })
      await page.goto(`http://127.0.0.1:${server.address().port}/`, { waitUntil: "load" })
      await page.evaluate(
        (mode) => document.documentElement.setAttribute("saved-theme", mode),
        theme,
      )
      await page.evaluate(() => document.fonts.ready)
      const figure = page.locator("figure.editorial-plate")
      assert.equal(await figure.count(), 1, "Expected exactly one .editorial-plate figure.")
      assert.equal(await page.getByRole("figure").count(), 1, "Expected one semantic figure.")
      await figure.scrollIntoViewIfNeeded()
      const metrics = await figure.evaluate((node) => {
        const channels = (color) =>
          color
            .match(/[\d.]+/g)
            .slice(0, 3)
            .map(Number)
        const luminance = (color) =>
          channels(color)
            .map((value) => value / 255)
            .map((value) => (value <= 0.04045 ? value / 12.92 : ((value + 0.055) / 1.055) ** 2.4))
            .reduce((sum, value, index) => sum + value * [0.2126, 0.7152, 0.0722][index], 0)
        const contrast = (first, second) => {
          const a = luminance(first)
          const b = luminance(second)
          return (Math.max(a, b) + 0.05) / (Math.min(a, b) + 0.05)
        }
        const surface = (element) => {
          for (let parent = element; parent; parent = parent.parentElement) {
            const color = getComputedStyle(parent).backgroundColor
            const alpha = color.startsWith("rgba(")
              ? Number(color.match(/[,/]\s*([\d.]+)\s*\)$/)?.[1] ?? 0)
              : 1
            if (color !== "transparent" && alpha >= 1) {
              return color
            }
          }
          return getComputedStyle(document.body).backgroundColor
        }
        const textWalker = document.createTreeWalker(node, NodeFilter.SHOW_TEXT)
        const textChecks = []
        while (textWalker.nextNode()) {
          const textNode = textWalker.currentNode
          const text = textNode.textContent.trim()
          const element = textNode.parentElement
          if (!text || !element || element.closest('[aria-hidden="true"], .authority-sr-only'))
            continue
          const style = getComputedStyle(element)
          const range = document.createRange()
          range.selectNodeContents(textNode)
          if (
            style.display === "none" ||
            style.visibility === "hidden" ||
            range.getBoundingClientRect().height === 0
          )
            continue
          textChecks.push({
            text,
            size:
              parseFloat(style.fontSize) *
              (element instanceof SVGGraphicsElement
                ? Math.hypot(element.getScreenCTM()?.a ?? 1, element.getScreenCTM()?.b ?? 0)
                : 1),
            foreground: style.color,
            background: surface(element),
            backgrounds: [
              element,
              element.parentElement,
              element.parentElement?.parentElement,
              node,
            ]
              .filter(Boolean)
              .map((parent) => ({
                class: parent.className?.toString() ?? parent.tagName.toLowerCase(),
                color: getComputedStyle(parent).color,
                background: getComputedStyle(parent).backgroundColor,
              })),
            ratio: contrast(style.color, surface(element)),
          })
        }
        const strokes = [...node.querySelectorAll("*")].flatMap((element) => {
          const style = getComputedStyle(element)
          return ["Top", "Right", "Bottom", "Left"]
            .filter(
              (side) =>
                parseFloat(style[`border${side}Width`]) > 0 &&
                style[`border${side}Style`] !== "none",
            )
            .map((side) => ({
              class: element.className?.toString() ?? element.tagName.toLowerCase(),
              color: style[`border${side}Color`],
              background: surface(element),
              ratio: contrast(style[`border${side}Color`], surface(element)),
            }))
        })
        const caption = node.querySelector(":scope > figcaption")
        const titleId = node.getAttribute("aria-labelledby")
        const descriptionId = node.getAttribute("aria-describedby")
        const rect = node.getBoundingClientRect()
        const overlayIntersections = [...document.body.querySelectorAll("*")]
          .filter((element) => {
            if (node.contains(element)) return false
            const style = getComputedStyle(element)
            if (
              style.position !== "fixed" ||
              style.display === "none" ||
              style.visibility === "hidden"
            ) {
              return false
            }
            const overlay = element.getBoundingClientRect()
            return (
              overlay.left < rect.right &&
              overlay.right > rect.left &&
              overlay.top < rect.bottom &&
              overlay.bottom > rect.top
            )
          })
          .map((element) => element.className?.toString() || element.tagName.toLowerCase())
        return {
          width: innerWidth,
          theme: document.documentElement.getAttribute("saved-theme"),
          figureWidth: rect.width,
          figureHeight: rect.height,
          figureBackground: getComputedStyle(node).backgroundColor,
          figureColor: getComputedStyle(node).color,
          paperToken: getComputedStyle(node).getPropertyValue("--plate-paper"),
          pageOverflow: document.documentElement.scrollWidth > innerWidth,
          figureOverflow: node.scrollWidth > node.clientWidth + 1,
          overlayIntersections,
          captionIsDirect: caption?.parentElement === node,
          titleResolves:
            !!titleId &&
            titleId
              .trim()
              .split(/\s+/)
              .every((id) => !!document.getElementById(id)),
          descriptionResolves:
            !!descriptionId &&
            descriptionId
              .trim()
              .split(/\s+/)
              .every((id) => !!document.getElementById(id)),
          idsUnique: [...document.querySelectorAll("[id]")].every(
            (item, index, all) => all.findIndex((other) => other.id === item.id) === index,
          ),
          codeTrap: !!node.closest("pre"),
          minTextSize: Math.min(...textChecks.map((item) => item.size)),
          minTextContrast: Math.min(...textChecks.map((item) => item.ratio)),
          minStrokeContrast: strokes.length
            ? Math.min(...strokes.map((stroke) => stroke.ratio))
            : null,
          strokes,
          textChecks,
          reducedMotion: matchMedia("(prefers-reduced-motion: reduce)").matches,
          animationCount: node.getAnimations().length,
          plateTokens: Object.fromEntries(
            ["paper", "ink", "inset", "neutral", "positive", "speech", "video"].map((name) => [
              name,
              getComputedStyle(node).getPropertyValue(`--plate-${name}`).trim(),
            ]),
          ),
          scheduleAxisErrors: [...node.querySelectorAll(".schedule-panel")].flatMap((panel) => {
            const ticks = [...panel.querySelectorAll(".schedule-axis > span")]
            const track = panel.querySelector(".schedule-track")
            if (!track || ticks.length !== 3) return []
            const bounds = track.getBoundingClientRect()
            return ticks.map((tick, index) => {
              const mark = tick.getBoundingClientRect()
              return Math.abs(
                mark.left + mark.width / 2 - (bounds.left + (bounds.width * index) / 2),
              )
            })
          }),
        }
      })
      assert(
        metrics.figureWidth > 0 && metrics.figureHeight > 0,
        `${width}px ${theme}: figure is not visible`,
      )
      assert(
        metrics.captionIsDirect,
        `${width}px ${theme}: figcaption is not a direct figure child`,
      )
      assert(
        metrics.titleResolves && metrics.descriptionResolves,
        `${width}px ${theme}: accessible title/description does not resolve`,
      )
      assert(metrics.idsUnique, `${width}px ${theme}: duplicate document IDs`)
      assert(!metrics.codeTrap, `${width}px ${theme}: figure rendered inside a code block`)
      assert(metrics.minTextSize >= 14, `${width}px ${theme}: essential text below 14 CSS px`)
      assert(
        metrics.minTextContrast >= 4.5,
        `${width}px ${theme}: normal text contrast below 4.5:1: ${JSON.stringify({
          figureBackground: metrics.figureBackground,
          figureColor: metrics.figureColor,
          paperToken: metrics.paperToken,
          badText: metrics.textChecks.filter((item) => item.ratio < 4.5),
        })}`,
      )
      assert(
        metrics.minStrokeContrast >= 3,
        `${width}px ${theme}: meaningful stroke contrast below 3:1: ${JSON.stringify(metrics.strokes.filter((stroke) => stroke.ratio < 3))}`,
      )
      assert(
        !metrics.pageOverflow && !metrics.figureOverflow,
        `${width}px ${theme}: horizontal overflow`,
      )
      assert(
        metrics.overlayIntersections.length === 0,
        `${width}px ${theme}: fixed shell overlay intersects figure: ${metrics.overlayIntersections.join(", ")}`,
      )
      assert(
        metrics.reducedMotion && metrics.animationCount === 0,
        `${width}px ${theme}: reduced-motion figure is animated`,
      )
      assert(
        Object.values(metrics.plateTokens).every(Boolean),
        `${width}px ${theme}: missing editorial plate token`,
      )
      assert(
        metrics.scheduleAxisErrors.every((error) => error <= 1),
        `${width}px ${theme}: schedule ticks do not align with interval endpoints`,
      )
      if (width !== 720) {
        const path = join(screenshots, `${width}-${theme}.png`)
        await figure.screenshot({ path })
        metrics.screenshot = path
      }
      results.push(metrics)
      await page.close()
    }
  }
  await writeFile(
    join(screenshots, "checks.json"),
    JSON.stringify(
      {
        generatedAt: new Date().toISOString(),
        fixture,
        buildOutput: output,
        browser: "Microsoft Edge via externally installed Playwright",
        widths: [390, 720, 1440],
        screenshotWidths: [390, 1440],
        nativeBrowserZoomTested: false,
        assistiveTechnologyTested: false,
        results,
      },
      null,
      2,
    ),
  )
  console.log(
    results
      .map(
        (item) =>
          `${item.width}px ${item.theme}: text ${item.minTextSize}px/${item.minTextContrast.toFixed(2)}:1, strokes ${item.minStrokeContrast.toFixed(2)}:1, overflow none`,
      )
      .join("\n"),
  )
} finally {
  await browser?.close()
  await new Promise((resolveClose, reject) =>
    server.close((failure) => (failure ? reject(failure) : resolveClose())),
  )
}
