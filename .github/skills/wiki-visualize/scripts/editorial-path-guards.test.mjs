import assert from "node:assert/strict"
import { mkdtemp, mkdir, rm, symlink, unlink } from "node:fs/promises"
import { tmpdir } from "node:os"
import { join, parse, resolve } from "node:path"
import { spawnSync } from "node:child_process"
import test from "node:test"
import { canonicalPath, guardPaths } from "./editorial-path-guards.mjs"

test("canonical guards reject overlap and aliases before Quartz runs", async () => {
  const scratch = await mkdtemp(join(tmpdir(), "editorial-guards-"))
  const repository = resolve(import.meta.dirname, "../../../..")
  const fixture = join(scratch, "fixture")
  const screenshots = join(scratch, "screenshots")
  const alias = join(scratch, "repository-alias")
  let linked = false
  try {
    await mkdir(fixture)
    await mkdir(screenshots)
    const paths = { fixture, screenshots, repository, output: join(scratch, "new", "output") }
    const safe = await guardPaths(paths)
    assert.equal(safe.output, join(await canonicalPath(scratch), "new", "output"))
    for (const output of [repository, fixture, screenshots, parse(repository).root]) {
      await assert.rejects(guardPaths({ ...paths, output }), { name: "AssertionError" })
    }
    await assert.rejects(guardPaths({ ...paths, output: join(fixture, "new", "output") }), {
      name: "AssertionError",
    })
    await symlink(repository, alias, process.platform === "win32" ? "junction" : "dir")
    linked = true
    const aliases = [alias, join(alias, "new", "output")]
    if (process.platform === "win32") {
      aliases.push(repository.toUpperCase(), join(repository.toUpperCase(), "new", "output"))
    }
    for (const output of aliases) {
      await assert.rejects(guardPaths({ ...paths, output }), { name: "AssertionError" })
      const result = spawnSync(
        process.execPath,
        [
          join(import.meta.dirname, "verify-editorial-plate.mjs"),
          "--fixture",
          fixture,
          "--output",
          output,
          "--screenshots",
          screenshots,
        ],
        { encoding: "utf8", env: { ...process.env, PLAYWRIGHT_MODULE: "unused" } },
      )
      assert.ifError(result.error)
      assert.notEqual(result.status, 0)
      assert.match(result.stderr, /AssertionError/)
      assert.doesNotMatch(result.stdout + result.stderr, /Quartz v|Cleaned output/)
    }
  } finally {
    // Unlink the alias before deleting only this test's temporary directory.
    if (linked) await unlink(alias)
    await rm(scratch, { recursive: true })
  }
})
