"use client";

import { useState } from "react";

import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { Spinner } from "~/components/ui/spinner";
import { UserSearchCard } from "~/components/UserSearchCard";
import { useUser } from "~/providers/AuthContextProvider/AuthContextProvider";
import { api } from "~/utils/api";

function Friends() {
  const userId = useUser().user?.id;
  const [searchValue, setSearchValue] = useState<string>("");
  const [page, setPage] = useState(0);

  const { data, fetchNextPage } = api.user.getInfiniteUsers.useInfiniteQuery(
    {
      limit: 20,
      email: searchValue,
    },
    {
      getNextPageParam: (lastPage) => lastPage.nextCursor,
    }
  );

  return (
    <div className="grid-col-6 mt-6 grid w-full gap-6">
      <div className="col-span-6 grid items-center gap-1.5">
        <Input
          type="text"
          id="search"
          className="col-span-6"
          placeholder="Search for user"
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
        />
      </div>

      {data?.pages[page]?.items.length === 0 ||
      data?.pages[page]?.items[0]?.id === userId ? (
        <h3 className="col-span-6 scroll-m-20 text-center text-xl tracking-tight">
          No profiles found
        </h3>
      ) : (
        data?.pages[page]?.items.map((profile) => (
          <UserSearchCard key={profile.id} profile={profile} />
        ))
      )}

      <hr className="col-span-6" />
    </div>
  );
}

export default Friends;
