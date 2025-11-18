import { handle } from 'hono/vercel';
import app from '@/hono/server/app';

export const GET = handle(app);
export const POST = handle(app);
export const PUT = handle(app);
export const DELETE = handle(app);