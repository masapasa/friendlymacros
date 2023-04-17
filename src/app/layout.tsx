"use client";
import { api } from "~/utils/api";
import "~/styles/globals.css";
import { Inter } from "@next/font/google";
import { SiteHeader } from "~/components/headers/SiteHeader";
import { cn } from "~/utils/cn";
import { AuthContextProvider } from "~/providers/AuthContextProvider/AuthContextProvider";
import { Toaster } from "~/components/ui/toaster";
import { SiteFooter } from "~/components/Footer";

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
          <div className="container mx-auto flex h-full flex-col items-center space-x-0 px-6 md:space-x-4">
            {children}
            <Toaster />
          </div>
        </AuthContextProvider>
      </body>
    </html>
  );
}

export default api.withTRPC(RootLayout);
