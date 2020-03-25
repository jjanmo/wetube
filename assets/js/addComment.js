import axios from 'axios';

const commentContainer = document.getElementById('jsCommentContainer');
const commentForm = document.getElementById('jsCommentForm');
const commentSubmitBtn = document.getElementById('jsCommentSubmitBtn');
const commentCancelBtn = document.getElementById('jsCommentCancelBtn');

const commentList = document.getElementById('jsCommentList');

function makeCommentBlock(parsedInfo) {
    const commentBlock = document.createElement('div');
    commentBlock.classList.add('commentBlock');
    commentBlock.id = parsedInfo.commentId;

    //imageBox
    const imageBox = document.createElement('div');
    imageBox.classList.add('imageBox');
    const image = document.createElement('img');
    image.src = parsedInfo.avatarUrl;
    imageBox.append(image);
    commentBlock.append(imageBox);

    //right
    const right = document.createElement('div');
    right.classList.add('right');
    commentBlock.append(right);

    //displayBox
    const displayBox = document.createElement('div');
    displayBox.classList.add('displayBox');
    right.append(displayBox);

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
    displayBox.append(commentInfo);

    const content = document.createElement('div');
    content.classList.add('content');
    const text = document.createElement('p');
    text.textContent = parsedInfo.comment;
    content.append(text);
    displayBox.append(content);

    //buttonBox
    const buttonBox = document.createElement('div');
    buttonBox.classList.add('buttonBox');
    buttonBox.dataset.id = parsedInfo.commentId;

    //like comment button
    const like = document.createElement('span');
    like.classList.add('likeCommentBtn');
    const button1 = document.createElement('button');
    button1.innerHTML = '<i class="fas fa-heart like"></i>';
    const cnt = document.createElement('span');
    cnt.classList.add('cnt');
    cnt.textContent = '0';
    like.append(button1);
    like.append(cnt);
    buttonBox.append(like);

    //reply comment button
    const reply = document.createElement('span');
    reply.classList.add('replyCommentBtn');
    const button2 = document.createElement('button');
    button2.innerHTML = '<i class="fas fa-reply"></i>';
    reply.append(button2);
    buttonBox.append(reply);

    //edit button
    const editBtn = document.createElement('span');
    editBtn.classList.add('editCommentBtn');
    const button3 = document.createElement('button');
    button3.innerHTML = '<i class="fas fa-pencil-alt edit"></i>';
    editBtn.append(button3);
    buttonBox.append(editBtn);

    //delete button
    const deleteBtn = document.createElement('span');
    deleteBtn.classList.add('deleteBtn');
    deleteBtn.id = 'jsDeleteBtn';
    const button4 = document.createElement('button');
    button4.innerHTML = '<i class="fas fa-minus-circle delete"></i>';
    deleteBtn.append(button4);
    buttonBox.append(deleteBtn);
    //append boxes
    displayBox.append(buttonBox);
    commentList.append(commentBlock);
}

// Add comment

function plusViewCount() {
    const commentCountSpan = document.getElementById('jsCommentCount');
    let commentCount = Number(commentCountSpan.textContent);
    commentCount++;
    if (commentCount === 1) {
        document.getElementById('jsLiteralComment').textContent = ' Comment';
    } else {
        document.getElementById('jsLiteralComment').textContent = ' Comments';
    }
    document.getElementById('jsCommentCount').textContent = commentCount;
}

const sendComment = async comment => {
    const videoId = window.location.pathname.split('/')[2];
    const response = await axios({
        method: 'post',
        url: `/api/${videoId}/add-comment`,
        data: {
            comment
        }
    });
    if (response.status === 200) {
        //console.log(response.data);
        makeCommentBlock(response.data);
        plusViewCount();
    }
};

function handleSubmit(e) {
    e.preventDefault();
    const isLogged = commentForm.dataset.user;
    if (!isLogged) return;
    const commentInput = document.getElementById('jsCommentInput');
    const comment = commentInput.value;
    sendComment(comment);
    commentInput.value = '';
    commentInput.blur();
}

function handleCancel() {
    const commentInput = document.getElementById('jsCommentInput');
    commentInput.value = '';
    commentInput.blur();
}

function init() {
    commentForm.addEventListener('submit', handleSubmit);
    commentSubmitBtn.addEventListener('click', handleSubmit);
    commentCancelBtn.addEventListener('click', handleCancel);
}

if (commentContainer) {
    init();
}
