"use client";

import React from "react";
import { Button } from "~/components/ui/button";
import { supabase } from "~/utils/supabase-client";
import Image from "next/image";
import { prisma } from "~/server/db";

function LogIn() {
  async function signInWithGoogle() {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${window.location.origin}/recipes`,
      },
    });
  }

  return (
    <div className="flex h-screen w-screen flex-col items-center justify-center gap-6">
      <Image
        src="https://illustrations.popsy.co/gray/woman-eating-salad.svg"
        width={250}
        height={250}
        alt="Hero image"
        priority
      />
      <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">
        Welcome to Friendly Macros!
      </h3>
      <Button className="btn w-60" onClick={() => void signInWithGoogle()}>
        Sign in with Google
      </Button>
    </div>
  );
}

export default LogIn;
