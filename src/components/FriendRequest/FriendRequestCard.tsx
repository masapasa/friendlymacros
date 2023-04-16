import type { inferRouterOutputs } from "@trpc/server";
import { formatDistance } from "date-fns";
import React from "react";
import { useToast } from "~/hooks/UseToast";
import type { userRouter } from "~/server/api/routers/users";
import { api } from "~/utils/api";
import { Button } from "../ui/button";
import { Spinner } from "../ui/spinner";
import { UserAvatar } from "../UserAvatar";

type RouterOutput = inferRouterOutputs<typeof userRouter>;

interface FriendRequestCardProps {
  friendRequest: RouterOutput["getFriendRequests"][number];
}

export function FriendRequestCard({ friendRequest }: FriendRequestCardProps) {
  const { toast } = useToast();
  const profile = friendRequest.profiles_invites_sender_idToprofiles;

  const { mutateAsync: mutateAsyncAccept, isLoading: isAcceptLoading } =
    api.user.acceptFriendRequest.useMutation();

  const { mutateAsync: mutateAsyncDecline, isLoading: isDeclineLoading } =
    api.user.declineFriendRequest.useMutation();

  const handleFriendRequestAnswer = (isAccepted: boolean) => {
    if (isAccepted) return void mutateAsyncAccept({ sender_id: profile.id });

    return void mutateAsyncDecline({ sender_id: profile.id });
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
        sent{" "}
        {friendRequest.created_at &&
          formatDistance(friendRequest.created_at, new Date(), {
            addSuffix: true,
          })}
      </p>
      <div className="flex items-center justify-center gap-4">
        <Button
          disabled={isDeclineLoading}
          variant={"outline"}
          className="w-30"
          onClick={() => handleFriendRequestAnswer(false)}
        >
          {isDeclineLoading ? <Spinner /> : "decline"}
        </Button>
        <Button
          disabled={isAcceptLoading}
          className="w-30"
          onClick={() => handleFriendRequestAnswer(true)}
        >
          {isAcceptLoading ? <Spinner /> : "accept"}
        </Button>
      </div>
    </div>
  );
}
