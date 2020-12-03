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

  const authService = new AuthenticateUserService();
  const { token } = await authService.execute({ email, password });

  return response.json(token);
});

routes.get('/users/profile', async (request, response) => {
  const userService = new AuthenticateUserService();

  const user = userService.execute();

  return response.json(user);
});

export default routes;
