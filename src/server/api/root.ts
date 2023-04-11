import { createTRPCRouter } from "~/server/api/trpc";
import { mealRouter } from "./routers/meals";
import { userRouter } from "./routers/users";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  user: userRouter,
  meal: mealRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
