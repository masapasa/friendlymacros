"use client";

import Link from "next/link";
import { Button, buttonVariants } from "~/components/ui/button";
import { useUser } from "~/providers/AuthContextProvider/AuthContextProvider";
import Image from "next/image";
import { cn } from "~/utils/cn";
import { siteConfig } from "~/config/site";

function HomePage() {
  return (
    <>
      <section className="grid items-center justify-center gap-6 pb-8 pt-6 md:pb-12 md:pt-10 lg:pb-24 lg:pt-16">
        <Image
          src={"https://illustrations.popsy.co/gray/romantic-dinner.svg"}
          width={300}
          height={300}
          alt="Hero image"
          priority
        />
        <div className="mx-auto flex flex-col items-start gap-4 lg:w-[52rem]">
          <h1 className="text-3xl font-bold leading-[1.1] tracking-tighter sm:text-5xl md:text-6xl">
            Friendly Macros
          </h1>
          <p className="max-w-[42rem] leading-normal text-slate-700 sm:text-xl sm:leading-8">
            Discover your favorite restaurants, customize your meals with macros
            and more, and share with friends for future cravings!
          </p>
        </div>
        <div className="flex gap-4">
          <Link href="/log-in" className={cn(buttonVariants({ size: "lg" }))}>
            Get Started
          </Link>
          <Link
            href={siteConfig.links.github}
            target="_blank"
            rel="noreferrer"
            className={cn(buttonVariants({ variant: "outline", size: "lg" }))}
          >
            GitHub
          </Link>
        </div>
      </section>
    </>
  );
}

export default HomePage;
