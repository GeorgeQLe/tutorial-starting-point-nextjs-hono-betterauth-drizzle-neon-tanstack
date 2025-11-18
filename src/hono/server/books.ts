import { Hono } from 'hono';

const books = new Hono()
  .get('/', (c) => {
    return c.json('list books')
  })
  .post('/', (c) => {
    return c.json('create a book', 201)
  })
  .get('/:id', (c) => {
    const id = c.req.param('id')
    return c.json(`get book ${id}`)
  });

export default books;
export type BooksApp = typeof books;