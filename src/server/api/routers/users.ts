import * as Yup from "yup";

import { createTRPCRouter, privateProcedure } from "~/server/api/trpc";

export const userRouter = createTRPCRouter({
  getProfile: privateProcedure.query(async ({ ctx }) => {
    return await ctx.prisma.profiles.findUnique({
      where: {
        id: ctx.user.id,
      },
    });
  }),
});
