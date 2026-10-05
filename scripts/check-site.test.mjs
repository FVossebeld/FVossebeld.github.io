import assert from "node:assert/strict"
import { spawnSync } from "node:child_process"
import { mkdtemp, mkdir, rm, writeFile } from "node:fs/promises"
import os from "node:os"
import path from "node:path"
import { fileURLToPath } from "node:url"
import test from "node:test"

test("generated links resolve exact-case pages, folders and assets, but never drafts", async () => {
  const directory = await mkdtemp(path.join(os.tmpdir(), "quartz-links-"))
  const checker = fileURLToPath(new URL("./check-site.mjs", import.meta.url))
  const check = () => spawnSync(process.execPath, [checker, directory], { encoding: "utf8" })
  try {
    await mkdir(path.join(directory, "concepts"))
    await writeFile(path.join(directory, "concepts", "index.html"), '<a href="../">Home</a>')
    await writeFile(path.join(directory, "concepts", "rollback.html"), "")
    await writeFile(path.join(directory, "asset.svg"), "<svg/>")
    await writeFile(
      path.join(directory, "index.html"),
      `<a href="/concepts/">Folder</a>
       <a href="concepts/rollback?from=home#example">Page</a>
       <img src="/asset.svg">
       <a href="https://example.test/">External</a>
       <a href="#local">Anchor</a>`,
    )
    const valid = check()
    assert.equal(valid.status, 0, valid.stderr)
    for (const target of ["/concepts/Rollback", "/thoughts/unpublished", "/missing.svg"]) {
      await writeFile(path.join(directory, "index.html"), `<a href="${target}">Broken</a>`)
      const invalid = check()
      assert.equal(invalid.status, 1)
      assert.ok(invalid.stderr.includes(`index.html: ${target}`), invalid.stderr)
    }
  } finally {
    await rm(directory, { recursive: true, force: true })
  }
})
