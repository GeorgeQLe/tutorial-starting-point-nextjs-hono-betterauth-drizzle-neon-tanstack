import { Hono } from 'hono';

const authors = new Hono()
  .get('/', (c) => {
    return c.json('list authors')
  })
  .post('/', (c) => {
    return c.json('create an author', 201)
  })
  .get('/:id', (c) => {
    const id = c.req.param('id')
    return c.json(`get author ${id}`)
  });

export default authors;
export type AuthorsApp = typeof authors;