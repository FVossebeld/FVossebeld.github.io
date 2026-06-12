import { PageLayout, SharedLayout } from "./quartz/cfg"
import * as Component from "./quartz/components"

// Sidebar menu. Order follows the site's reading order: essays first, then
// concept notes, with standalone meta pages (About, How this works) below.
// Folders open by default so the small garden is browsable at a glance.
// useSavedState is off so the open default always wins: this garden is small
// enough that the menu should act as a fixed map, and it also avoids a stale
// collapsed state lingering in returning visitors' localStorage.
// The sort runs in the browser (serialized via toString), so it must stay
// self-contained: no references to anything outside the function body.
const explorer = Component.Explorer({
  folderDefaultState: "open",
  useSavedState: false,
  sortFn: (a, b) => {
    const order = ["thoughts", "concepts"]
    const ra = order.indexOf(a.slugSegment)
    const rb = order.indexOf(b.slugSegment)
    const wa = ra === -1 ? order.length : ra
    const wb = rb === -1 ? order.length : rb
    if (wa !== wb) return wa - wb
    if (a.isFolder !== b.isFolder) return a.isFolder ? -1 : 1
    return a.displayName.localeCompare(b.displayName, undefined, {
      numeric: true,
      sensitivity: "base",
    })
  },
})

// components shared across all pages
export const sharedPageComponents: SharedLayout = {
  head: Component.Head(),
  header: [],
  afterBody: [
    Component.ConditionalRender({
      component: Component.RecentNotes({
        title: "Latest",
        limit: 8,
        showTags: true,
        filter: (f) => {
          const slug = f.slug ?? ""
          const isNote = slug.startsWith("thoughts/") || slug.startsWith("concepts/")
          return isNote && !slug.endsWith("/index")
        },
      }),
      condition: (page) => page.fileData.slug === "index",
    }),
    // "Connections" foot: backlinks + the local graph, demoted out of the
    // reading view so they appear once the essay is read, not alongside it.
    // Off on the homepage, which carries its own "Latest" list above.
    Component.ConditionalRender({
      component: Component.Backlinks(),
      condition: (page) => page.fileData.slug !== "index",
    }),
    Component.ConditionalRender({
      component: Component.Graph(),
      condition: (page) => page.fileData.slug !== "index",
    }),
    Component.GardenAgent({
      endpoint: "https://ca-gtjqxftcetisc.mangosand-dc7dc8b1.eastus2.azurecontainerapps.io/",
      repo: "FVossebeld/FVossebeld.github.io",
      label: "from-agent",
    }),
  ],
  footer: Component.Footer({
    links: {
      GitHub: "https://github.com/FVossebeld/FVossebeld.github.io",
      "Source code": "https://github.com/FVossebeld/FVossebeld.github.io",
    },
  }),
}

// components for pages that display a single page (e.g. a single note)
export const defaultContentPageLayout: PageLayout = {
  beforeBody: [
    Component.ConditionalRender({
      component: Component.Breadcrumbs(),
      condition: (page) => page.fileData.slug !== "index",
    }),
    Component.ArticleTitle(),
    Component.ConditionalRender({
      component: Component.ContentMeta(),
      condition: (page) => page.fileData.slug !== "index",
    }),
    Component.ConditionalRender({
      component: Component.TagList(),
      condition: (page) => page.fileData.slug !== "index",
    }),
  ],
  left: [
    Component.PageTitle(),
    Component.MobileOnly(Component.Spacer()),
    Component.Flex({
      components: [
        {
          Component: Component.Search(),
          grow: true,
        },
        { Component: Component.Darkmode() },
        { Component: Component.ReaderMode() },
      ],
    }),
    Component.SiteNav({
      links: {
        Thoughts: "/thoughts/",
        Concepts: "/concepts/",
        About: "/about",
        "How this works": "/how-this-works",
      },
    }),
  ],
  right: [Component.DesktopOnly(Component.TableOfContents())],
}

// components for pages that display lists of pages  (e.g. tags or folders)
export const defaultListPageLayout: PageLayout = {
  beforeBody: [Component.Breadcrumbs(), Component.ArticleTitle(), Component.ContentMeta()],
  left: [
    Component.PageTitle(),
    Component.MobileOnly(Component.Spacer()),
    Component.Flex({
      components: [
        {
          Component: Component.Search(),
          grow: true,
        },
        { Component: Component.Darkmode() },
      ],
    }),
    explorer,
  ],
  right: [],
}
