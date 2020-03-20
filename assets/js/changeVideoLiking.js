import axios from 'axios';

const videoPlayer = document.getElementById('jsVideoPlayer');
const videoLikeBtn = document.getElementById('jsVideoLikeBtn');
const videoDislikeBtn = document.getElementById('jsVideoDislikeBtn');
let user;
let isLikeBtn, //현재 클릭한 버튼이 무엇인지?
    isSelected, //클릭한 버튼이 눌려있는지?
    isSwitching = false; //교차 클릭여부?

function parseUser() {
    const userObj = document.getElementById('jsCommentForm').dataset.user;
    //console.log(userObj);
    if (userObj) {
        const tmpObj = JSON.parse(userObj);
        //console.log(tmpObj);
        user = tmpObj._id;
    } else user = null;
}

function paintLiking() {
    const videoLikeCountBox = document.getElementById('jsVideoLikeCount');
    let videoLikeCount = Number(videoLikeCountBox.innerHTML);
    const videoDislikeCountBox = document.getElementById('jsVideoDislikeCount');
    let videoDislikeCount = Number(videoDislikeCountBox.innerHTML);
    //버튼의 색 & 카운트 변경
    if (isLikeBtn) {
        if (isSelected) {
            //색변경
            videoLikeBtn.classList.remove('selected');
            //숫자변경
            videoLikeCount--;
            videoLikeCountBox.innerHTML = videoLikeCount;
            //hover event
            videoLikeBtn.addEventListener('mouseover', handleOver);
        } else {
            if (isSwitching) {
                //색변경
                videoLikeBtn.classList.add('selected');
                videoDislikeBtn.classList.remove('selected');
                //숫자변경
                videoLikeCount++;
                videoDislikeCount--;
                videoLikeCountBox.innerHTML = videoLikeCount;
                videoDislikeCountBox.innerHTML = videoDislikeCount;
                //hover event
                videoLikeBtn.removeEventListener('mouseover', handleOver);
                videoDislikeBtn.addEventListener('mouseover', handleOver);
            } else {
                //색변경
                videoLikeBtn.classList.add('selected');
                //숫자변경
                videoLikeCount++;
                videoLikeCountBox.innerHTML = videoLikeCount;
                //hover event
                videoLikeBtn.removeEventListener('mouseover', handleOver);
            }
        }
    } else {
        if (isSelected) {
            //색변경
            videoDislikeBtn.classList.remove('selected');
            //숫자변경
            videoDislikeCount--;
            videoDislikeCountBox.innerHTML = videoDislikeCount;
            //hover event
            videoDislikeBtn.addEventListener('mouseover', handleOver);
        } else {
            if (isSwitching) {
                //색변경
                videoLikeBtn.classList.remove('selected');
                videoDislikeBtn.classList.add('selected');
                //숫자변경
                videoLikeCount--;
                videoDislikeCount++;
                videoLikeCountBox.innerHTML = videoLikeCount;
                videoDislikeCountBox.innerHTML = videoDislikeCount;
                //hover event
                videoLikeBtn.addEventListener('mouseover', handleOver);
                videoDislikeBtn.removeEventListener('mouseover', handleOver);
            } else {
                //색변경
                videoDislikeBtn.classList.add('selected');
                //숫자변경
                videoDislikeCount++;
                videoDislikeCountBox.innerHTML = videoDislikeCount;
                //hover event
                videoDislikeBtn.removeEventListener('mouseover', handleOver);
            }
        }
    }
}

const changeLiking = async () => {
    const videoId = window.location.pathname.split('/')[2];
    const response = await axios({
        method: 'post',
        url: `/api/${videoId}/change-video-liking`,
        data: {
            isLikeBtn,
            isSelected,
            isSwitching,
            userId: user
        }
    });
    //console.log(response);
    if (response.status === 200) {
        paintLiking();
    }
};

function clickLikingBtn(e) {
    const clickedBtn = e.currentTarget;
    isLikeBtn = !clickedBtn.className.includes('dislike');
    //true -> likebtn /false -> dislikebtn
    if (isLikeBtn) {
        isSelected = videoLikeBtn.className.includes('selected');
        if (!isSelected) {
            isSwitching = videoDislikeBtn.className.includes('selected') ? true : false;
        }
    } else {
        isSelected = videoDislikeBtn.className.includes('selected');
        if (!isSelected) {
            isSwitching = videoLikeBtn.className.includes('selected') ? true : false;
        }
    }
    // console.log('isLikeBtn:', isLikeBtn, 'isSelected:', isSelected, 'isSwitching:', isSwitching);
    changeLiking();
}

function handleOver(e) {
    const target = e.currentTarget;
    if (!target.className.includes('selected')) target.classList.add('hover');
}

function handleOut(e) {
    const target = e.currentTarget;
    target.classList.remove('hover');
}

function init() {
    parseUser();
    if (user) {
        videoLikeBtn.addEventListener('click', clickLikingBtn);
        videoDislikeBtn.addEventListener('click', clickLikingBtn);
    }
    videoLikeBtn.addEventListener('mouseover', handleOver);
    videoLikeBtn.addEventListener('mouseout', handleOut);
    videoDislikeBtn.addEventListener('mouseover', handleOver);
    videoDislikeBtn.addEventListener('mouseout', handleOut);
}

if (videoPlayer) {
    init();
}
