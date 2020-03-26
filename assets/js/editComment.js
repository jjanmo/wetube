import axios from 'axios';

const commentList = document.getElementById('jsCommentList');

let commentId, commentBlock, displayBox, editBox, editCommentForm, editCommentInput, editCommentCancelBtn, editCommentSaveBtn;

function handleCancel() {
    displayBox.classList.remove('hidden');
    editBox.classList.add('hidden');
    // console.log('2', displayBox, editBox, editCommentForm, editCommentInput, editCommentCancelBtn, editCommentSaveBtn);
}

async function handleSave(e) {
    e.preventDefault();
    const newComment = commentBlock.querySelector('#jsEditCommentInput').value;
    const response = await axios({
        method: 'post',
        url: `/api/${commentId}/edit-comment`,
        data: {
            comment: newComment
        }
    });
    if (response.status === 200) {
        displayBox.querySelector('p').textContent = newComment;
        displayBox.classList.remove('hidden');
        editBox.classList.add('hidden');
    }
}
function initVariable(commentId) {
    commentBlock = document.getElementById(`${commentId}`);
    // console.log('cb', commentBlock);
    if (commentBlock) {
        displayBox = commentBlock.querySelector('.displayBox');
        editBox = commentBlock.querySelector('.editBox');
        editCommentForm = editBox.querySelector('#jsEditCommentForm');
        editCommentInput = editBox.querySelector('#jsEditCommentInput');
        editCommentCancelBtn = editBox.querySelector('#jsEditCommentCancelBtn');
        editCommentSaveBtn = editBox.querySelector('#jsEditCommentSaveBtn');
        // console.log('1', displayBox, editBox, editCommentForm, editCommentInput, editCommentCancelBtn, editCommentSaveBtn);
    }
}

function handleEdit(e) {
    const target = e.target; //editbutton
    if (target.className.includes('editComment')) {
        commentId = target.parentElement.parentElement.parentElement.dataset.id; //commentId
        initVariable(commentId); //assign variables
        const comment = displayBox.querySelector('p').textContent; //get comment
        //show editForm
        displayBox.classList.add('hidden');
        editBox.classList.remove('hidden');
        //add event-listener
        editCommentForm.addEventListener('submit', handleSave);
        editCommentSaveBtn.addEventListener('submit', handleSave);
        editCommentCancelBtn.addEventListener('click', handleCancel);
        //initialize
        editCommentInput.value = comment;
        editCommentInput.focus();
    }
}

function init() {
    commentList.addEventListener('click', handleEdit);
}

if (commentList && commentList.childElementCount !== 0) init();
