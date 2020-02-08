//routing :  app의 endpoint에서 client request를 처리하는 방법을 정의
//-> router 안에 여러 개의 routes 존재할 수 있음

import express from 'express';

const userRouter = express.Router();
//-> userRouter is middleware

export default userRouter; 