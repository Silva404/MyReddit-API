import { Router } from 'express';

const routes = Router();

routes.use('/users');

routes.post('/', (req, res) => { });

export default routes;
