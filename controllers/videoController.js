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

// Video Detail
export const videoDetail = async (req, res) => {
    const {
        params: { id }
    } = req;
    try {
        const video = await Video.findById(id);
        res.render('videoDetail', { pageName: video.title, video });
    } catch (error) {
        res.redirect(routes.home);
    }
};

// Video Edit
export const getEditVideo = async (req, res) => {
    const {
        params: { id }
    } = req;
    try {
        const video = await Video.findById(id);
        res.render('editVideo', { pageName: `EDIT ${video.title}`, video });
    } catch (error) {
        res.redirect(routes.home);
    }
};
export const postEditVideo = async (req, res) => {
    const {
        params: { id },
        body: { title, description }
    } = req;
    try {
        await Video.findByIdAndUpdate({ _id: id }, { $set: { title, description } }, { new: true });
        res.redirect(`${routes.videos}${routes.videoDetail(id)}`);
    } catch (error) {
        res.redirect(routes.home);
    }
};

//Video Delete
export const deleteVideo = async (req, res) => {
    const {
        params: { id }
    } = req;
    try {
        await Video.findOneAndRemove({ _id: id });
    } catch (error) {
        console.log(error);
    }
    res.redirect(routes.home);
};
