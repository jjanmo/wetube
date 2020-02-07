import express from 'express';
import morgan from 'morgan';
import helmet from 'helmet';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';


const app = express();
const port = 3000;

const handleListening = () => console.log(`Listening on http://localhost:${port}`);

const handleHome = (req, res) => res.send('Welcome Home!!');

const handleProfile = (req, res) => res.send('Hi My name is CMY');

//use middleware : morgan / body-parser /cookie-parser / helmet 

app.use(morgan('dev')); //morgan is logger middleware
app.use(helmet()); //helmet is help secure my express app
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

app.get('/', handleHome);

app.get('/profile', handleProfile);

app.listen(port, handleListening);


