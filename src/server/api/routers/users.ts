import * as Yup from "yup";

import { createTRPCRouter, privateProcedure } from "~/server/api/trpc";

export const userRouter = createTRPCRouter({
  getOwnProfile: privateProcedure.query(async ({ ctx }) => {
    return await ctx.prisma.profiles.findUnique({
      where: {
        id: ctx.user.id,
      },
    });
  }),
  getInfiniteUsers: privateProcedure
    .input(
      Yup.object({
        email: Yup.string().required().trim(),
        limit: Yup.number().min(1).max(100).nullable(),
        cursor: Yup.string().nullable(),
      })
    )
    .query(async ({ input, ctx }) => {
      const limit = input.limit ?? 20;
      const { cursor } = input;

      const data = await ctx.prisma.profiles.findMany({
        take: limit + 1,
        cursor: cursor ? { id: cursor } : undefined,
        select: {
          avatar_url: true,
          email: true,
          id: true,
          _count: {
            select: {
              meals: true,
            },
          },
        },
        where: {
          email: {
            contains: input.email,
          },
        },
      });

      let nextCursor: typeof cursor | undefined = undefined;
      if (data.length > limit) {
        const nextItem = data.pop();
        nextCursor = nextItem?.id;
      }

      return {
        items: data,
        nextCursor,
      };
    }),
  sendFriendRequest: privateProcedure
    .input(Yup.object({ recieverId: Yup.string().required() }))
    .mutation(async ({ input, ctx }) => {
      await ctx.prisma.invites.create({
        data: {
          status: "pending",
          reciever_id: input.recieverId,
          sender_id: ctx.user.id,
        },
      });
    }),
});
