"use client";

import Link from "next/link";
import { useState } from "react";
import { MealCard } from "~/components/MealCard";
import { MealsNotFound } from "~/components/MealsNotFound";
import { Button } from "~/components/ui/button";
import { api } from "~/utils/api";

function Recipes() {
  const [page, setPage] = useState(0);

  const { data, fetchNextPage } = api.meal.getInfiniteMeals.useInfiniteQuery(
    {
      limit: 20,
    },
    {
      getNextPageParam: (lastPage) => lastPage.nextCursor,
    }
  );

  const [mealsToShow, setMealsToShow] = useState(data?.pages[page]?.items);

  const handleFetchNextPage = () => {
    void fetchNextPage();
    setPage((prev) => prev + 1);
  };

  return (
    <div className="grid h-screen w-full auto-rows-min grid-cols-4 gap-6">
      <Link href={"/recipes/new"} className="col-span-4 mt-6">
        <Button variant={"outline"} className="w-full">
          Create new meal
        </Button>
      </Link>

      <hr className="col-span-4" />

      {mealsToShow ? (
        mealsToShow.map((meal, index) => <MealCard meal={meal} key={index} />)
      ) : (
        <MealsNotFound />
      )}
    </div>
  );
}

export default Recipes;
