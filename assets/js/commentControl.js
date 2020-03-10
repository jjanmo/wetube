import axios from 'axios';

const commentContainer = document.getElementById('jsCommentContainer');
const commentForm = document.getElementById('jsCommentForm');
const commentSubmitBtn = document.getElementById('jsCommentSubmitBtn')
const commentList = document.getElementById('jsCommentList');


function printComment(comment) {
    const commentItem = document.createElement('div');
    commentItem.innerHTML = comment;
    commentList.prepend(commentItem);
}



const sendComment = async (comment) => {
    const id = window.location.pathname.split('/')[2];
    const result = await axios({
        method: 'post',
        url: `/api/${id}/addComment`,
        data: {
            comment
        }
    });
    console.log(result);
    printComment(comment);
}



function handleSubmit(e) {
    e.preventDefault();
    const commentInput = document.getElementById('jsCommentInput');
    const comment = commentInput.value;
    sendComment(comment);
    commentInput.value = "";

}

function init() {
    commentForm.addEventListener('submit', handleSubmit);
    commentSubmitBtn.addEventListener('submit', handleSubmit);
}

if (commentContainer) {
    init();
}