import assert from "node:assert/strict"
import { execFileSync } from "node:child_process"
import { mkdtemp, mkdir, rm, writeFile, utimes } from "node:fs/promises"
import os from "node:os"
import path from "node:path"
import test from "node:test"
import { CreatedModifiedDate } from "./lastmod"
import { unified } from "unified"
import { VFile } from "vfile"
import type { Root } from "mdast"
import type { BuildCtx } from "../../util/ctx"
import type { FilePath } from "../../util/path"

test("Git dates stay stable across unrelated commits", async () => {
  const repositoryWorkdir = await mkdtemp(path.join(os.tmpdir(), "quartz-lastmod-"))
  const git = (args: string[], date?: string) =>
    execFileSync("git", args, {
      cwd: repositoryWorkdir,
      env: {
        ...process.env,
        GIT_AUTHOR_DATE: date,
        GIT_COMMITTER_DATE: date,
      },
      stdio: "ignore",
    })

  try {
    git(["init", "--quiet"])
    git(["config", "user.name", "Quartz test"])
    git(["config", "user.email", "quartz@example.test"])
    await mkdir(path.join(repositoryWorkdir, "content"))
    const pagePath = path.join(repositoryWorkdir, "content/page.md")
    await writeFile(pagePath, "Page")
    git(["add", "content/page.md"])
    git(["commit", "--quiet", "-m", "Add page"], "2024-01-02T03:04:05Z")

    const plugin = CreatedModifiedDate({ priority: ["frontmatter", "git"] })
    const getDates = async (
      filePath = pagePath,
      directory = repositoryWorkdir,
      frontmatter: Record<string, string> = {},
    ) => {
      const processor = unified().use(plugin.markdownPlugins!({ argv: { directory } } as BuildCtx))
      const file = new VFile({
        data: {
          filePath: filePath as FilePath,
          relativePath: path.relative(directory, filePath) as FilePath,
          frontmatter: { title: "Test page", tags: [], ...frontmatter },
        },
      })
      const tree: Root = { type: "root", children: [] }
      await processor.run(tree, file)
      assert.ok(file.data.dates)
      return file.data.dates
    }

    const initialDates = await getDates()
    assert.equal(initialDates.created.toISOString(), "2024-01-02T03:04:05.000Z")
    assert.equal(initialDates.modified.toISOString(), "2024-01-02T03:04:05.000Z")
    assert.equal(initialDates.published.toISOString(), initialDates.created.toISOString())

    await writeFile(path.join(repositoryWorkdir, "other.txt"), "Unrelated")
    git(["add", "other.txt"])
    git(["commit", "--quiet", "-m", "Change another file"], "2025-06-07T08:09:10Z")
    const unchangedDates = await getDates()
    assert.equal(unchangedDates.created.toISOString(), initialDates.created.toISOString())
    assert.equal(unchangedDates.modified.toISOString(), initialDates.modified.toISOString())

    await utimes(pagePath, new Date(), new Date())
    assert.deepEqual(await getDates(), unchangedDates)

    const clone = path.join(repositoryWorkdir, "fresh-checkout")
    git(["clone", "--quiet", "--no-hardlinks", repositoryWorkdir, clone])
    assert.deepEqual(await getDates(path.join(clone, "content/page.md"), clone), initialDates)

    await writeFile(pagePath, "Updated page")
    git(["add", "content/page.md"])
    git(["commit", "--quiet", "-m", "Update page"], "2026-08-09T10:11:12Z")
    const updatedDates = await getDates()
    assert.equal(updatedDates.created.toISOString(), "2024-01-02T03:04:05.000Z")
    assert.equal(updatedDates.modified.toISOString(), "2026-08-09T10:11:12.000Z")

    git(["mv", "content/page.md", "content/renamed.md"])
    git(["commit", "--quiet", "-m", "Rename page"], "2026-09-10T11:12:13Z")
    const renamedPath = path.join(repositoryWorkdir, "content/renamed.md")
    const renamedDates = await getDates(renamedPath)
    assert.equal(renamedDates.created.toISOString(), initialDates.created.toISOString())
    assert.equal(renamedDates.modified.toISOString(), "2026-09-10T11:12:13.000Z")

    const overrides = await getDates(renamedPath, repositoryWorkdir, {
      created: "2020-01-01T00:00:00Z",
      modified: "2021-01-01T00:00:00Z",
      published: "2022-01-01T00:00:00Z",
    })
    assert.equal(overrides.created.toISOString(), "2020-01-01T00:00:00.000Z")
    assert.equal(overrides.modified.toISOString(), "2021-01-01T00:00:00.000Z")
    assert.equal(overrides.published.toISOString(), "2022-01-01T00:00:00.000Z")
  } finally {
    await rm(repositoryWorkdir, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 })
  }
})
