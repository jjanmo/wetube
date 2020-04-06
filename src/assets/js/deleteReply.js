import axios from 'axios';
import { parseUser } from './changeVideoLiking';
import { addMessageModal } from './addMessageModal';

const commentList = document.getElementById('jsCommentList');
let userId,
    replyId,
    replyBlock, //li tag
    commentId;

// replyDisplayBox,
// replyEditBox,
// replyEditForm,
// replyEditInput,
// replyEditCancelBtn,
// replyEditSaveBtn;

function deleteReplyInPage() {
    replyBlock.remove();
}

function minusReplyCount() {
    const commentBlock = document.getElementById(`${commentId}`);
    let replyCount = Number(commentBlock.querySelector('#jsReplyCnt').textContent);
    replyCount--;
    commentBlock.querySelector('#jsReplyCnt').textContent = replyCount;
}

async function deleteReply() {
    const response = await axios({
        method: 'post',
        url: `/api/${replyId}/delete-reply`,
        data: {
            commentId
        }
    });
    if (response.status === 200) {
        deleteReplyInPage();
        minusReplyCount();
        addMessageModal('Reply', 'Deleted');
    }
}

function handleDeleteReply(e) {
    userId = parseUser(); //get userId
    const target = e.target; //replyDelete button
    if (userId && target.className.includes('deleteReply')) {
        replyId = target.dataset.id;
        replyBlock = document.getElementById(`${replyId}`); //li tag
        commentId = replyBlock.parentElement.parentElement.parentElement.parentElement.id;
        deleteReply();

        // replyDisplayBox = target.parentElement.parentElement.parentElement;
        // replyEditBox = replyDisplayBox.nextSibling;
        // replyEditForm = replyEditBox.firstChild;
        // replyEditInput = replyEditBox.firstChild.firstChild;
        // replyEditCancelBtn = replyEditBox.querySelector('#jsReplyEditCancelBtn');
        // replyEditSaveBtn = replyEditBox.querySelector('#jsReplyEditSaveBtn');
        // //add eventlistener
        // replyEditCancelBtn.addEventListener('click', closeEditBox);
        // replyEditSaveBtn.addEventListener('submit', handleSaveEditReply);
        // replyEditForm.addEventListener('submit', handleSaveEditReply);
        // //console.log(replyEditBox, replyEditInput, replyEditCancelBtn, replyEditSaveBtn);
        // showEditBox();
    }
}

function init() {
    commentList.addEventListener('click', handleDeleteReply);
}

if (commentList && commentList.childElementCount !== 0) init();
