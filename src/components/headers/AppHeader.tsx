import Link from "next/link";

import { Icons } from "../icons";
import { MainNav } from "../navbars/main-nav";
import { buttonVariants } from "~/components/ui/button";
import { appConfig } from "~/config/app";
import { UserAccountNav } from "../navbars/UserAccountNav";

export function AppHeader() {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-b-slate-200 bg-white">
      <div className="container mx-auto flex h-16 items-center justify-between space-x-4 sm:space-x-0">
        <MainNav items={appConfig.mainNav} />
        <div className="flex flex-1 items-center justify-end space-x-4">
          <nav className="flex items-center space-x-1">
            <UserAccountNav />
          </nav>
        </div>
      </div>
    </header>
  );
}
