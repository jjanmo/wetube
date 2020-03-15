import axios from 'axios';

const user = document.getElementById('jsHiddenInput');
const commentContainer = document.getElementById('jsCommentContainer');
const commentForm = document.getElementById('jsCommentForm');
const commentSubmitBtn = document.getElementById('jsCommentSubmitBtn')
const commentList = document.getElementById('jsCommentList');


function makeCommentBlock(parsedInfo) {
    const commentBlock = document.createElement('div');
    commentBlock.classList.add('commentBlock');
    const imageBox = document.createElement('div');
    imageBox.classList.add('imageBox');
    const image = document.createElement('img');
    image.src = parsedInfo.avatarUrl;
    imageBox.append(image);
    commentBlock.append(imageBox);
    const rightBox = document.createElement('div');
    rightBox.classList.add('rightBox')
    commentBlock.append(rightBox);
    const commentInfo = document.createElement('div');
    commentInfo.classList.add('commentInfo');
    const name = document.createElement('span');
    name.classList.add('name');
    name.textContent = parsedInfo.name;
    const date = document.createElement('span');
    date.classList.add('date');
    date.textContent = parsedInfo.date;
    commentInfo.append(name);
    commentInfo.append(date);
    rightBox.append(commentInfo);
    const content = document.createElement('div');
    content.classList.add('content');
    const text = document.createElement('p');
    text.textContent = parsedInfo.comment;
    content.append(text);
    rightBox.append(content);
    const buttonBox = document.createElement('div');
    buttonBox.classList.add('buttonBox');
    const like = document.createElement('span');
    like.classList.add('like');
    like.id = 'jsCommentLikeBtn';
    const button1 = document.createElement('button');
    button1.innerHTML = '<i class="fas fa-thumbs-up"></i>';
    const cnt1 = document.createElement('span');
    cnt1.classList.add('cnt');
    cnt1.id = 'jsCommentLikeCount';
    cnt1.textContent = '0';
    like.append(button1);
    like.append(cnt1);
    buttonBox.append(like);
    const dislike = document.createElement('span');
    dislike.classList.add('dislike');
    dislike.id = 'jsCommentDislikeBtn';
    const button2 = document.createElement('button');
    button2.innerHTML = '<i class="fas fa-thumbs-down"></i>';
    const cnt2 = document.createElement('span');
    cnt2.classList.add('cnt');
    cnt2.id = 'jsCommentDislikeCount';
    cnt2.textContent = '0';
    dislike.append(button2);
    dislike.append(cnt2);
    buttonBox.append(dislike);
    const reply = document.createElement('span');
    reply.classList.add('reply');
    reply.id = 'jsReplyBtn';
    const button3 = document.createElement('button');
    button3.innerHTML = '<i class="fas fa-reply"></i>';
    reply.append(button3);
    buttonBox.append(reply);
    const _delete = document.createElement('span');
    _delete.classList.add('delete');
    _delete.id = 'jsDeleteBtn';
    const button4 = document.createElement('button');
    button4.innerHTML = '<i class="fas fa-minus-circle"></i>'
    _delete.append(button4);
    buttonBox.append(_delete);
    rightBox.append(buttonBox);
    commentList.append(commentBlock);
    changeViewCount();
}

function changeViewCount() {
    const commentCountSpan = document.getElementById('jsCommnetCount');
    let commentCount = Number(commentCountSpan.textContent);
    commentCount++;
    document.getElementById('jsCommnetCount').textContent = commentCount;
}

const sendComment = async (comment) => {
    const id = window.location.pathname.split('/')[2];
    const response = await axios({
        method: 'post',
        url: `/api/${id}/addComment`,
        data: {
            comment
        }
    });
    if (response.status === 200) {
        //console.log(response.data);
        makeCommentBlock(response.data);
    }
}


function handleSubmit(e) {
    e.preventDefault();
    if (!user.value) return
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