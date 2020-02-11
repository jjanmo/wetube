import routes from '../routes'

// Join 
export const getJoin = (req, res) => res.render('join', { pageName: 'JOIN' });
export const postJoin = (req, res) => {
    const { body: {
        name,
        email,
        password,
        verifyPassword
    } } = req;
    if (password !== verifyPassword) {
        res.status(400);
        res.render('join', { pageName: 'JOIN' });
    }
    else {
        //추가
        //1)유저의 정보를 db에 등록(register)
        //2)유저는 자동 로그인
        //3)유저 이름(이메일)은 들고가서 home에 뿌려줘야함(로그인했음을 알려줌)
        res.redirect(routes.home);
    }
}

// Login
export const getLogin = (req, res) => res.render('login', { pageName: 'LOGIN' });
export const postLogin = (req, res) => {
    //db에 가서 password가 맞는지 확인해줘야함
    //이름을 들고가서 로그인했는지를 찍어줘야함
    res.redirect(routes.home);
}


export const users = (req, res) => res.render('users', { pageName: 'USERS' });
export const logout = (req, res) => res.render('logout', { pageName: 'LOGOUT' });
export const editProfile = (req, res) => res.render('editProfile', { pageName: 'EDIT PROFILE' });
export const changePassword = (req, res) => res.render('changePassword', { pageName: 'CHANGE PASSWORD' });
export const userDetail = (req, res) => res.render('userDetail', { pageName: 'USER PROFILE' });
