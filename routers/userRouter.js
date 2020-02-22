//routing :  app의 endpoint에서 client request를 처리하는 방법을 정의
//-> router 안에 여러 개의 routes 존재할 수 있음

import express from 'express';
import routes from '../routes';
import { userDetail, changePassword, editProfile } from '../controllers/userController';
import { onlyPrivate } from '../middlewares';

const userRouter = express.Router();
//-> userRouter is middleware

userRouter.get(routes.changePassword, onlyPrivate, changePassword);
userRouter.get(routes.userDetail(), onlyPrivate, userDetail);
userRouter.get(routes.editProfile, onlyPrivate, editProfile);

export default userRouter;
