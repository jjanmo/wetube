import routes from '../routes';
import User from '../models/User';
import passport from 'passport';

const DEFAULT_AVATAR = 'https://f0.pngfuel.com/png/348/800/man-wearing-blue-shirt-illustration-png-clip-art-thumbnail.png';

// Join
export const getJoin = (req, res) => res.render('join', { pageName: 'JOIN' });
export const postJoin = async (req, res, next) => {
    const {
        body: { name, email, password, verifyPassword }
    } = req;
    if (password !== verifyPassword) {
        req.flash('error', "Passwords don't match");
        res.status(400);
        res.render('join', { pageName: 'JOIN' });
    } else {
        //1)register user in database
        try {
            const user = await User({
                name,
                email,
                avatarUrl: DEFAULT_AVATAR
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
    res.render('login', { pageName: 'LOGIN' });
};
export const postLogin = passport.authenticate('local', {
    //passport를 이용한 authentication
    successRedirect: routes.home,
    failureRedirect: routes.login,
    successFlash: 'Welcome to Wetube',
    failureFlash: 'Check email or password'
});

// Github Login
export const getGithubLogin = passport.authenticate('github', {
    successFlash: 'Welcome to Wetube',
    failureFlash: "Can't LOGIN"
});
//->client가 github 인증을 받기위해서 들어오는 route -> passport.js의 github strategy를 사용하기 위해 접근

export const githubCallback = async (_, __, profile, cb) => {
    //github의 정보를 요청한 웹서버로 넘겨주는 과정
    const {
        _json: { id, avatar_url, name, email }
    } = profile;
    try {
        const user = await User.findOne({ email });
        if (user) {
            user.avatarUrl = user.avatarUrl || avatar_url;
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
export const getGoogleLogin = passport.authenticate('google', {
    scope: ['profile', 'email'],
    successFlash: 'Welcome to Wetube',
    failureFlash: "Can't LOGIN"
});

export const googleCallback = async (_, __, profile, cb) => {
    const {
        _json: { sub, name, picture, email }
    } = profile;
    try {
        const user = await User.findOne({ email });
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

// Naver Login : not yet!!
export const getNaverLogin = passport.authenticate('naver');

export const naverCallback = (accessToken, refreshToken, profile, done) => {
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
    req.flash('info', 'Bye Bye 🎈 See you');
    req.logout();
    res.redirect(routes.home);
};

// My Profile : 자신의 프로필에 접근할 때
export const getMyProfile = async (req, res) => {
    try {
        const videosOfUser = await User.findById(req.user.id)
            .populate('videos')
            .populate('likeVideos');
        const uploadedVideos = videosOfUser.videos;
        const likedVideos = videosOfUser.likeVideos;
        res.render('userProfile', { pageName: 'My Profile', user: req.user, uploadedVideos, likedVideos }); //여기서 user는 로그인한 유저
    } catch (error) {
        console.log(error);
    }
};

// UserDetail : 남의 프로필에 접근할 때
export const userDetail = async (req, res) => {
    const {
        params: { id }
    } = req;
    try {
        const user = await User.findById(id)
            .populate('videos')
            .populate('likeVideos');
        const uploadedVideos = user.videos;
        const likedVideos = user.likeVideos;
        res.render('userProfile', { pageName: 'Profile', user, uploadedVideos, likedVideos }); //여기서 user는 다른 유저를 찾는 경우
    } catch (error) {
        console.log(error);
        req.flash('info', "Can't access profile");
        res.redirect(routes.home);
    }
};

// EditProfile
export const getEditProfile = (req, res) => res.render('editProfile', { pageName: 'EDIT PROFILE' });
export const postEditProfile = async (req, res) => {
    const {
        body: { name, email, bio },
        file
    } = req;
    console.log(bio);
    //parse textarea

    try {
        await User.findByIdAndUpdate(req.user._id, {
            name,
            email,
            bio,
            avatarUrl: file ? file.location : req.user.avatarUrl
        });
        req.flash('success', 'Complete 🎯');
        res.redirect(`${routes.users}${routes.myProfile}`);
    } catch (error) {
        console.log(error);
        req.flash('failure', "Can't update profile");
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
            req.flash('failure', "Passwords don't match");
            res.send(400);
            res.redirect(`${routes.users}${routes.changePassword}`);
            return;
        }
        //console.log(Object.keys(req.user));
        await req.user.changePassword(currentPassword, newPassword);
        //changePassword는 passport-local-mongoose에 있는 메소드임 -> req에 담겨져서 보내짐
        req.flash('success', 'Complete 🎯');
        res.redirect(`${routes.users}${routes.myProfile}`);
    } catch (error) {
        console.log(error);
        req.flash('failure', "Can't change password");
        res.send(400);
        res.redirect(`${routes.users}${routes.changePassword}`);
    }
};

// Add Profile Art
export const postAddProfileArt = async (req, res) => {
    const { file } = req;
    try {
        await User.findByIdAndUpdate(req.user.id, {
            profileArtUrl: file.location
        });
        req.flash('success', 'Updated Profile Art ✨');
        res.redirect(`${routes.users}${routes.myProfile}`);
    } catch (error) {
        console.log(error);
        req.flash('failure', "Can't update profile art");
    }
};

//EditCoverImage
export const getEditCoverImage = (req, res) => res.render('editCoverImage', { pageName: 'EDIT COVER IMAGE' });
export const postEditCoverImage = async (req, res) => {
    const { file } = req;
    console.log(file);
    try {
        await User.findByIdAndUpdate(req.user.id, {
            coverImageUrl: file.location
        });
        req.flash('success', 'Complete 🎯');
        res.redirect(`${routes.users}${routes.myProfile}`);
    } catch (error) {
        console.log(error);
        req.flash('failure', "Can't update cover image");
        res.redirect(`${routes.users}${routes.editProfile}`);
    }
};
