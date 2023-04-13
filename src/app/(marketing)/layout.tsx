import { AppHeader } from "~/components/headers/AppHeader";
import { SiteHeader } from "~/components/headers/SiteHeader";
import { Toaster } from "~/components/ui/toaster";

function layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="container mx-auto flex flex-col items-center space-x-4 sm:justify-between sm:space-x-0">
      <SiteHeader />
      {children}
    </div>
  );
}

export default layout;
