import { Router } from 'express';

import ensureAuthenticated from '../middlewares/ensureAuthenticated';

import UpvotePostService from '../services/UpvotePostService';
import ListUserPosts from '../services/ListUserPosts';
import CreatePostService from '../services/CreatePostService';

const postsRouter = Router();
postsRouter.use(ensureAuthenticated);

postsRouter.post(
  '/create-post',
  ensureAuthenticated,
  async (request, response) => {
    const { id, title, content, votes } = request.body;

    const createPostService = new CreatePostService();

    const post = await createPostService.execute({ id, title, content, votes });

    return response.json(post);
  },
);

postsRouter.patch(
  '/upvote-post',
  ensureAuthenticated,
  async (request, response) => {
    const { votes, id } = request.body;

    const upvotePostService = new UpvotePostService();

    const post = await upvotePostService.execute({
      votes,
      id,
      user_id: request.user.id,
    });

    return response.json(post);
  },
);

postsRouter.get(
  '/list-posts',
  ensureAuthenticated,
  async (request, response) => {
    const listUserPostsService = new ListUserPosts();

    const posts = await listUserPostsService.execute({ id: request.user.id });

    return response.json(posts);
  },
);

export default postsRouter;
