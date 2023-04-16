import React from "react";
import type { mealRouter } from "~/server/api/routers/meals";
import type { inferRouterOutputs } from "@trpc/server";
import { Icons } from "./icons";
import Image from "next/image";
import { AspectRatio } from "@radix-ui/react-aspect-ratio";
import { Button } from "./ui/button";
import { Toggle } from "@/components/ui/toggle";
import { api } from "~/utils/api";
import Link from "next/link";
import { LikeButton } from "./LikeButton/LikeButton";

type RouterOutput = inferRouterOutputs<typeof mealRouter>;

interface MealCardProps {
  meal: RouterOutput["getMeals"][number];
}

export const MealCard = ({ meal }: MealCardProps) => {
  return (
    <>
      <div className="col-span-4 flex-col space-y-4 rounded-md border border-slate-300 px-6 py-6 text-center hover:border-slate-400">
        {meal.image_url && (
          <AspectRatio ratio={16 / 9}>
            <Image
              alt={meal.name}
              src={meal.image_url}
              className="rounded-sm"
              fill
            />
          </AspectRatio>
        )}

        <h4 className="mt-8 scroll-m-20 text-2xl font-semibold tracking-tight">
          {meal.name}
        </h4>

        <hr />

        <div className="flex items-center justify-around">
          <div className="flex gap-2">
            <p className="text-sm">
              {meal.restaurant}, {meal.city}
            </p>
          </div>

          <div className="flex gap-2">
            <div className="flex gap-1">
              <Icons.protein className="h-4 w-4" />
              <p className="text-sm">{meal.protein}</p>
            </div>

            <div className="flex gap-1">
              <Icons.carbs className="h-4 w-4" />
              <p className="text-sm">{meal.carbs}</p>
            </div>

            <div className="flex gap-1">
              <Icons.fat className="h-4 w-4" />
              <p className="text-sm">{meal.fats}</p>
            </div>
          </div>
        </div>
        <hr className="my-2" />
        <div className="grid w-full grid-cols-5 gap-2">
          <Link href={`/recipes/${meal.id}`} className="col-span-4">
            <Button className="w-full">See details</Button>
          </Link>

          <LikeButton condition={meal.isLiked} mealId={meal.id} />
        </div>
      </div>
    </>
  );
};
