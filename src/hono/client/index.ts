import { hc } from "hono/client";
import type { AppType } from '@/hono/server/app';

export const client = hc<AppType>('');