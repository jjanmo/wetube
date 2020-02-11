//routing :  app의 endpoint에서 client request를 처리하는 방법을 정의
//-> router 안에 여러 개의 routes 존재할 수 있음

import express from 'express';
import routes from '../routes';
import { users } from '../controllers/userController';

const userRouter = express.Router();
//-> userRouter is middleware

userRouter.get(routes.changePassword, (req, res) => res.render('changePassword'));
userRouter.get(routes.editProfile, (req, res) => res.render('editProfile'));
userRouter.get(routes.userDetail, (req, res) => res.render('userDetail'));

export default userRouter;
