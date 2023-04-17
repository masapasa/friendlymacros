import * as Yup from "yup";

import { createTRPCRouter, privateProcedure } from "~/server/api/trpc";
import { prisma } from "~/server/db";

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
    .input(Yup.object({ email: Yup.string().required() }))
    .mutation(async ({ input, ctx }) => {
      const receiverProfile = await ctx.prisma.profiles.findUnique({
        where: { email: input.email },
        select: { id: true },
      });

      if (!receiverProfile) {
        throw new Error(`Profile with email ${input.email} not found`);
      }

      await ctx.prisma.invites.create({
        data: {
          status: "pending",
          receiver_id: receiverProfile.id,
          sender_id: ctx.user.id,
        },
      });
    }),
  getFriendRequests: privateProcedure.query(async ({ ctx }) => {
    return await ctx.prisma.invites.findMany({
      select: {
        receiver_id: true,
        created_at: true,
        sender_id: true,
        profiles_invites_sender_idToprofiles: {
          select: {
            avatar_url: true,
            email: true,
            _count: {
              select: {
                meals: true,
              },
            },
            id: true,
          },
        },
      },
      where: {
        receiver_id: ctx.user.id,
        status: "pending",
      },
    });
  }),
  acceptFriendRequest: privateProcedure
    .input(
      Yup.object({
        sender_id: Yup.string().required(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      await ctx.prisma.invites.updateMany({
        where: {
          sender_id: input.sender_id,
          receiver_id: ctx.user.id,
        },
        data: {
          status: "accepted",
        },
      });

      await ctx.prisma.friends.createMany({
        data: [
          { friend_id: input.sender_id, user_id: ctx.user.id },
          { friend_id: ctx.user.id, user_id: input.sender_id },
        ],
      });
    }),
  declineFriendRequest: privateProcedure
    .input(
      Yup.object({
        sender_id: Yup.string().required(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      await ctx.prisma.invites.updateMany({
        where: {
          sender_id: input.sender_id,
          receiver_id: ctx.user.id,
        },
        data: {
          status: "declined",
        },
      });
    }),
  getFriends: privateProcedure.query(async ({ ctx }) => {
    return await ctx.prisma.friends.findMany({
      where: {
        user_id: ctx.user.id,
      },
      include: {
        profiles_friends_friend_idToprofiles: true,
      },
    });
  }),
  deleteFriend: privateProcedure
    .input(
      Yup.object({
        friend_id: Yup.string().required(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      await ctx.prisma.invites.deleteMany({
        where: {
          OR: [
            { sender_id: input.friend_id, receiver_id: ctx.user.id },
            { receiver_id: ctx.user.id, sender_id: input.friend_id },
          ],
        },
      });

      await ctx.prisma.friends.deleteMany({
        where: {
          OR: [
            { friend_id: input.friend_id, user_id: ctx.user.id },
            { friend_id: ctx.user.id, user_id: input.friend_id },
          ],
        },
      });
    }),
  deleteUser: privateProcedure.mutation(async ({ ctx }) => {
    await ctx.prisma.users.delete({
      where: {
        id: ctx.user.id,
      },
    });
  }),
});
