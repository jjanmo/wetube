import passport from 'passport';
import GithubStrategy from 'passport-github';
import User from './models/User';
import { githubCallback } from './controllers/userController';
import routes from './routes';

//local strategy 설정
//->원래는 이것보다 길게 설정해야하는데, passport-local strategy를 좀더 편하게 사용할수있는 지름길코드
passport.use(User.createStrategy());

//github stratagy
passport.use(
    new GithubStrategy(
        {
            clientID: process.env.GITHUB_ID,
            clientSecret: process.env.GITHUB_SECRET,
            callbackUrl: `http://127.0.0.1:3000${routes.githubCallback}`
        },
        githubCallback
    )
);

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
