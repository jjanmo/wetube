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
export const getLogin = (req, res) => {
    const {
        query: { url }
    } = req;
    // console.log(url); //videoDetail => login => videoDetail  : imcomplete
    if (url) {
        res.render('login', { pageName: 'LOGIN', url });
    } else {
        res.render('login', { pageName: 'LOGIN' });
    }
};
export const postLogin = passport.authenticate('local', {
    //passport를 이용한 authentication
    successRedirect: routes.home,
    failureRedirect: routes.login
});

// Github Login
export const getGithubLogin = passport.authenticate('github');
//->client가 github 인증을 받기위해서 들어오는 route -> passport.js의 github strategy를 사용하기 위해 접근

export const githubCallback = async (_, __, profile, cb) => {
    //github의 정보를 요청한 웹서버로 넘겨주는 과정
    const {
        _json: { id, avatar_url, name, email }
    } = profile;
    try {
        const user = await User.findOne({ email });
        if (user) {
            user.avatarUrl = avatar_url;
            user.githubId = id;
            user.save();
            return cb(null, user);
        }
        const newUser = await User.create({
            name,
            email,
            githubId: id,
            avatarUrl: avatar_url
        });
        return cb(null, newUser);
    } catch (error) {
        console.log(error);
        return cb(error);
    }
};

export const postGithubLogin = (req, res) => res.redirect(routes.home);

// Google Login
export const getGoogleLogin = passport.authenticate('google', { scope: ['profile', 'email'] });

export const googleCallback = async (_, __, profile, cb) => {
    const {
        _json: { sub, name, picture, email }
    } = profile;
    try {
        const user = await User.findOne({ email });
        console.log(user);
        if (user) {
            user.googleId = sub;
            user.avatarUrl = user.avatarUrl || picture;
            user.save();
            return cb(null, user);
        }
        const newUser = await User.create({
            name,
            email,
            googleId: sub,
            avatarUrl: picture
        });
        return cb(null, newUser);
    } catch (error) {
        console.log(error);
        return cb(error);
    }
};

export const postGoogleLogin = (req, res) => res.redirect(routes.home);

// Naver Login
export const getNaverLogin = passport.authenticate('naver');

export const naverCallback = (accessToken, refreshToken, profile, done) => {
    console.log(profile);
    // try {
    //     const user = await User.findOne({ 'naverId': profile.id });
    //     if (user) {
    //         user.name = profile.displayName;
    //         user.save();
    //         return done(null, user);
    //     }
    //     const newUser = await User.create({
    //         name: profile.displayName,
    //         email: profile.email[0],
    //         naverId: profile.id,
    //     });
    //     return done(null, newUser);
    // } catch (error) {
    //     console.log(error)
    // }
};

export const postNaverLogin = (req, res) => res.redirect(routes.home);

// Logout
export const logout = (req, res) => {
    req.logout();
    res.redirect(routes.home);
};

// My Profile : 자신의 프로필에 접근할 때
export const getMyProfile = async (req, res) => {
    res.render('userProfile', { pageName: 'My Profile', user: req.user }); //여기서 user는 로그인한 유저
};

// UserDetail : 남의 프로필에 접근할 때
export const userDetail = async (req, res) => {
    const {
        params: { id }
    } = req;
    try {
        const user = await User.findById(id);
        res.render('userProfile', { pageName: 'Profile', user }); //여기서 user는 다른 유저를 찾는 경우
    } catch (error) {
        console.log(error);
        res.redirect(routes.home);
    }
};

// EditProfile
export const getEditProfile = (req, res) => res.render('editProfile', { pageName: 'EDIT PROFILE' });
export const postEditProfile = async (req, res) => {
    const {
        body: { name, email },
        file
    } = req;
    console.log(name, email, file);
    try {
        await User.findByIdAndUpdate(req.user.id, {
            name,
            email,
            avatarUrl: file ? file.location : req.user.avatarUrl
        });
        res.redirect(`${routes.users}${routes.myProfile}`);
    } catch (error) {
        console.log(error);
        res.redirect(`${routes.users}${routes.editProfile}`);
    }
};

//ChangePassword
export const getChangePassword = (req, res) => res.render('changePassword', { pageName: 'CHANGE PASSWORD' });
export const postChangePassword = async (req, res) => {
    const {
        body: { currentPassword, newPassword, verifyPassword }
    } = req;
    try {
        if (newPassword !== verifyPassword) {
            res.send(400);
            res.redirect(`${routes.users}${routes.changePassword}`);
            return;
        }
        //console.log(Object.keys(req.user));
        await req.user.changePassword(currentPassword, newPassword);
        //changePassword는 passport-local-mongoose에 있는 메소드임 -> req에 담겨져서 보내짐
        res.redirect(`${routes.users}${routes.myProfile}`);
    } catch (error) {
        console.log(error);
        res.send(400);
        res.redirect(`${routes.users}${routes.changePassword}`);
    }
};
