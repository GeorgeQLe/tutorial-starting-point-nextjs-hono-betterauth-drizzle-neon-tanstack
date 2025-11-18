"use server"; // app should not be used on the client side
import { Hono } from 'hono';

import authors from './authors';
import books from './books';

const app = new Hono().basePath('/api');

// Mount the sub-apps under /api/authors and /api/books
app.route('/authors', authors);
app.route('/books', books);

// You can still have root routes too
app.get('/', (c) => c.json({ message: 'Hello from Hono root' }));

export default app;
export type AppType = typeof app;