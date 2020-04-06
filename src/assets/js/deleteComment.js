import axios from 'axios';
import { addMessageModal } from './addMessageModal';

const commentContainer = document.getElementById('jsCommentContainer');

function deleteCommentInPage(commentBlock) {
    commentBlock.remove();
}

function minusCommentCount() {
    const commentCountSpan = document.getElementById('jsCommentCount');
    let commentCount = Number(commentCountSpan.textContent);
    commentCount--;
    if (commentCount < 0) {
        commentCount = 0;
        document.getElementById('jsLiteralComment').textContent = ' Comments';
    } else if (commentCount === 1) {
        document.getElementById('jsLiteralComment').textContent = ' Comment';
    } else {
        document.getElementById('jsLiteralComment').textContent = ' Comments';
    }
    document.getElementById('jsCommentCount').textContent = commentCount;
}

async function deleteData(commentId) {
    const videoId = document.getElementById('jsVideo').dataset.id;
    const userId = JSON.parse(document.getElementById('jsCommentForm').dataset.user)._id;
    const response = await axios({
        method: 'post',
        url: `/api/${commentId}/delete-comment`,
        data: {
            videoId,
            userId
        }
    });
    if (response.status === 200) {
        minusCommentCount();
        addMessageModal('Comment', 'Deleted');
    }
}

function handleDelete(e) {
    const target = e.target;
    if (target.className.includes('deleteComment')) {
        const commentId = target.parentElement.parentElement.parentElement.dataset.id;
        const commentBlock = document.getElementById(`${commentId}`);
        deleteData(commentId);
        deleteCommentInPage(commentBlock);
    }
}

function init() {
    commentContainer.addEventListener('click', handleDelete);
}

if (commentContainer) init();
