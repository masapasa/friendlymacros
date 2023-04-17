import React from "react";
import { api } from "~/utils/api";
import { Icons } from "../icons";
import { Toggle } from "../ui/toggle";

interface LikeButtonProps {
  condition: boolean | undefined;
  mealId: string;
}

export function LikeButton({ condition, mealId }: LikeButtonProps) {
  const utils = api.useContext();
  const { mutateAsync } = api.meal.likeMeal.useMutation({
    onSuccess: () => {
      void utils.meal.getMeals.invalidate();
    },
  });

  const { mutateAsync: unlikeMutateAsync } = api.meal.unlikeMeal.useMutation({
    onSuccess: () => {
      void utils.meal.getMeals.invalidate();
    },
  });

  const handleLikeChange = () => {
    if (!condition) return void mutateAsync({ meal_id: mealId });
    void unlikeMutateAsync({ meal_id: mealId });
  };

  return (
    <Toggle variant="outline" onPressedChange={() => handleLikeChange()}>
      {condition ? (
        <Icons.likeActive fill="#ef4444" color="#ef4444" />
      ) : (
        <Icons.like />
      )}
    </Toggle>
  );
}
