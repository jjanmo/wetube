import './db';
import app from './app';
import dotenv from 'dotenv';
dotenv.config();

import './passport';

import './models/Comment';
import './models/User';
import './models/Video';

const PORT = process.env.PORT || 3000;

const handlelistening = () => console.log(`☞ Listening on http://localhost:${PORT}`);

app.listen(PORT, handlelistening);
