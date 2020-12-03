import { Router } from 'express';
import AuthenticateUserService from './services/AuthenticateUserService';
import CreateUserService from './services/CreateUserService';

const routes = Router();

routes.post('/users/register', async (request, response) => {
  const { name, email, password } = request.body;

  const userService = new CreateUserService();

  const user = await userService.execute({ name, email, password });
  delete user.password;

  return response.json(user);
});

routes.post('/users/login', async (request, response) => {
  const { email, password } = request.body;

  const userService = new AuthenticateUserService();

  const { user, token } = await userService.execute({ email, password });

  return response.json({ user, token });
});

export default routes;
