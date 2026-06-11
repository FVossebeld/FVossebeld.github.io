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
    analytics: {
      provider: null,
    },
    locale: "en-US",
    baseUrl: "fvossebeld.github.io",
    ignorePatterns: ["private", "templates", ".obsidian"],
    defaultDateType: "modified",
    theme: {
      fontOrigin: "googleFonts",
      cdnCaching: true,
      typography: {
        header: "Literata",
        body: "Source Sans 3",
        code: "Spline Sans Mono",
      },
      colors: {
        lightMode: {
          light: "#f7f3ea",
          lightgray: "#e7e0d1",
          gray: "#6f736d",
          darkgray: "#2b302c",
          dark: "#1f2421",
          secondary: "#53665a",
          tertiary: "#8a6f4d",
          highlight: "rgba(83, 102, 90, 0.10)",
          textHighlight: "rgba(199, 160, 121, 0.32)",
        },
        darkMode: {
          light: "#1b1a17",
          lightgray: "#322f29",
          gray: "#8c8a82",
          darkgray: "#d8d3c7",
          dark: "#f2eee3",
          secondary: "#9db0a0",
          tertiary: "#c2a079",
          highlight: "rgba(157, 176, 160, 0.12)",
          textHighlight: "rgba(194, 160, 121, 0.24)",
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
