import type { profiles } from "@prisma/client";
import type { AvatarProps } from "@radix-ui/react-avatar";

import { Icons } from "./icons";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface UserAvatarProps extends AvatarProps {
  user: Pick<profiles, "avatar_url" | "email">;
}

export function UserAvatar({ user, ...props }: UserAvatarProps) {
  return (
    <Avatar {...props}>
      {user.avatar_url ? (
        <AvatarImage alt="Picture" src={user.avatar_url} />
      ) : (
        <AvatarFallback>
          <span className="sr-only">{user.email}</span>
          <Icons.user className="h-4 w-4" />
        </AvatarFallback>
      )}
    </Avatar>
  );
}
