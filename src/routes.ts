import { Router } from 'express';

import ensureAuthenticated from './middlewares/ensureAuthenticated';

import UpvotePostService from './services/UpvotePostService';
import ListUserPosts from './services/ListUserPosts';
import CreatePostService from './services/CreatePostService';
import AuthenticateUserService from './services/AuthenticateUserService';
import CreateUserService from './services/CreateUserService';

const routes = Router();
// routes.use(ensureAuthenticated);

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

routes.post(
  '/users/create-post',
  ensureAuthenticated,
  async (request, response) => {
    const { id, title, content, votes } = request.body;

    const createPostService = new CreatePostService();

    const post = await createPostService.execute({ id, title, content, votes });

    return response.json(post);
  },
);

routes.patch(
  '/users/upvote-post',
  ensureAuthenticated,
  async (request, response) => {
    const { id, votes } = request.body;

    const upvotePostService = new UpvotePostService();

    const post = await upvotePostService.execute({ id, votes });

    return response.json(post);
  },
);

routes.get('/users/posts', ensureAuthenticated, async (request, response) => {
  const listUserPostsService = new ListUserPosts();

  const posts = await listUserPostsService.execute({ id: request.user.id });

  return response.json(posts);
});

// routes.get('/users/profile', async (request, response) => {
//   const userService = new AuthenticateUserService();

//   const user = userService.execute();

//   return response.json(user);
// });

export default routes;
