import type { inferRouterOutputs } from "@trpc/server";
import React from "react";
import { useToast } from "~/hooks/UseToast";
import type { userRouter } from "~/server/api/routers/users";
import { api } from "~/utils/api";
import { Button } from "./ui/button";
import { Spinner } from "./ui/spinner";
import { UserAvatar } from "./UserAvatar";

type RouterOutput = inferRouterOutputs<typeof userRouter>;

interface UserSearchCardProps {
  profile: RouterOutput["getInfiniteUsers"]["items"][number];
}

export function UserSearchCard({ profile }: UserSearchCardProps) {
  const { toast } = useToast();
  const { mutateAsync, isLoading } = api.user.sendFriendRequest.useMutation({
    onSuccess: () => {
      toast({
        title: "Friend request sent",
      });
    },
    onError: (error) => {
      toast({
        variant: "destructive",
        title: "Error sending friend request",
        description: error.message,
      });
    },
  });

  const handleSendingFriendRequest = () => {
    void mutateAsync({ recieverId: profile.id });
  };

  return (
    <div className="col-span-6 flex items-center justify-between rounded-lg border border-slate-200 p-6">
      <div className="flex items-center justify-center gap-4">
        <UserAvatar user={profile} />
        <h3 className="text-md scroll-m-20 font-semibold tracking-tight">
          {profile.email}
        </h3>
      </div>
      <p className="text-sm">{profile._count.meals} meals created</p>
      <Button
        onClick={() => handleSendingFriendRequest()}
        disabled={isLoading}
        className="w-30"
      >
        {isLoading ? <Spinner /> : "Send Invitation"}
      </Button>
    </div>
  );
}
