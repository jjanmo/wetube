import axios from 'axios';
import { parseUser } from './changeVideoLiking';
import { addMessageModal } from './addMessageModal';

const commentList = document.getElementById('jsCommentList');
let userId, replyId, replyDisplayBox, replyEditBox, replyEditForm, replyEditInput, replyEditCancelBtn, replyEditSaveBtn;

function closeEditBox() {
    replyDisplayBox.classList.toggle('hidden');
    replyEditBox.classList.toggle('hidden');
    replyEditInput.value = '';
}

function showEditBox() {
    const replyText = replyDisplayBox.getElementsByTagName('div')[2].textContent;
    replyDisplayBox.classList.toggle('hidden');
    replyEditBox.classList.toggle('hidden');
    replyEditInput.value = replyText;
}

async function sendReply() {
    const text = replyEditInput.value;
    const response = await axios({
        method: 'post',
        url: `/api/${replyId}/edit-reply`,
        data: {
            text
        }
    });
    if (response.status === 200) {
        //change reply text
        replyDisplayBox.querySelector('.replyText').textContent = text;
        closeEditBox();
        addMessageModal('Reply', 'Edited');
    }
}

function handleSaveEditReply(e) {
    e.preventDefault();
    sendReply();
}

function handleEditReply(e) {
    userId = parseUser(); //get userId
    const target = e.target; //replyEdit button
    if (userId && target.className.includes('editReply')) {
        replyId = target.dataset.id;
        replyDisplayBox = target.parentElement.parentElement.parentElement;
        replyEditBox = replyDisplayBox.nextSibling;
        replyEditForm = replyEditBox.firstChild;
        replyEditInput = replyEditBox.firstChild.firstChild;
        replyEditCancelBtn = replyEditBox.querySelector('#jsReplyEditCancelBtn');
        replyEditSaveBtn = replyEditBox.querySelector('#jsReplyEditSaveBtn');
        //add eventlistener
        replyEditCancelBtn.addEventListener('click', closeEditBox);
        replyEditSaveBtn.addEventListener('submit', handleSaveEditReply);
        replyEditForm.addEventListener('submit', handleSaveEditReply);
        //console.log(replyEditBox, replyEditInput, replyEditCancelBtn, replyEditSaveBtn);
        showEditBox();
    }
}

function init() {
    commentList.addEventListener('click', handleEditReply);
}

if (commentList && commentList.childElementCount !== 0) init();
