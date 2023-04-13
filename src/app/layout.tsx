"use client";
import { api } from "~/utils/api";
import "~/styles/globals.css";
import { Inter } from "@next/font/google";
import { SiteHeader } from "~/components/headers/SiteHeader";
import { cn } from "~/utils/cn";
import { AuthContextProvider } from "~/providers/AuthContextProvider/AuthContextProvider";
import { Toaster } from "~/components/ui/toaster";

const fontSans = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={cn(
        "bg-white font-sans text-slate-900 antialiased",
        fontSans.variable
      )}
    >
      <head />
      <body className="min-h-screen">
        <AuthContextProvider>
          <div className="container mx-auto flex flex-col items-center space-x-4 px-6 sm:justify-between sm:space-x-0">
            {children}
          </div>
        </AuthContextProvider>
      </body>
    </html>
  );
}

export default api.withTRPC(RootLayout);
