import assert from "node:assert/strict"
import { execFileSync } from "node:child_process"
import { mkdtemp, mkdir, rm, writeFile } from "node:fs/promises"
import os from "node:os"
import path from "node:path"
import test from "node:test"
import { getFileCreatedDate } from "./lastmod"

test("Git creation date stays stable across unrelated commits", async () => {
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
    await writeFile(path.join(repositoryWorkdir, "content/page.md"), "Page")
    git(["add", "content/page.md"])
    git(["commit", "--quiet", "-m", "Add page"], "2024-01-02T03:04:05Z")

    const initialCreatedDate = await getFileCreatedDate(repositoryWorkdir, "content/page.md")
    assert.equal(initialCreatedDate, Date.parse("2024-01-02T03:04:05Z"))

    await writeFile(path.join(repositoryWorkdir, "other.txt"), "Unrelated")
    git(["add", "other.txt"])
    git(["commit", "--quiet", "-m", "Change another file"], "2025-06-07T08:09:10Z")

    assert.equal(
      await getFileCreatedDate(repositoryWorkdir, "content/page.md"),
      initialCreatedDate,
    )
  } finally {
    await rm(repositoryWorkdir, { recursive: true, force: true })
  }
})
