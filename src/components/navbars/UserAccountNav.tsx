"use client";

import Link from "next/link";
// import { User } from "next-auth"
// import { signOut } from "next-auth/react"

import { siteConfig } from "@/config/site";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";
import { UserAvatar } from "../UserAvatar";
import { api } from "~/utils/api";

import type { profiles } from "@prisma/client";
import { supabase } from "~/utils/supabase-client";
import { useRouter } from "next/compat/router";

interface UserAccountNavProps extends React.HTMLAttributes<HTMLDivElement> {
  user: Pick<profiles, "avatar_url" | "email">;
}

export function UserAccountNav() {
  const router = useRouter();
  const { data } = api.user.getOwnProfile.useQuery();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <UserAvatar
          user={{
            email: data?.email || null,
            avatar_url: data?.avatar_url || null,
          }}
          className="h-8 w-8"
        />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <div className="flex items-center justify-start gap-2 p-2">
          <div className="flex flex-col space-y-1 leading-none">
            {data?.email && (
              <p className="w-[200px] truncate text-sm text-slate-600">
                {data.email}
              </p>
            )}
          </div>
        </div>
        <DropdownMenuSeparator />
        <Link href="/">
          <DropdownMenuItem
            className="cursor-pointer"
            onSelect={(event) => {
              event.preventDefault();
              void supabase.auth.signOut();
            }}
          >
            Sign out
          </DropdownMenuItem>
        </Link>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
