import type { inferRouterOutputs } from "@trpc/server";
import { formatDistance } from "date-fns";
import React from "react";
import { useToast } from "~/hooks/UseToast";
import type { userRouter } from "~/server/api/routers/users";
import { api } from "~/utils/api";
import { Icons } from "../icons";
import { Button } from "../ui/button";
import { Spinner } from "../ui/spinner";
import { UserAvatar } from "../UserAvatar";

type RouterOutput = inferRouterOutputs<typeof userRouter>;

interface FriendCardProps {
  friend: RouterOutput["getFriends"][number];
}

export function FriendCard({ friend }: FriendCardProps) {
  const { toast } = useToast();
  const profile = friend.profiles_friends_friend_idToprofiles;
  const isLoading = false;

  const handleFriendRequestAnswer = (isAccepted: boolean) => {
    return;
  };

  return (
    <div className="flex w-full items-center justify-between rounded-lg border border-slate-200 p-6">
      <div className="flex items-center justify-center gap-4">
        <UserAvatar user={profile} />
        <h3 className="text-md scroll-m-20 font-semibold tracking-tight">
          {profile.email}
        </h3>
      </div>
      <p className="text-sm">
        friends since{" "}
        {friend.created_at &&
          formatDistance(friend.created_at, new Date(), {
            addSuffix: true,
          })}
      </p>
      <Button
        disabled={isLoading}
        variant={"destructive"}
        size={"sm"}
        className="w-30"
        onClick={() => handleFriendRequestAnswer(true)}
      >
        {isLoading ? <Spinner /> : <Icons.trash className="h-4 w-4" />}
      </Button>
    </div>
  );
}
