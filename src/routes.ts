import { Router } from 'express';
import CreateUserService from 'services/CreateUserService';

const routes = Router();

routes.use('/users');

routes.post('/', async (request, response) => {
  const { name, email, password } = request.body;
  const userService = new CreateUserService();

  const user = await userService.execute({ name, email, password });
  delete user.password;

  return response.json(user);
});

export default routes;
