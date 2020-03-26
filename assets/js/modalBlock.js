// 비로그인일 때 모달창이 뜨고 그 후에 로그인하고 나서 다시 그 페이지로 돌아오게 하는것
// 조인은 안돌아옴

const modalBlock = document.getElementById('jsModalBlock');
const videoLikeBtn = document.getElementById('jsVideoLikeBtn');
const videoDislikeBtn = document.getElementById('jsVideoDislikeBtn');
const commentInput = document.getElementById('jsCommentInput');
const modalOverlay = document.getElementById('jsModalLayout');
const commentList = document.getElementById('jsCommentList');
let likeCommentBtns, replyCommentBtns;

function handleModal() {
    modalBlock.classList.remove('hidden');
}

function exitModal() {
    modalBlock.classList.add('hidden');
}

// function addLoginLink() {
//     const loginLink = document.getElementById('jsModalLoginLink');
//     const location = window.location.href;
//     const comebackUrl = location.split('?')[0];
//     const url = `${loginLink.href}?url=${comebackUrl}`;
//     loginLink.href = url;
// }

function init() {
    const userObj = document.getElementById('jsCommentForm').dataset.user;
    //console.log(userObj);
    if (!userObj) {
        videoLikeBtn.addEventListener('click', handleModal);
        videoDislikeBtn.addEventListener('click', handleModal);
        commentInput.addEventListener('focus', handleModal);
        modalOverlay.addEventListener('click', exitModal);
        // addLoginLink();
        if (commentList && commentList.childElementCount !== 0) {
            likeCommentBtns = document.querySelectorAll('.likeCommentBtn');
            replyCommentBtns = document.querySelectorAll('.replyCommentBtn');
            likeCommentBtns.forEach(ele => ele.addEventListener('click', handleModal));
            replyCommentBtns.forEach(ele => ele.addEventListener('click', handleModal));
        }
    }
}

if (modalBlock) {
    init();
}
