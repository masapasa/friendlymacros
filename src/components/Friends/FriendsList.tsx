import React, { useEffect } from "react";
import { useToast } from "~/hooks/UseToast";
import { api } from "~/utils/api";
import { supabase } from "~/utils/supabase-client";
import { FriendCard } from "./FriendCard";

export function FriendsList() {
  const { toast } = useToast();
  const utils = api.useContext();
  const { data, refetch } = api.user.getFriends.useQuery(undefined, {
    onError: (error) => {
      toast({
        variant: "destructive",
        title: "Error getting friends list",
        description: error.message,
      });
    },
    refetchOnWindowFocus: false,
  });

  return (
    <div
      className={`col-span-6 flex max-h-96 w-full flex-col items-center justify-start gap-3 overflow-y-auto ${
        data && data.length > 2 ? "pr-6" : ""
      }`}
    >
      {data &&
        (data.length === 0 ? (
          <h4 className="text-xl text-slate-700">You have no friends</h4>
        ) : (
          data.map((friend) => (
            <FriendCard key={friend.friend_id} friend={friend} />
          ))
        ))}
    </div>
  );
}
