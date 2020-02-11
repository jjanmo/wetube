import routes from './routes';

//전역적으로 "뷰나 템플릿"에 변수를 추가하기 위한 미들웨어
//-> 이 변수는 뷰나 탬플릿에서 접근 가능한것(여기선 pug파일)
export const localsMiddleware = (req, res, next) => {
    res.locals.siteName = 'WeTube';
    res.locals.routes = routes;
    //fake data of user
    res.locals.user = {
        isAuthenticated: false,
        id: 13
    }
    next();
};
