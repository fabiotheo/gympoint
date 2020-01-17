import 'babel-polyfill';
import { Router } from 'express';
import SessionController from './app/controllers/SessionController';
import StudentsController from './app/controllers/StudentsController';
import authMiddleware from './app/middlewares/auth';

const routes = new Router();

routes.post('/users', SessionController.userLogin);

routes.use(authMiddleware);

routes.post('/students', StudentsController.store);
routes.put('/students', StudentsController.update);

export default routes;
