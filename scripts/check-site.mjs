import { readdir, readFile } from "node:fs/promises"
import path from "node:path"

const output = path.resolve(process.argv[2] ?? "public")
async function filesIn(directory) {
  const entries = await readdir(directory, { withFileTypes: true })
  const files = await Promise.all(
    entries.map((entry) => {
      const full = path.join(directory, entry.name)
      return entry.isDirectory() ? filesIn(full) : [full]
    }),
  )
  return files.flat()
}

const files = await filesIn(output)
const routes = new Set(files.map((file) => path.relative(output, file).split(path.sep).join("/")))
const errors = new Set()
for (const file of files.filter((file) => file.endsWith(".html"))) {
  const route = path.relative(output, file).split(path.sep).join("/")
  const html = await readFile(file, "utf8")
  for (const match of html.matchAll(/\b(?:href|src)=["']([^"']+)["']/g)) {
    const target = match[1].replaceAll("&amp;", "&")
    if (/^(?:[a-z][a-z\d+.-]*:|\/\/|#)/i.test(target)) continue
    const url = new URL(target, `https://site.test/${route}`)
    const pathname = decodeURIComponent(url.pathname).slice(1)
    const candidates = [pathname, `${pathname}.html`, `${pathname.replace(/\/$/, "")}/index.html`]
    if (pathname === "") candidates.push("index.html")
    if (!candidates.some((candidate) => routes.has(candidate))) {
      errors.add(`${route}: ${target}`)
    }
  }
}
if (errors.size > 0) {
  console.error(`Broken generated links:\n${[...errors].join("\n")}`)
  process.exitCode = 1
} else {
  console.log(
    `Checked links and assets in ${files.filter((file) => file.endsWith(".html")).length} generated pages`,
  )
}
