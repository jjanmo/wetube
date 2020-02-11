//globalRouter : seperating routers  from client request '/' such as  '/join' , '/search' 
//-> appear in landing page

import express from 'express';
import routes from '../routes';
import { home, search } from '../controllers/videoController';
import { login, logout, getJoin, postJoin } from '../controllers/userController';

const globalRouter = express.Router();

// Home
globalRouter.get(routes.home, home);

// Search
globalRouter.get(routes.search, search);

// Join
globalRouter.get(routes.join, getJoin);
globalRouter.post(routes.join, postJoin);

globalRouter.get(routes.login, login);
globalRouter.get(routes.logout, logout);


export default globalRouter; 