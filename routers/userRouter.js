//routing :  app의 endpoint에서 client request를 처리하는 방법을 정의
//-> router 안에 여러 개의 routes 존재할 수 있음

import express from 'express';
import routes from '../routes';
import { getMyProfile, userDetail, getEditProfile, postEditProfile, getChangePassword, postChangePassword, } from '../controllers/userController';
import { onlyPrivate, uploadAvatar } from '../middlewares';

const userRouter = express.Router();
//-> userRouter is middleware

//change profile
userRouter.get(routes.changePassword, onlyPrivate, getChangePassword);
userRouter.post(routes.changePassword, onlyPrivate, postChangePassword);


//edit profile
userRouter.get(routes.editProfile, onlyPrivate, getEditProfile);
userRouter.post(routes.editProfile, onlyPrivate, uploadAvatar, postEditProfile);

userRouter.get(routes.myProfile, onlyPrivate, getMyProfile);
userRouter.get(routes.userDetail(), onlyPrivate, userDetail);

export default userRouter;
