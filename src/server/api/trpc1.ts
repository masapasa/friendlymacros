// src/server/api/trpc.ts
import { type CreateNextContextOptions } from '@trpc/server/adapters/next';
import { initTRPC, TRPCError } from '@trpc/server';
import superjson from 'superjson';
import { ZodError } from 'zod';
import { createClient } from '@supabase/supabase-js';
import { env } from '~/env.mjs';
import { type Database } from '~/types/supabase.types';
import { prisma } from '~/server/db';
import { mealRouter } from './routers/meals';

type CreateContextOptions = Record<string, never>;
const createInnerTRPCContext = (_opts: CreateContextOptions) => {
  return {
    prisma,
  };
};
export const getServiceSupabase = () =>
  createClient<Database>(
    env.NEXT_PUBLIC_SUPABASE_PROJECT_URL,
    env.NEXT_PUBLIC_SUPABASE_SERVICE_KEY,
    {
      auth: {
        autoRefreshToken: false,
        persistSession: false,
      },
    }
  );

export const getUserAsAdmin = async (token: string) => {
  console.log(`token:${token}`);
  const { data, error } = await getServiceSupabase().auth.getUser(token);

  if (error) {
    throw error;
  }

  return data;
};

export const createTRPCContext = async (_opts: CreateNextContextOptions) => {
  const req = _opts.req;
  console.log(req.headers);
  const { user } = req.headers.authorization
    ? await getUserAsAdmin(req.headers.authorization)
    : { user: null };

  return {
    prisma,
    user,
  };
};

const t = initTRPC.context<typeof createTRPCContext>().create({
  transformer: superjson,
  errorFormatter({ shape, error }) {
    return {
      ...shape,
      data: {
        ...shape.data,
        zodError:
          error.cause instanceof ZodError ? error.cause.flatten() : null,
      },
    };
  },
});
export const createTRPCRouter = t.router;
export const publicProcedure = t.procedure;

const enforceUserIsAuthed = t.middleware(async ({ ctx, next }) => {
  if (!ctx.user) {
    throw new TRPCError({
      code: 'UNAUTHORIZED',
    });
  }

  return next({
    ctx: {
      user: ctx.user,
    },
  });
});

export const privateProcedure = t.procedure.use(enforceUserIsAuthed);

export const appRouter = t.router().merge('meal.', mealRouter);
