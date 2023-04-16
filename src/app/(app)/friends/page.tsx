"use client";

import { useState } from "react";
import { Button } from "~/components/ui/button";

import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { Spinner } from "~/components/ui/spinner";
import { FriendRequestCard } from "~/components/FriendRequest/FriendRequestCard";
import { useToast } from "~/hooks/UseToast";
import { useUser } from "~/providers/AuthContextProvider/AuthContextProvider";
import { api } from "~/utils/api";
import { FriendRequestList } from "~/components/FriendRequest/FriendRequestList";
import { FriendsList } from "~/components/Friends/FriendsList";

function Friends() {
  const userId = useUser().user?.id;
  const [searchValue, setSearchValue] = useState<string>("");
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
        description: "User either doesnt exist or is already invited",
      });
    },
  });

  const handleSendingFriendRequest = () => {
    void mutateAsync({ email: searchValue });
  };

  return (
    <div className="grid-col-6 mt-6 grid w-full gap-x-4 gap-y-6">
      <Input
        type="text"
        id="search"
        className="col-span-5"
        placeholder="Enter user email"
        value={searchValue}
        onChange={(e) => setSearchValue(e.target.value)}
      />
      <Button
        onClick={() => handleSendingFriendRequest()}
        className="col-span-1 w-full"
        disabled={isLoading}
      >
        {isLoading ? <Spinner /> : "Invite"}
      </Button>

      <hr className="col-span-6" />

      <FriendRequestList />

      <hr className="col-span-6" />
      <FriendsList />
    </div>
  );
}

export default Friends;
