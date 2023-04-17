"use client";

import { notFound, redirect, useParams } from "next/navigation";
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
import { useUser } from "~/providers/AuthContextProvider/AuthContextProvider";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

const Post = () => {
  const params = useParams();
  const userId = useUser().user?.id;

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

  const { mutateAsync, isLoading: isDeleteLoading } =
    api.meal.deleteMeal.useMutation();

  const handleMealDelete = () => {
    assert(!!params?.id, "id must be a string");
    assert(!Array.isArray(params.id), "is musn't be an array");

    void mutateAsync({ meal_id: params.id });
  };

  if (!data || !data.profiles || isLoading)
    return (
      <div className="flex h-full w-full items-center justify-center">
        <Spinner />
      </div>
    );

  return (
    <div className="mt-6 grid w-full grid-cols-6 gap-6">
      <Link
        href={"/recipes"}
        className={data.author_id === userId ? "col-span-3" : "col-span-6"}
      >
        <Button variant={"outline"} className="w-full">
          Go back to all recipes
        </Button>
      </Link>
      {data.author_id === userId && (
        <AlertDialog>
          <AlertDialogTrigger className="col-span-3 ">
            {" "}
            <Button variant={"destructive"} className="w-full ">
              Delete meal
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you sure absolutely sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone. This will permanently delete your
                account and remove your data from our servers.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <Link href={"/recipes"}>
                <AlertDialogAction onClick={() => handleMealDelete()}>
                  Delete
                </AlertDialogAction>
              </Link>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      )}

      <div className="col-span-6 rounded-lg border border-slate-200 p-6">
        <AspectRatio ratio={16 / 9}>
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
          <h2 className="scroll-m-20 pb-2 text-xl font-semibold tracking-tight transition-colors first:mt-0 md:text-3xl">
            {data.name}
          </h2>
          <p className="md:text-md text-sm">
            {data.restaurant}, {data.city}
          </p>
        </div>
      </div>
      <div className="col-span-3 col-start-4 flex flex-col-reverse items-end justify-end gap-2 md:flex-row md:items-center md:gap-6">
        <div className="flex items-center gap-2 md:gap-4">
          <p className="rounded-full border border-slate-600 px-2 py-1 text-xs text-slate-900 md:px-4 md:py-2 md:text-sm">
            {data.diet}
          </p>

          <p className="rounded-full border bg-slate-900 px-2 py-1 text-xs text-slate-50 md:px-4 md:py-2 md:text-sm">
            {data.price_range}
          </p>
        </div>

        <div className="flex items-center gap-1 md:gap-4">
          <div className="flex gap-1">
            <Icons.protein className="h-4 w-4" />
            <p className="text-xs md:text-sm">{data.protein}</p>
          </div>

          <div className="flex gap-1">
            <Icons.carbs className="h-4 w-4" />
            <p className="text-xs md:text-sm">{data.carbs}</p>
          </div>

          <div className="flex gap-1">
            <Icons.fat className="h-4 w-4" />
            <p className="text-xs md:text-sm">{data.fats}</p>
          </div>

          {data.id && <LikeButton condition={data.isLiked} mealId={data.id} />}
        </div>
      </div>
      <hr className="col-span-6 h-1" />

      <p className="col-span-3 text-xs ">
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

      <div className="col-span-3 flex w-full items-center justify-end gap-4">
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
  );
};

export default Post;
