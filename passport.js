import passport from 'passport';
import User from './models/User';

//local strategy 설정
//->원래는 이것보다 길게 설정해야하는데, passport-local strategy를 좀더 편하게 사용할수있는 지름길코드
passport.use(User.createStrategy());

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
