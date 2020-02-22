import routes from '../routes';
import User from '../models/User';
import passport from 'passport';

// Join
export const getJoin = (req, res) => res.render('join', { pageName: 'JOIN' });
export const postJoin = async (req, res, next) => {
    const {
        body: { name, email, password, verifyPassword }
    } = req;
    if (password !== verifyPassword) {
        res.status(400);
        res.render('join', { pageName: 'JOIN' });
    } else {
        //1)register user in database
        try {
            const user = await User({
                name,
                email
            });
            await User.register(user, password);
        } catch (error) {
            console.log(error);
            res.redirect(routes.home);
        }
        //2)log user in automatically after joining : postlogin과 같은 역할(postlogin을 middleware로서 사용)
        next();
        //3)유저 이름(이메일)은 들고가서 home에 뿌려줘야함(로그인했음을 알려줌)
        //->2/3은 mid
    }
};

// Login
export const getLogin = (req, res) => res.render('login', { pageName: 'LOGIN' });
export const postLogin = passport.authenticate('local', {
    //passport를 이용한 authentication
    successRedirect: routes.home,
    failureRedirect: routes.login
});

export const logout = (req, res) => res.render('logout', { pageName: 'LOGOUT' });
export const userDetail = (req, res) => res.render('userDetail', { pageName: 'USER PROFILE' });
export const editProfile = (req, res) => res.render('editProfile', { pageName: 'EDIT PROFILE' });
export const changePassword = (req, res) => res.render('changePassword', { pageName: 'CHANGE PASSWORD' });
