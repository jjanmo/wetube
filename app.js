import express from 'express';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import passport from 'passport';
import session from 'express-session';
import mongoose from 'mongoose';
import MongoStore from 'connect-mongo';
import helmet from 'helmet';
import { localsMiddleware } from './middlewares';
import morgan from 'morgan';
//import { userRouter } from './routers/userRouter';
//-> named export했을 경우에는 import 방식이 다르다!

import routes from './routes';
import userRouter from './routers/userRouter';
import videoRouter from './routers/videoRouter';
import globalRouter from './routers/globalRouter';
import apiRouter from './routers/apiRouter';

const app = express();

//cookiestore for mongodb/cookie connection
const CookieStore = MongoStore(session);

//app.use() : to use middleware
app.use(helmet()); //helmet is help secure my express app

//app.set() :  setting view engine
app.set('view engine', 'pug');

//static file 제공
app.use('/uploads', express.static('uploads'));
//express.static('string') : 정해진 디렉토리 안의 정적파일(static file)을 전달해주는 목적(주로 js,css,image file을 전달함)
//-> 엄밀하게 말해서 업로드 영상은 정적파일이 아님 : not good practice
//-> 생성된 컨텐츠(여기선 업로드된 영상)와 같은 것들은 서버와 분리되어야함, 서버안에 저장되어있으면 안됨!!
//-> 우선 이렇게 만들고 추후에 변경 : 예를 들어 아마존서버에 저장하고 그곳에서 파일url만 받아오도록 만든다
app.use('/static', express.static('static'));

//bodyparser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cookieParser());

//express-session
app.use(
    session({
        secret: process.env.SESSION_SECRET,
        resave: false,
        saveUninitialized: true,
        store: new CookieStore({ mongooseConnection: mongoose.connection }) //mongodb/cookie connection
    })
);

//morgan is logger middleware
app.use(morgan('dev'));

//passport
app.use(passport.initialize());
app.use(passport.session());

//locals
app.use(localsMiddleware);

//router와 연결
app.use(routes.home, globalRouter);
app.use(routes.users, userRouter);
app.use(routes.videos, videoRouter);
app.use(routes.api, apiRouter);

export default app;
//-> 외부에서 이 모듈을 요청할 때 [app object](app.js file)로 내보내겠다는 의미
//-> ES6 JavaScript module
