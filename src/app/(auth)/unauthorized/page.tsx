import Link from "next/link";
import React from "react";
import { Button } from "~/components/ui/button";

function page() {
  return (
    <div className="flex h-screen w-full flex-col items-center justify-center gap-6">
      <h1 className="text-3xl font-semibold">
        Looks like you are not authorized to access this page.
      </h1>
      <p className="text-md">Sign in to gain access</p>

      <Link href="/log-in">
        <Button className="w-60">Sign in</Button>
      </Link>
    </div>
  );
}

export default page;
