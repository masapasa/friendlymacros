import React from "react";
import { useToast } from "~/hooks/UseToast";
import { api } from "~/utils/api";
import { FriendRequestCard } from "./FriendRequestCard";

export function FriendRequestList() {
  const { toast } = useToast();
  const { data } = api.user.getFriendRequests.useQuery(undefined, {
    onError: (error) => {
      toast({
        variant: "destructive",
        title: "Error getting friend requests",
        description: error.message,
      });
    },
  });

  return (
    <div
      className={`col-span-6  flex max-h-48 w-full flex-col items-center justify-start gap-3 overflow-y-auto ${
        data && data.length > 2 ? "pr-6" : ""
      }`}
    >
      {data &&
        (data.length === 0 ? (
          <h4 className="text-xl text-slate-700">No friend requests</h4>
        ) : (
          data.map((friendRequest) => (
            <FriendRequestCard
              key={`${friendRequest.sender_id}-${friendRequest.receiver_id}`}
              friendRequest={friendRequest}
            />
          ))
        ))}
    </div>
  );
}
