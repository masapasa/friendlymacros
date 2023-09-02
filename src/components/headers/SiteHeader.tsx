"use client";

import Link from "next/link";
import { MainNav } from "../navbars/main-nav";
import { buttonVariants } from "~/components/ui/button";
import { siteConfig } from "~/config/site";
import { cn } from "~/utils/cn";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-b-slate-200 bg-white">
      <div className="container mx-auto flex h-16 items-center justify-between space-x-4 sm:space-x-0">
        <MainNav items={siteConfig.mainNav} />
        <nav>
          <Link
            href="/log-in"
            className={cn(buttonVariants({ size: "sm" }), "px-4")}
          >
            Login
          </Link>
        </nav>
      </div>
    </header>
  );
}
