import type { NavItem } from "../types/NavItem";

interface SiteConfig {
  name: string;
  description: string;
  mainNav: NavItem[];
  links: {
    github: string;
    linkedin: string;
  };
}

export const siteConfig: SiteConfig = {
  name: "FriendlyMacros",
  description:
    "Customize your meals with macros and discover new restaurants with Friendly Macros!",
  mainNav: [
    {
      title: "Home",
      href: "/",
    },
    {
      title: "Sign in",
      href: "/log-in",
    },
    {
      title: "Github",
      href: "https://github.com/F-PTS",
    },
  ],
  links: {
    github: "https://github.com/F-PTS/FriendlyMacros",
    linkedin: "https://www.linkedin.com/in/fppts/",
  },
};
