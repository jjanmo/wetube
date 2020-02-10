import express from 'express';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import helmet from 'helmet';
import { localsMiddleware } from './middlewares';
import morgan from 'morgan';
//import { userRouter } from './routers/userRouter';
//-> named export했을 경우에는 import 방식이 다르다!
import routes from './routes';
import userRouter from './routers/userRouter';
import videoRouter from './routers/videoRouter';
import globalRouter from './routers/globalRouter';

const app = express();

//app.use() : to use middleware
app.use(helmet()); //helmet is help secure my express app
//app.set() :  setting view engine
app.set('view engine', 'pug');
app.use(morgan('dev')); //morgan is logger middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(localsMiddleware);

app.use(routes.home, globalRouter);
app.use(routes.users, userRouter);
app.use(routes.videos, videoRouter);

export default app;
//-> 외부에서 이 모듈을 요청할 때 [app object]로 내보내겠다는 의미
//-> ES6 JavaScript module
