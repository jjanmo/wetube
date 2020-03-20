// 비로그인일 때 모달창이 뜨고 그 후에 로그인하고 나서 다시 그 페이지로 돌아오게 하는것
// 조인은 안돌아옴
import axios from 'axios';

const modalBlock = document.getElementById('jsModalBlock');
const videoLikeBtn = document.getElementById('jsVideoLikeBtn');
const videoDislikeBtn = document.getElementById('jsVideoDislikeBtn');
const commentInput = document.getElementById('jsCommentInput');
const modalOverlay = document.getElementById('jsModalLayout');
const modalLoginBtn = document.getElementById('jsModalLoginBtn');
const modalJoinBtn = document.getElementById('jsModalJoinBtn');

async function goLogin(comebackUrl) {
    // const response = await axios({
    //     method: 'get',
    //     url: `/login?${comebackUrl}`
    // });
}

function handleLogin() {
    const location = window.location.href;
    const comebackUrl = location.split('?')[0];
    goLogin(comebackUrl);
}

function handleJoin() {}

function handleModal() {
    modalBlock.classList.remove('hidden');
}

function exitModal() {
    modalBlock.classList.add('hidden');
}

function init() {
    const userObj = document.getElementById('jsCommentForm').dataset.user;
    console.log(userObj);
    if (!userObj) {
        videoLikeBtn.addEventListener('click', handleModal);
        videoDislikeBtn.addEventListener('click', handleModal);
        commentInput.addEventListener('focus', handleModal);
        modalOverlay.addEventListener('click', exitModal);
        modalLoginBtn.addEventListener('click', handleLogin);
        modalJoinBtn.addEventListener('click', handleJoin);
    }
}

if (modalBlock) {
    init();
}
