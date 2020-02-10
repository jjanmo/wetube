export const join = (req, res) => res.render('join', { pageName: 'JOIN' });
export const login = (req, res) => res.render('login', { pageName: 'LOGIN' });
export const logout = (req, res) => res.render('logout', { pageName: 'LOGOUT' });
export const users = (req, res) => res.render('users', { pageName: 'USERS' });
export const userDetail = (req, res) => res.render('userDetail', { pageName: 'USER NAME' });
export const editProfile = (req, res) => res.render('editProfile', { pageName: 'EDIT PROFILE' });
export const changePassword = (req, res) => res.render('changePassword', { pageName: 'CHANGE PASSWORD' });
