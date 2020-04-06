import axios from 'axios';
import { parseUser } from './changeVideoLiking';

// const commentList = document.getElementById('jsCommentList');
const commentContainer = document.getElementById('jsCommentContainer');
let userId, likeIcon, commentId, commentBlock;
//flag
let isSelected; //클릭한 버튼이 눌려있는지?

//change count
function changeCommentLikingCount() {
    if (commentBlock) {
        let likeCommentCnt = Number(commentBlock.querySelector('#jsLikeCommentCnt').textContent);
        // console.log(likeCommentCnt);
        isSelected ? likeCommentCnt-- : likeCommentCnt++;
        commentBlock.querySelector('#jsLikeCommentCnt').textContent = likeCommentCnt;
    }
}

function togglePaintingHeart(target) {
    target.classList.toggle('selected');
}

async function changeCommentLiking() {
    const response = await axios({
        method: 'post',
        url: `/api/${commentId}/change-comment-liking`,
        data: {
            userId,
            isSelected
        }
    });
    if (response.status === 200) {
        togglePaintingHeart(likeIcon);
        changeCommentLikingCount();
    }
}

function handleCommentLiking(e) {
    userId = parseUser(); //get userId
    likeIcon = e.target;
    if (userId && likeIcon.className.includes('like')) {
        commentId = likeIcon.parentElement.parentElement.parentElement.dataset.id; //commentId
        commentBlock = document.getElementById(`${commentId}`);
        //console.log(commentBlock, commentId);
        if (likeIcon.className.includes('selected')) {
            //이미 클릭한것을 다시 클릭한 경우
            isSelected = true;
        } else {
            isSelected = false;
        }
        changeCommentLiking();
    }
}

function init() {
    // commentList.addEventListener('click', handleCommentLiking);
    commentContainer.addEventListener('click', handleCommentLiking);

}

if (commentContainer) init();
// if (commentList && commentList.childElementCount !== 0) init();
