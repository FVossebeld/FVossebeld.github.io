import assert from "node:assert/strict"
import { execFileSync } from "node:child_process"
import { mkdtemp, mkdir, rm, writeFile } from "node:fs/promises"
import os from "node:os"
import path from "node:path"
import test from "node:test"
import { CreatedModifiedDate } from "./lastmod"

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
    const transform = plugin.markdownPlugins!({
      argv: { directory: repositoryWorkdir },
    } as never)[0] as unknown as () => (tree: unknown, file: unknown) => Promise<void>
    const transformer = transform()
    const getDates = async () => {
      const file = {
        data: {
          filePath: pagePath,
          relativePath: "content/page.md",
          frontmatter: {},
        },
      }
      await transformer({}, file)
      return (file.data as unknown as { dates: { created: Date; modified: Date } }).dates
    }

    const initialDates = await getDates()
    assert.equal(initialDates.created.toISOString(), "2024-01-02T03:04:05.000Z")
    assert.equal(initialDates.modified.toISOString(), "2024-01-02T03:04:05.000Z")

    await writeFile(path.join(repositoryWorkdir, "other.txt"), "Unrelated")
    git(["add", "other.txt"])
    git(["commit", "--quiet", "-m", "Change another file"], "2025-06-07T08:09:10Z")
    const unchangedDates = await getDates()
    assert.equal(unchangedDates.created.toISOString(), initialDates.created.toISOString())
    assert.equal(unchangedDates.modified.toISOString(), initialDates.modified.toISOString())

    await writeFile(pagePath, "Updated page")
    git(["add", "content/page.md"])
    git(["commit", "--quiet", "-m", "Update page"], "2026-08-09T10:11:12Z")
    const updatedDates = await getDates()
    assert.equal(updatedDates.created.toISOString(), "2024-01-02T03:04:05.000Z")
    assert.equal(updatedDates.modified.toISOString(), "2026-08-09T10:11:12.000Z")
  } finally {
    await rm(repositoryWorkdir, { recursive: true, force: true })
  }
})
