import { QuartzConfig } from "./quartz/cfg"
import * as Plugin from "./quartz/plugins"

/**
 * Quartz 4 Configuration
 *
 * See https://quartz.jzhao.xyz/configuration for more information.
 */
const config: QuartzConfig = {
  configuration: {
    pageTitle: "Floris Vossebeld",
    pageTitleSuffix: " · digital garden",
    enableSPA: true,
    enablePopovers: true,
    analytics: null,
    locale: "en-US",
    baseUrl: "fvossebeld.github.io",
    ignorePatterns: ["private", "templates", ".obsidian"],
    defaultDateType: "modified",
    theme: {
      fontOrigin: "googleFonts",
      cdnCaching: true,
      typography: {
        header: { name: "Spectral", weights: [400, 600, 700] },
        body: { name: "Spectral", weights: [400, 500, 600, 700], includeItalic: true },
        code: { name: "Spline Sans Mono", weights: [400, 500, 600] },
      },
      colors: {
        // Cool "working paper": near-white paper, near-black ink, one Prussian-ink accent.
        // Kept as sRGB hex so the graph (d3/pixi) and OG generator (satori) parse them.
        lightMode: {
          light: "#f7f8fa",
          lightgray: "#e3e6ec",
          gray: "#5a626e",
          darkgray: "#2b313b",
          dark: "#161a21",
          secondary: "#2c5285",
          tertiary: "#35629a",
          highlight: "rgba(44, 82, 133, 0.10)",
          textHighlight: "rgba(61, 109, 170, 0.24)",
        },
        darkMode: {
          light: "#14171c",
          lightgray: "#282d36",
          gray: "#8a929e",
          darkgray: "#ccd2db",
          dark: "#eceff4",
          secondary: "#7ca7d9",
          tertiary: "#9ac2ec",
          highlight: "rgba(124, 167, 217, 0.14)",
          textHighlight: "rgba(124, 167, 217, 0.24)",
        },
      },
    },
  },
  plugins: {
    transformers: [
      Plugin.FrontMatter(),
      Plugin.CreatedModifiedDate({
        priority: ["frontmatter", "git", "filesystem"],
      }),
      Plugin.SyntaxHighlighting({
        theme: {
          light: "github-light",
          dark: "github-dark",
        },
        keepBackground: false,
      }),
      Plugin.ObsidianFlavoredMarkdown({ enableInHtmlEmbed: false }),
      Plugin.GitHubFlavoredMarkdown(),
      Plugin.TableOfContents(),
      Plugin.CrawlLinks({ markdownLinkResolution: "shortest" }),
      Plugin.Description(),
      Plugin.Latex({ renderEngine: "katex" }),
    ],
    filters: [Plugin.RemoveDrafts()],
    emitters: [
      Plugin.AliasRedirects(),
      Plugin.ComponentResources(),
      Plugin.ContentPage(),
      Plugin.FolderPage(),
      Plugin.TagPage(),
      Plugin.ContentIndex({
        enableSiteMap: true,
        enableRSS: true,
      }),
      Plugin.Assets(),
      Plugin.Static(),
      Plugin.Favicon(),
      Plugin.NotFoundPage(),
      // Comment out CustomOgImages to speed up build time
      Plugin.CustomOgImages(),
    ],
  },
}

export default config
