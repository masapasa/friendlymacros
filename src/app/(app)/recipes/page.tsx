"use client";

import Link from "next/link";
import { useState } from "react";
import { MealCard } from "~/components/MealCard";
import { MealsNotFound } from "~/components/MealsNotFound";
import { Button } from "~/components/ui/button";
import { Spinner } from "~/components/ui/spinner";
import { api } from "~/utils/api";

function Recipes() {
  const [page, setPage] = useState(0);

  const { data, fetchNextPage, isLoading } =
    api.meal.getInfiniteMeals.useInfiniteQuery(
      {
        limit: 20,
      },
      {
        getNextPageParam: (lastPage) => lastPage.nextCursor,
      }
    );

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

      {isLoading && <Spinner />}

      {data?.pages[page]?.items.length === 0 ? (
        <MealsNotFound />
      ) : (
        data?.pages[page]?.items.map((meal) => (
          <MealCard meal={meal} key={meal.id} />
        ))
      )}
    </div>
  );
}

export default Recipes;
