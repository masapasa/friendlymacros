import type { diet_type, price_range } from "@prisma/client";
import * as Yup from "yup";
import { mealValidationSchema } from "~/components/forms/newMealForm";

import {
  createTRPCRouter,
  privateProcedure,
  publicProcedure,
} from "~/server/api/trpc";

export const mealRouter = createTRPCRouter({
  createMeal: privateProcedure
    .input(
      mealValidationSchema.concat(
        Yup.object({
          image_url: Yup.string(),
          id: Yup.string(),
        })
      )
    )
    .mutation(async ({ input, ctx }) => {
      await ctx.prisma.meals.create({
        data: {
          name: input.name,
          author_id: ctx.user.id,
          carbs: input.carbs,
          city: input.city,
          fats: input.fats,
          protein: input.proteins,
          restaurant: input.restaurant,
          price_range: input.priceRange as price_range,
          diet: input.diet as diet_type,
          image_url: input.image_url,
          id: input.id,
        },
      });
    }),
  getInfiniteMeals: privateProcedure
    .input(
      Yup.object({
        limit: Yup.number().min(1).max(100).nullable(),
        cursor: Yup.string().nullable(),
      })
    )
    .query(async ({ input, ctx }) => {
      const limit = input.limit ?? 50;
      const { cursor } = input;

      const data = await ctx.prisma.meals.findMany({
        take: limit + 1,
        cursor: cursor ? { id: cursor } : undefined,
        orderBy: {
          created_at: "desc",
        },
        include: {
          likes: true,
        },
      });

      const items = data.map((item) => ({
        ...item,
        isLiked: item.likes.some((val) => val.user_id === ctx.user.id),
      }));

      let nextCursor: typeof cursor | undefined = undefined;
      if (items.length > limit) {
        const nextItem = items.pop();
        nextCursor = nextItem?.id;
      }

      return {
        items,
        nextCursor,
      };
    }),
  getMeal: privateProcedure
    .input(
      Yup.object({
        meal_id: Yup.string().required(),
      })
    )
    .query(async ({ input, ctx }) => {
      const data = await ctx.prisma.meals.findUnique({
        where: {
          id: input.meal_id,
        },
        include: {
          profiles: true,
          likes: true,
        },
      });

      return {
        ...data,
        isLiked: data?.likes.some((val) => val.user_id === ctx.user.id),
      };
    }),
  likeMeal: privateProcedure
    .input(
      Yup.object({
        meal_id: Yup.string().required(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      await ctx.prisma.likes.create({
        data: {
          meal_id: input.meal_id,
          user_id: ctx.user.id,
        },
      });
    }),
  unlikeMeal: privateProcedure
    .input(
      Yup.object({
        meal_id: Yup.string().required(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      await ctx.prisma.likes.delete({
        where: {
          meal_id_user_id: {
            meal_id: input.meal_id,
            user_id: ctx.user.id,
          },
        },
      });
    }),
});
