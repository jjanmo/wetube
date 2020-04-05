//routing :  app의 endpoint에서 client request를 처리하는 방법을 정의
//-> router 안에 여러 개의 routes 존재할 수 있음

import express from 'express';
import routes from '../routes';
import {
    getMyProfile,
    userDetail,
    getEditProfile,
    postEditProfile,
    getChangePassword,
    postChangePassword,
    postAddProfileArt,
    postAddCoverImage,
    getEditCoverImage,
    postEditCoverImage
} from '../controllers/userController';
import { onlyPrivate, uploadAvatar, uploadProfileArt, uploadCoverImage } from '../middlewares';

const userRouter = express.Router();
//-> userRouter is middleware

//edit profile
userRouter.get(routes.editProfile, onlyPrivate, getEditProfile);
userRouter.post(routes.editProfile, onlyPrivate, uploadAvatar, postEditProfile);

//change password
userRouter.get(routes.changePassword, onlyPrivate, getChangePassword);
userRouter.post(routes.changePassword, onlyPrivate, postChangePassword);

//add profile art
userRouter.post(routes.addProfileArt, onlyPrivate, uploadProfileArt, postAddProfileArt);

//edit cover image
userRouter.get(routes.editCoverImage, onlyPrivate, getEditCoverImage);
userRouter.post(routes.editCoverImage, onlyPrivate, uploadCoverImage, postEditCoverImage);

userRouter.get(routes.myProfile, getMyProfile);
userRouter.get(routes.userDetail(), userDetail);

export default userRouter;
