import routes from './routes';
import multer from 'multer';

//파일 upload를 위한 nodejs의 미들웨어 : multer
const multerVideo = multer({ dest: 'uploads/videos/' }); //video url 저장장소 설정
//주의점 : /uploads/videos  vs uploads/videos
//전자 :  내컴퓨터의 root에 폴더를 만드는 것
//후자 : 내프로젝트 내에 폴더를 만든느 것

export const uploadVideo = multerVideo.single('videoFile');

//전역적으로 "뷰나 템플릿"에 변수를 추가하기 위한 미들웨어
//-> 이 변수는 뷰나 탬플릿에서 접근 가능한것(여기선 pug파일)
export const localsMiddleware = (req, res, next) => {
    res.locals.siteName = 'WeTube';
    res.locals.routes = routes;
    //fake data of user
    res.locals.user = {
        isAuthenticated: false,
        id: 13
    };
    next();
};
