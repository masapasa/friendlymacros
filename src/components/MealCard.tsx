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
      <div className="col-span-4 flex-col space-y-4 rounded-md border border-slate-300 px-6 py-6 text-center hover:border-slate-400 md:col-span-2 lg:col-span-1">
        {meal.image_url && (
          <AspectRatio ratio={16 / 9}>
            <Link href={`/recipes/${meal.id}`} className="col-span-4">
              <Image
                src={meal.image_url}
                alt={meal.name}
                width={500}
                height={500}
                className="rounded-md"
              />
            </Link>
          </AspectRatio>
        )}

        <Link href={`/recipes/${meal.id}`} className="col-span-4">
          <h3 className="text-xl font-semibold">{meal.name}</h3>
        </Link>

        <div className="flex items-center justify-between px-3">
          <div className="flex gap-2">
          <LikeButton condition={meal.isLiked} mealId={meal.id} />
          <Link href={`/restaurant?name=${meal.restaurant}`}>
            <p className="text-xl font-semibold">{meal.restaurant}</p>
          </Link>

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
      </div>
    </>
  );
};
