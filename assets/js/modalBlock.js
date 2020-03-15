import axios from 'axios';

const hiddenInput = document.getElementById('jsHiddenInput');
const modalBlock = document.getElementById('jsModalBlock');
const videoLikeBtn = document.getElementById('jsVideoLikeBtn');
const videoDislikeBtn = document.getElementById('jsVideoDislikeBtn');
const commentInput = document.getElementById('jsCommentInput');
const modalOverlay = document.getElementById('jsModalLayout');
const modalLoginBtn = document.getElementById('jsModalLoginBtn');
const modalJoinBtn = document.getElementById('jsModalJoinBtn');




async function goLogin(comebackUrl) {

    const response = await axios({
        method: 'get',
        url: `/login?${comebackUrl}`
    });

}




function handleLogin() {
    const location = window.location.href;
    const comebackUrl = location.split('?')[0];
    goLogin(comebackUrl);
}


function handleJoin() {


}




function handleModal() {
    modalBlock.classList.remove('hidden');

}

function exitModal() {
    modalBlock.classList.add('hidden');
}


function init() {
    const loggedUser = hiddenInput.value;
    if (!loggedUser) {
        videoLikeBtn.addEventListener('click', handleModal);
        videoDislikeBtn.addEventListener('click', handleModal);
        commentInput.addEventListener('focus', handleModal);
        modalOverlay.addEventListener('click', exitModal);
        modalLoginBtn.addEventListener('click', handleLogin)
        modalJoinBtn.addEventListener('click', handleJoin);
    }
}


if (modalBlock) {
    init();
}