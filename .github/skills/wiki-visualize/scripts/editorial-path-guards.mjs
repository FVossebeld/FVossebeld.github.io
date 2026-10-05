import assert from "node:assert/strict"
import { lstat, realpath } from "node:fs/promises"
import { basename, dirname, isAbsolute, join, parse, relative, resolve, sep } from "node:path"

export async function canonicalPath(input) {
  let ancestor = resolve(input)
  const suffix = []
  while (true) {
    try {
      await lstat(ancestor)
    } catch (error) {
      if (error.code !== "ENOENT") throw error
      const parent = dirname(ancestor)
      if (parent === ancestor) throw error
      suffix.unshift(basename(ancestor))
      ancestor = parent
      continue
    }
    // Resolve links only after lstat: a dangling link must fail, not become a suffix.
    return join(await realpath(ancestor), ...suffix)
  }
}

function contains(parent, child) {
  const normalize = (path) => (process.platform === "win32" ? path.toLowerCase() : path)
  const difference = relative(normalize(parent), normalize(child))
  return (
    difference === "" ||
    (!isAbsolute(difference) && difference !== ".." && !difference.startsWith(".." + sep))
  )
}

export async function guardPaths(paths) {
  const [fixture, output, screenshots, repository] = await Promise.all(
    [paths.fixture, paths.output, paths.screenshots, paths.repository].map(canonicalPath),
  )
  assert.notEqual(output, parse(output).root, "Output must not be a filesystem root.")
  assert(
    !contains(output, repository) && !contains(repository, output),
    "Use an isolated output directory outside the repository.",
  )
  assert(
    !contains(output, fixture) && !contains(fixture, output),
    "Fixture and output directories must not overlap: Quartz cleans the output.",
  )
  assert(
    !contains(output, screenshots) && !contains(screenshots, output),
    "Screenshots and output directories must not overlap.",
  )
  return { fixture, output, screenshots, repository }
}
