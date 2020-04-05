//url mapping을 위한 js파일
//-> 어디서든 이 파일만 import하여 쉽게 url을 맵핑하기 위한 것

// Global
const HOME = '/';
const JOIN = '/join';
const LOGIN = '/login';
const LOGOUT = '/logout';
const SEARCH = '/search';

// User
const USERS = '/users';
const USER_DETAIL = '/:id';
const MYPROFILE = '/myprofile';
const EDIT_PROFILE = '/edit-profile';
const CHANGE_PASSWORD = '/change-password';
const ADD_PROFILE_ART = '/add-profile-art';
const EDIT_COVER_IMAGE = '/edit-cover-image';

// Social Login
const GITHUB_LOGIN = '/auth/github';
const GITHUB_CALLBACK = '/auth/github/callback';
const GOOGLE_LOGIN = '/auth/google';
const GOOGLE_CALLBACK = '/auth/google/callback';
const NAVER_LOGIN = '/auth/naver';
const NAVER_CALLBACK = '/auth/naver/callback';

// API
const API = '/api';
const REGISTER_VIEW = '/:id/view';
const ADD_COMMENT = '/:id/add-comment';
const EDIT_COMMENT = '/:id/edit-comment';
const DELETE_COMMENT = '/:id/delete-comment';
const CHANGE_VIDEO_LIKING = '/:id/change-video-liking';
const CHANGE_COMMENT_LIKING = '/:id/change-comment-liking';
const ADD_REPLY = '/:id/add-reply';
const EDIT_REPLY = '/:id/edit-reply';
const DELETE_REPLY = '/:id/delete-reply';

// Video
const VIDEOS = '/videos';
const UPLOAD = '/upload';
const VIDEO_DETAIL = '/:id';
const EDIT_VIDEO = '/:id/edit';
const DELETE_VIDEO = '/:id/delete';

const routes = {
    home: HOME,
    join: JOIN,
    login: LOGIN,
    logout: LOGOUT,
    search: SEARCH,
    users: USERS,
    myProfile: MYPROFILE,
    userDetail: id => {
        return id ? `/${id}` : USER_DETAIL;
    },
    editProfile: EDIT_PROFILE,
    changePassword: CHANGE_PASSWORD,
    addProfileArt: ADD_PROFILE_ART,
    editCoverImage: EDIT_COVER_IMAGE,
    videos: VIDEOS,
    upload: UPLOAD,
    videoDetail: id => {
        return id ? `/${id}` : VIDEO_DETAIL;
    },
    editVideo: id => {
        return id ? `/${id}/edit` : EDIT_VIDEO;
    },
    deleteVideo: id => {
        return id ? `/${id}/delete` : DELETE_VIDEO;
    },
    githubLogin: GITHUB_LOGIN,
    githubCallback: GITHUB_CALLBACK,
    googleLogin: GOOGLE_LOGIN,
    googleCallback: GOOGLE_CALLBACK,
    naverLogin: NAVER_LOGIN,
    naverCallback: NAVER_CALLBACK,
    api: API,
    registerView: REGISTER_VIEW,
    addComment: ADD_COMMENT,
    deleteComment: DELETE_COMMENT,
    editComment: EDIT_COMMENT,
    changeVideoLiking: CHANGE_VIDEO_LIKING,
    changeCommentLiking: CHANGE_COMMENT_LIKING,
    addReply: ADD_REPLY,
    editReply: EDIT_REPLY,
    deleteReply: DELETE_REPLY
};

export default routes;
