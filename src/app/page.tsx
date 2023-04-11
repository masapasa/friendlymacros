"use client";

import Link from "next/link";
import { Button } from "~/components/ui/button";
import { useUser } from "~/providers/AuthContextProvider/AuthContextProvider";

function HomePage() {
  const { user } = useUser();

  return (
    <div className="flex w-screen flex-col items-center justify-center">
      <h1 className="text-5xl font-bold">Friendly Macros</h1>
      <p className="py-6">
        Discover your favorite restaurants, customize your meals with macros
        <br />
        and more, and share with friends for future cravings!
      </p>
      <div className="flex gap-6">
        <Link href={user ? "/feed" : "/log-in"}>
          <Button className="btn w-60">Log in</Button>
        </Link>
      </div>
    </div>
  );
}

export default HomePage;
