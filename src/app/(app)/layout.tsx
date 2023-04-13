import { Toaster } from "~/components/ui/toaster";

function layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="container mx-auto flex flex-col items-center space-x-4 sm:justify-between sm:space-x-0">
      {children}
      <Toaster />
    </div>
  );
}

export default layout;
