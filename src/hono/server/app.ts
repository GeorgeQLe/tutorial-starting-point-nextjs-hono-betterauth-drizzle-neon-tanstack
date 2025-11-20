// src/hono/server/app.ts
import { Hono } from 'hono';
import type { MiddlewareHandler } from 'hono';

import { auth } from '@/auth';

import authors from './authors';
import books from './books';

// Tell Hono what we store on c.get(...)
type AppEnv = {
  Variables: {
    session: typeof auth.$Infer.Session.session | null;
    user: typeof auth.$Infer.Session.user | null;
	};
};

// Auth guard middleware
const requireAuth: MiddlewareHandler<AppEnv> = async (c, next) => {
  const user = c.get('user');

  if (!user) return c.json({ error: 'Unauthorized' }, 401);

  return next();
};

const app = new Hono<AppEnv>()
  .basePath('/api')
  // Global middleware: read Better Auth session from cookies/headers
  .use('*', async (c, next) => {
    const session = await auth.api.getSession({ headers: c.req.raw.headers });

    if (!session) {
      c.set('user', null);
      c.set('session', null);
    } else {
      c.set('user', session.user);
      c.set('session', session.session);
    }

    await next();
  })
  // Protect all /authors/* and /books/* routes
  .use('/authors/*', requireAuth)
  .use('/books/*', requireAuth)
  // Mount the sub-apps under /api/authors and /api/books
  .route('/authors', authors)
  .route('/books', books)
  // Public root endpoint
  .get('/', (c) => c.json({ message: 'Hello from Hono root' }))
  // Protected demo endpoint
  .get('/demo', requireAuth, (c) => {
    const user = c.get('user'); // typed user if you want to use it

    return c.json({
      message: `Welcome to Hono.js, ${user?.email ?? 'friend'}!`,
      timestamp: new Date().toISOString(),
      features: [
        'Ultra-fast routing',
        'TypeScript support',
        'Works on any runtime',
        'Type-safe RPC client',
        'Better Auth integration',
      ],
    });
  });

export default app;
export type AppType = typeof app;