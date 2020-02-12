import routes from '../routes';
import Video from '../models/Video';

// Home
export const home = async (req, res) => {
    try {
        const videos = await Video.find({});
        console.log(videos); // []
        res.render('home', { pageName: 'HOME', videos });
    } catch (error) {
        console.log(error);
        res.render('home', { pageName: 'HOME', videos });
    }
};

// Search
export const search = (req, res) => {
    // const term = req.query.term;
    //-> 아래처럼 사용하는 것이 더 섹쉬함! ES6
    const {
        query: { term }
    } = req;
    res.render('search', { pageName: 'SEARCH', term, videos }); //term : term => term으로 한 번에 사용가능
};

// Upload
export const getUpload = (req, res) => res.render('upload', { pageName: 'UPLOAD' });
export const postUpload = async (req, res) => {
    //db와 연결후 영상 등록을 해야함!
    const {
        body: { title, description },
        file: { path }
    } = req;
    const newVideo = await Video.create({
        title,
        description,
        fileUrl: path
    });
    //newVideo.id : document가 생성되면서 자동으로 부여되는듯...
    res.redirect(`${routes.videos}${routes.videoDetail(newVideo.id)}`); //등록한 영상의 상세페이지로 이동
};

export const videoDetail = (req, res) => res.render('videoDetail', { pageName: 'VIDEO NAME' });
export const editVideo = (req, res) => res.render('editVideo', { pageName: 'EDIT VIDEO' });
export const deleteVideo = (req, res) => res.render('deleteVideo', { pageName: 'DELETE VIDEO' });
