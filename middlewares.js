import routes from './routes';

//전역적으로 뷰나 템플릿에 변수를 추가하기 위한 미들웨어
export const localsMiddleware = (req, res, next) => {
    res.locals.siteName = 'WeTube';
    res.locals.routes = routes;
    next();
};
