import Link from "next/link";

import { Icons } from "../icons";
import { MainNav } from "./main-nav";
import { buttonVariants } from "~/components/ui/button";
import { siteConfig } from "~/config/site";

export function SiteHeader() {
  return (
    <header className="light:bg-white light:border-b-slate-200 sticky top-0 z-40 w-full border-b dark:border-b-slate-700 dark:bg-slate-900">
      <div className="container mx-auto flex h-16 items-center space-x-4 sm:justify-between sm:space-x-0">
        <MainNav items={siteConfig.mainNav} />
        <div className="flex flex-1 items-center justify-end space-x-4">
          <nav className="flex items-center space-x-1">
            <Link
              href={siteConfig.links.github}
              target="_blank"
              rel="noreferrer"
            >
              <div
                className={buttonVariants({
                  size: "sm",
                  variant: "ghost",
                  className: "text-slate-700 dark:text-slate-400",
                })}
              >
                <Icons.gitHub className="h-5 w-5" />
                <span className="sr-only">GitHub</span>
              </div>
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
}
