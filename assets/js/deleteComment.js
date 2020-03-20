import axios from 'axios';

const deleteBtn = document.getElementById('jsDeleteBtn');

function deleteCommentInPage() {
    const commentBlock = deleteBtn.parentElement.parentElement.parentElement;
    console.log(commentBlock);
    commentBlock.remove();
}

function minusViewCount() {
    const commentCountSpan = document.getElementById('jsCommnetCount');
    let commentCount = Number(commentCountSpan.textContent);
    commentCount--;
    document.getElementById('jsCommnetCount').textContent = commentCount;
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
        deleteCommentInPage();
        minusViewCount();
    }
}

export function handleDelete() {
    const commentId = deleteBtn.dataset.id;
    deleteData(commentId);
}

function init() {
    deleteBtn.addEventListener('click', handleDelete);
}

if (deleteBtn) {
    init();
}
