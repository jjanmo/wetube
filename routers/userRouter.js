//routing :  app의 endpoint에서 client request를 처리하는 방법을 정의
//-> router 안에 여러 개의 routes 존재할 수 있음

import express from 'express';
import routes from '../routes';

const userRouter = express.Router();
//-> userRouter is middleware

userRouter.get(routes.users, (req, res) => res.send('Users'));
userRouter.get(routes.userDetail, (req, res) => res.send('User Detail'));
userRouter.get(routes.editProfile, (req, res) => res.send('User Edit Profile'));
userRouter.get(routes.changePassword, (req, res) => res.send('Change User Password'));


export default userRouter; 