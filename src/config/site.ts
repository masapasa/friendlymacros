import { NavItem } from "../types/NavItem";

interface SiteConfig {
  name: string;
  description: string;
  mainNav: NavItem[];
  links: {
    github: string;
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
  ],
  links: {
    github: "https://github.com/F-PTS",
  },
};
