import passport from 'passport';
import GithubStrategy from 'passport-github';
import GoogleStrategy from 'passport-google-oauth20';
import User from './models/User';
import { githubCallback, googleCallback } from './controllers/userController';
import routes from './routes';

//local strategy 설정
//->원래는 이것보다 길게 설정해야하는데, passport-local strategy를 좀더 편하게 사용할수있는 지름길코드
passport.use(User.createStrategy());

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

//github strategy
passport.use(
    new GithubStrategy(
        {
            clientID: process.env.GITHUB_ID,
            clientSecret: process.env.GITHUB_SECRET,
            callbackURL: `http://127.0.0.1:3000${routes.githubCallback}`
        },
        githubCallback
    )
);

//google strategy
passport.use(
    new GoogleStrategy(
        {
            clientID: process.env.GOOGLE_ID,
            clientSecret: process.env.GOOGLE_SECRET,
            callbackURL: `http://127.0.0.1:3000${routes.googleCallback}`
        },
        googleCallback
    )
);
