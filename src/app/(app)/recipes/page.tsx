"use client";

import Link from "next/link";
import { useState } from "react";
import { MealCard } from "~/components/MealCard";
import { MealsNotFound } from "~/components/MealsNotFound";
import { Button } from "~/components/ui/button";
import { Spinner } from "~/components/ui/spinner";
import { api } from "~/utils/api";
import {
  DropdownMenu,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuContent
  } from "@/components/ui/dropdown-menu";
  import { DropdownMenuCheckboxItem } from "@radix-ui/react-dropdown-menu";
  import { UserAvatar } from "~/components/UserAvatar";

  function Recipes() {
    const [friendsFilter, setFriendsFilter] = useState<string[]>([]);
    const { data: getFriendsData } = api.user.getFriends.useQuery();
    const { data, isLoading } = api.meal.getMeals.useQuery({
      friendFilter: friendsFilter,
    });

    const handleUserSelected = (userId: string, checked: boolean) => {
      if (checked) {
        setFriendsFilter((current) => [...current, userId]);
        return;
      }

      setFriendsFilter((current) =>
        current.filter((friendsFilter) => friendsFilter !== userId)
      );
    };

    return (
      <div className="grid w-full auto-rows-min grid-cols-4 gap-6">
        <div className="col-span-2 mt-6">
          <DropdownMenu>
            <DropdownMenuTrigger className="col-span-2 w-full">
              <Button variant={"outline"} className="w-full">
                Filter by a friend
              </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent className="col-span-2 w-full">
              <DropdownMenuLabel>Your Friends</DropdownMenuLabel>
              <DropdownMenuSeparator />
              {getFriendsData &&
                getFriendsData.map((friend) => (
                  <DropdownMenuCheckboxItem
                    key={friend.friend_id}
                    className="px-3 py-3"
                    onCheckedChange={(value) =>
                      handleUserSelected(friend.friend_id, value)
                    }
                  >
                    <div className="flex items-center justify-start gap-3">
                      <UserAvatar
                        user={friend.profiles_friends_friend_idToprofiles}
                        className="h-6 w-6"
                      />
                      <p className="text-sm">
                        {friend.profiles_friends_friend_idToprofiles.email}
                      </p>
                    </div>
                  </DropdownMenuCheckboxItem>
                ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <Link href={"/recipes/new"} className="col-span-2 mt-6">
          <Button variant={"outline"} className="w-full">
            Create new meal
          </Button>
        </Link>

        <hr className="col-span-4" />

        {isLoading && (
          <div className="col-span-4 flex h-screen w-full items-center justify-center">
            <Spinner />
          </div>
        )}

        {data?.length === 0 ? (
          <MealsNotFound />
        ) : (
          data?.map((meal) => <MealCard meal={meal} key={meal.id} />)
        )}
      </div>
    );
  }

export default Recipes;
