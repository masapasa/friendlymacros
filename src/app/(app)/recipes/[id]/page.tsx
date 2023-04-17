"use client";

import { notFound, useParams } from "next/navigation";
import { useRouter } from "next/router";
import { api } from "~/utils/api";
import assert from "assert";
import { Icons } from "~/components/icons";
import { AspectRatio } from "@radix-ui/react-aspect-ratio";
import Image from "next/image";
import { Separator } from "@radix-ui/react-select";
import { Spinner } from "~/components/ui/spinner";
import { UserAvatar } from "~/components/UserAvatar";
import Link from "next/link";
import { Button } from "~/components/ui/button";
import { LikeButton } from "~/components/LikeButton/LikeButton";

const Post = () => {
  const params = useParams();

  assert(!!params?.id, "id must be a string");
  assert(!Array.isArray(params.id), "is musn't be an array");

  const { data, isLoading } = api.meal.getMeal.useQuery(
    {
      meal_id: params.id,
    },
    {
      onError: () => {
        notFound();
      },
    }
  );

  if (!data || !data.profiles || isLoading) return <Spinner />;

  return (
    <div className="mt-6 grid w-full grid-cols-6 gap-6">
      <Link href={"/recipes"} className="col-span-6">
        <Button variant={"outline"} className="w-full">
          Go back to all recipes
        </Button>
      </Link>

      <div className="col-span-6 rounded-lg border border-slate-200 p-6">
        <AspectRatio ratio={16 / 9} className="">
          {data.name && data?.image_url && (
            <Image
              alt={data.name}
              src={data.image_url}
              fill
              className="rounded-lg object-cover"
            />
          )}
        </AspectRatio>
      </div>
      <div className="col-span-3 flex items-center gap-4">
        <div className="flex-col">
          <h2 className="scroll-m-20 pb-2 text-4xl font-semibold tracking-tight transition-colors first:mt-0">
            {data.name}
          </h2>
          <p className="text-sm">
            {data.restaurant}, {data.city}
          </p>
        </div>
      </div>
      <div className="col-span-3 col-start-4 flex items-center justify-end gap-6">
        <div className="flex items-center gap-2">
          <p className="rounded-full border border-slate-600 px-4 py-2 text-xs tracking-wide text-slate-900">
            {data.diet}
          </p>

          <p className="rounded-full border bg-slate-900 px-4 py-2 text-xs tracking-wide text-slate-50">
            {data.price_range}
          </p>
        </div>

        <div className="flex gap-1">
          <Icons.protein className="h-4 w-4" />
          <p className="text-sm">{data.protein}</p>
        </div>

        <div className="flex gap-1">
          <Icons.carbs className="h-4 w-4" />
          <p className="text-sm">{data.carbs}</p>
        </div>

        <div className="flex gap-1">
          <Icons.fat className="h-4 w-4" />
          <p className="text-sm">{data.fats}</p>
        </div>

        {data.id && <LikeButton condition={data.isLiked} mealId={data.id} />}
      </div>
      <hr className="col-span-6 h-1" />
      <div className="col-span-6 mb-6 flex items-center justify-between">
        <p className="text-xs">
          posted on{" "}
          <span className="font-semibold">
            {data.created_at?.toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
              hour: "numeric",
              hour12: true,
              minute: "numeric",
            })}
          </span>
        </p>
        <div className="flex items-center gap-4">
          <p className="text-right text-xs">
            posted by{" "}
            <span className="font-semibold">
              {data.profiles.email ?? data.author_id}
            </span>
          </p>
          <UserAvatar
            user={{
              email: data.profiles.email || null,
              avatar_url: data.profiles.avatar_url || null,
            }}
            className="h-8 w-8"
          />
        </div>
      </div>
    </div>
  );
};

export default Post;
