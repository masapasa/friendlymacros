import type { diet_type, price_range } from "@prisma/client";
import { id } from "date-fns/locale";
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
          carbs: input.carbs,
          city: input.city,
          fats: input.fats,
          protein: input.proteins,
          restaurant: input.restaurant,
          price_range: input.priceRange as price_range,
          diet: input.diet as diet_type,
          image_url: input.image_url,
          id: input.id,
          profiles: {
            connectOrCreate: {
              where: {id: ctx.user.id},
              create: {
                id: ctx.user.id,
                email: ctx.user.email,

              }
            }
          }
        },
      });
    }),
  getMeals: privateProcedure
    .input(
      Yup.object({
        friendFilter: Yup.array().of(Yup.string().required()),
      })
    )
    .query(async ({ input, ctx }) => {
      const data = await ctx.prisma.meals.findMany({
        orderBy: {
          created_at: "desc",
        },
        include: {
          likes: true,
        },
        where: {
          ...(input.friendFilter?.length == 0
            ? {}
            : {
                author_id: {
                  in: input.friendFilter,
                },
              }),
        },
      });

      const items = data.map((item) => ({
        ...item,
        isLiked: item.likes.some((val) => val.user_id === ctx.user.id),
      }));

      return items;
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
  deleteMeal: privateProcedure
    .input(
      Yup.object({
        meal_id: Yup.string().required(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      await ctx.prisma.meals.delete({
        where: {
          id: input.meal_id,
        },
      });
    }),
    getMealsByRestaurant: privateProcedure
  .input(
    Yup.object({
      restaurantName: Yup.string().required(),
    })
  )
  .query(async ({ input, ctx }) => {
    const data = await ctx.prisma.meals.findMany({
      where: {
        restaurant: input.restaurantName,
      },
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

    return items;
  }),
});