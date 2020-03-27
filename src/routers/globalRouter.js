//globalRouter : seperating routers  from client request '/' such as  '/join' , '/search'
//-> appear in landing page

import express from 'express';
import routes from '../routes';
import { home, search } from '../controllers/videoController';
import {
    logout,
    getJoin,
    postJoin,
    getLogin,
    postLogin,
    getGithubLogin,
    postGithubLogin,
    getGoogleLogin,
    postGoogleLogin,
    getNaverLogin,
    postNaverLogin
} from '../controllers/userController';
import { onlyPublic, onlyPrivate } from '../middlewares';
import passport from 'passport';

const globalRouter = express.Router();

// Home
globalRouter.get(routes.home, home);

// Search
globalRouter.get(routes.search, search);

// Join
globalRouter.get(routes.join, onlyPublic, getJoin);
globalRouter.post(routes.join, onlyPublic, postJoin, postLogin);

// Login
globalRouter.get(routes.login, onlyPublic, getLogin);
globalRouter.post(routes.login, onlyPublic, postLogin);

// Github Login
globalRouter.get(routes.githubLogin, getGithubLogin);
globalRouter.get(routes.githubCallback, passport.authenticate('github', { failureMessage: routes.login }), postGithubLogin);

// Google Login
globalRouter.get(routes.googleLogin, getGoogleLogin);
globalRouter.get(routes.googleCallback, passport.authenticate('google', { failureRedirect: routes.login }), postGoogleLogin);

// Naver Login
globalRouter.get(routes.naverLogin, getNaverLogin);
globalRouter.get(routes.naverCallback, passport.authenticate('naver', { failureRedirect: routes.login }), postNaverLogin);

// Logout
globalRouter.get(routes.logout, onlyPrivate, logout);

export default globalRouter;
