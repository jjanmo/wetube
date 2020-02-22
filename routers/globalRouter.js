//globalRouter : seperating routers  from client request '/' such as  '/join' , '/search'
//-> appear in landing page

import express from 'express';
import routes from '../routes';
import { home, search } from '../controllers/videoController';
import { logout, getJoin, postJoin, getLogin, postLogin } from '../controllers/userController';
import { onlyPublic } from '../middlewares';

const globalRouter = express.Router();

// Home
globalRouter.get(routes.home, home);

// Search
globalRouter.get(routes.search, search);

// Join
globalRouter.get(routes.join, onlyPublic, getJoin);
globalRouter.post(routes.join, onlyPublic, postJoin, postLogin);

// Login
globalRouter.get(routes.login, onlyPublic, getLogin);
globalRouter.post(routes.login, onlyPublic, postLogin);

// Logout
globalRouter.get(routes.logout, logout);

export default globalRouter;
