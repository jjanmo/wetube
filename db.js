import mongoose from 'mongoose';

mongoose.connect('mongodb://localhost:27017/wetube', {
    //mongodb://localhost:포트번호/프로젝트이름
    userNewUrlParser: true,
    useFindAndModify: false
});

const db = mongoose.connection;

const handleOpen = () => console.log('★ Connected to db★');
const handleError = error => console.log(`♠ Connection Error: ${error}`);

db.on('error', handleError);
db.once('open', handleOpen);
