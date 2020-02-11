export const home = (req, res) => res.render('home', { pageName: 'HOME' });

export const search = (req, res) => {
    // const term = req.query.term;
    //-> 아래처럼 사용하는 것이 더 섹쉬함! ES6
    const { query: { term } } = req;
    res.render('search', { pageName: 'SEARCH', term }); //term : term => term으로 한 번에 사용가능
}

export const videos = (req, res) => res.render('video', { pageName: 'VIDEO' });
export const upload = (req, res) => res.render('upload', { pageName: 'UPLOAD' });
export const videoDetail = (req, res) => res.render('videoDetail', { pageName: 'VIDEO NAME' });
export const editVideo = (req, res) => res.render('editVideo', { pageName: 'EDIT VIDEO' });
export const deleteVideo = (req, res) => res.render('deleteVideo', { pageName: 'DELETE VIDEO' });
