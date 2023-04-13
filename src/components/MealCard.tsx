import React from "react";
import { api } from "~/utils/api";
import { mealRouter } from "~/server/api/routers/meals";
import { inferRouterOutputs } from "@trpc/server";

type RouterOutput = inferRouterOutputs<typeof mealRouter>;

interface MealCardProps {
  meal: RouterOutput["getInfiniteMeals"]["items"][0];
}

export const MealCard = ({ meal }: MealCardProps) => {
  console.log(meal);
  return <div>MealCard</div>;
};
