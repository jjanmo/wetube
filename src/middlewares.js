import routes from './routes';
import multer from 'multer';
import multerS3 from 'multer-s3';
import aws from 'aws-sdk';

//s3 initialization
const s3 = new aws.S3({
    accessKeyId: process.env.AWS_KEY,
    secretAccessKey: process.env.AWS_PRIVATE_KEY,
    region: 'ap-northeast-2'
});

const multerVideo = multer({
    storage: multerS3({
        s3,
        acl: 'public-read',
        bucket: 'jjantube/video'
    })
});
const multerAvatar = multer({
    storage: multerS3({
        s3,
        acl: 'public-read',
        bucket: 'jjantube/avatar'
    })
});

// 초기 local 작업할 때...
// //파일 upload를 위한 nodejs의 미들웨어 : multer
// //-> 이런식으로 하는 것 : 비추천
// const multerVideo = multer({ dest: 'uploads/videos/' }); //video url 저장장소 설정
// //주의점 : /uploads/videos  vs uploads/videos
// //전자 :  내컴퓨터의 root에 폴더를 만드는 것
// //후자 : 내프로젝트 내에 폴더를 만드는 것
// const multerAvatar = multer({ dest: 'uploads/avatar/' });

export const uploadVideo = multerVideo.single('videoFile');
export const uploadAvatar = multerAvatar.single('avatarFile');
//전역적으로 "뷰나 템플릿"에 변수를 추가하기 위한 미들웨어
//-> 이 변수는 뷰나 탬플릿에서 접근 가능한것(여기선 pug파일)
export const localsMiddleware = (req, res, next) => {
    res.locals.siteName = 'WeTube';
    res.locals.routes = routes;
    res.locals.loggedUser = req.user || null;
    res.locals.dateFormatter = dateFormatter;
    next();
};

//로그인 한 유저는 접속하지 못하게하는 미들웨어
export const onlyPublic = (req, res, next) => {
    req.user ? res.redirect(routes.home) : next();
};

//로그인 한 유저만 접속가능하게 하는 미들웨어
export const onlyPrivate = (req, res, next) => {
    req.user ? next() : res.redirect(routes.join);
};

//date formatter
export const dateFormatter = dateStr => {
    const date = new Date(dateStr);
    return `${date.getFullYear()}.${date.getMonth() + 1 < 10 ? `0${date.getMonth() + 1}` : date.getMonth() + 1}.${
        date.getDate() < 10 ? `0${date.getDate()}` : date.getDate()
    }`;
};