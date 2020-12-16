import { Router } from 'express';
import usersRouter from './users.routes';
import postsRouter from './posts.routes';

const routes = Router();

routes.use('/users', usersRouter, postsRouter);

export default routes;
