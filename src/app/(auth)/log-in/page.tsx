"use client";

import React from "react";
import { Button } from "~/components/ui/button";
import { WithPrivateRoute } from "~/components/withPrivateRoute";
import { supabase } from "~/utils/supabase-client";

function LogIn() {
  async function signInWithGoogle() {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${window.location.origin}/feed`,
      },
    });

    console.log(error);
  }

  return (
    <div className="flex w-screen flex-col items-center justify-center">
      <div className="flex gap-6">
        <Button className="btn w-60" onClick={() => void signInWithGoogle()}>
          Log in with Google
        </Button>
      </div>
    </div>
  );
}

export default LogIn;
