import type { diet_type, price_range } from "@prisma/client";
import * as Yup from "yup";
import { mealValidationSchema } from "~/components/forms/newRecipeForm";

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
        },
      });
    }),
  getMeals: publicProcedure.query(async ({ ctx }) => {
    return await ctx.prisma.meals.findMany({
      orderBy: {
        created_at: "desc",
      },
    });
  }),
});
