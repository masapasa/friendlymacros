import Link from "next/link";
import React from "react";

export function MealsNotFound() {
  return (
    <div className="col-span-4 flex h-96 flex-col items-center justify-center ">
      <h2 className="scroll-m-20 text-3xl font-bold tracking-tight text-slate-600 lg:text-5xl">
        No meals found
      </h2>
      <p className="leading-7 text-slate-500 [&:not(:first-child)]:mt-6">
        You can always try to publish new meal{" "}
        <Link href={"/recipes/new"} className="text-slate-700 underline">
          here
        </Link>
      </p>
    </div>
  );
}
