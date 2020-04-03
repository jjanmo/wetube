import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();
// 1) .env에 있는 파일을 모두 불러움
// 2) process.env.key 형태로 모두 저장
// -> process.env.key형태로 원하는 값을 불러올수있음

mongoose.connect(process.env.MONGO_URL_PROD, {
    useNewUrlParser: true,
    useFindAndModify: false,
    useUnifiedTopology: true
});

const db = mongoose.connection;

const handleOpen = () => console.log('★ Connected to db★');
const handleError = error => console.log(`♠ Connection Error: ${error}`);

db.on('error', handleError);
db.once('open', handleOpen);
