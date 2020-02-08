import express from 'express';
import morgan from 'morgan';
import helmet from 'helmet';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
//import { userRouter } from './routers/userRouter';
//-> named export했을 경우에는 import 방식이 다르다! 
import userRouter from './routers/userRouter';
import videoRouter from './routers/videoRouter';
import globalRouter from './routers/globalRouter';

const app = express();

const handleHome = (req, res) => res.send('Welcome Home!!');

const handleProfile = (req, res) => res.send('Hi My name is CMY');

//use middleware : morgan / body-parser /cookie-parser / helmet 
app.use(morgan('dev')); //morgan is logger middleware
app.use(helmet()); //helmet is help secure my express app
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

app.use('/', globalRouter);
app.use('/user', userRouter);
app.use('/video', videoRouter);


export default app;
//-> 외부에서 이 모듈을 요청할 때 [app object]로 내보내겠다는 의미
//-> ES6 JavaScript module