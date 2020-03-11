import routes from '../routes';
import Video from '../models/Video';

// Home
export const home = async (req, res) => {
    try {
        const videos = await Video.find({}).populate('creator').sort({ _id: -1 });
        // console.log(videos); // []
        res.render('home', { pageName: 'HOME', videos });
    } catch (error) {
        console.log(error);
        res.render('home', { pageName: 'HOME' });
    }
};

// Search
export const search = async (req, res) => {
    const {
        query: { term }
    } = req;
    let videos = [];
    try {
        videos = await Video.find({
            title: { $regex: term, $options: 'i' }
        });
        res.render('search', { pageName: 'SEARCH', term, videos });
    } catch (error) {
        console.log(error);
    }
    res.render('search', { pageName: 'SEARCH', term, videos });
};

// Upload
export const getUpload = (req, res) => res.render('upload', { pageName: 'UPLOAD' });
export const postUpload = async (req, res) => {
    //db와 연결후 영상 등록을 해야함!
    //-> 실제로직 : 영상을 직접 업로드하는것이 아니고
    //영상은 서버에 있고 그 서버의 url을 가지고 와서 연결시키는것
    const {
        body: { title, description },
        file: { path }
    } = req;
    const newVideo = await Video.create({
        title,
        description,
        fileUrl: path,
        creator: req.user.id
    });
    req.user.videos.push(newVideo.id);
    req.user.save();
    //newVideo.id : document가 생성되면서 자동으로 부여되는듯...
    res.redirect(`${routes.videos}${routes.videoDetail(newVideo.id)}`); //등록한 영상의 상세페이지로 이동
};

// Video Detail
export const videoDetail = async (req, res) => {
    const {
        params: { id }
    } = req;
    try {
        const video = await Video.findById(id)
            .populate('creator')
            .populate({ path: 'comments', populate: { path: 'creator' } });
        console.log(video);
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
    const video = await Video.findById(id);
    try {
        // console.log(video.creator.id, typeof video.creator.id);
        if (req.user.id !== String(video.creator)) {
            throw Error;
        }
        else {
            res.render('editVideo', { pageName: `EDIT ${video.title}`, video });
        }
    } catch (error) {
        res.redirect(`${routes.videos}/${video.id}`);
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
    const video = await Video.findById(id);
    try {
        if (req.user.id !== String(video.creator)) {
            throw Error;
        }
        else {
            await Video.findOneAndRemove({ _id: id });
            res.redirect(routes.home);
        }
    } catch (error) {
        console.log(error);
        res.redirect(`${routes.videos}/${video.id}`);
    }
};


// Register video view
export const postRegisterView = async (req, res) => {
    const { params: { id } } = req;
    try {
        const video = await Video.findById(id);
        video.views++;
        video.save();
        res.status(200)
    }
    catch (error) {
        console.log(error);
        res.status(400);
    } finally {
        res.end();
    }
}