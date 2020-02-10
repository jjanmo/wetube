export const home = (req, res) => res.render('home', { pageName: 'HOME' });
export const search = (req, res) => res.render('search', { pageName: 'SEARCH' });
export const videos = (req, res) => res.render('video', { pageName: 'VIDEO' });
export const upload = (req, res) => res.render('upload', { pageName: 'UPLOAD' });
export const videoDetail = (req, res) => res.render('videoDetail', { pageName: 'VIDEO NAME' });
export const editVideo = (req, res) => res.render('editVideo', { pageName: 'EDIT VIDEO' });
export const deleteVideo = (req, res) => res.render('deleteVideo', { pageName: 'DELETE VIDEO' });
