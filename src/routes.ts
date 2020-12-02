import { Router } from 'express';

const routes = Router();

routes.use('/users');

routes.post('/', (request, response) => {
  const { name, email, password } = request.body;

  const user = await 

  return
});

export default routes;
