"use client";

import { SiteFooter } from "~/components/Footer";
import { AppHeader } from "~/components/headers/AppHeader";
import { Toaster } from "~/components/ui/toaster";
import { WithPrivateRoute } from "~/utils/withPrivateRoute";

function layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="container mx-auto flex min-h-screen flex-col items-center justify-between space-x-0">
      <AppHeader />
      <main className="mb-6 h-full w-full flex-1">{children}</main>
      <SiteFooter />
    </div>
  );
}

export default layout;
