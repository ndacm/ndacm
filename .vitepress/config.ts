import { DefaultTheme, defineConfig } from "vitepress";

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "Notre Dame ACM Student Chapter",
  description: "The official website of the Notre Dame ACM Student Chapter",
  lastUpdated: true,

  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: "Home", link: "/" },
      { text: "Updates", link: "/" },
      { text: "ProDev", link: "/pd", activeMatch: "/pd/*" },
    ],

    sidebar: {
      "/updates/": { base: "/updates/", items: sidebarUpdates() },
      "/pd/": { base: "/pd/", items: sidebarPD() },
    },

    socialLinks: [
      { icon: "github", link: "https://github.com/ndacm" },
      { icon: "discord", link: "https://discord.gg/HWZaUbTbwb" },
      { icon: "linkedin", link: "https://linkedin.com/company/ndcomputer" },
      { icon: "instagram", link: "https://instagram.com/computerclubnd" },
    ],

    editLink: {
      pattern: "https://github.com/ndacm/ndacm/edit/main/:path",
      text: "Edit this page on GitHub",
    },
  },
});

function sidebarUpdates(): DefaultTheme.SidebarItem[] {
  return [];
}

function sidebarPD(): DefaultTheme.SidebarItem[] {
  return [
    {
      text: "Resume",
      base: "/pd/resume",
      items: [
        { text: "Introduction", link: "/" },
        { text: "Power Verbs", link: "/verbs" },
        { text: "Accomplishment Statements", link: "/accomplishment" },
        { text: "Formatting Checklist", link: "/formatting" },
        { text: "Templates (coming soon)", link: "404" },
      ],
    },
    { text: "Coming Soon" },
  ];
}
