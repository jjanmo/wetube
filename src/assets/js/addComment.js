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
    commentList.append(commentBlock);

    //imageBox
    const imageBox = document.createElement('div');
    imageBox.classList.add('imageBox');
    const image1 = document.createElement('img');
    image1.src = parsedInfo.avatarUrl;
    imageBox.append(image1);
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
    const link = document.createElement('a');
    link.href = `/users/${parsedInfo.creatorId}`;
    link.textContent = parsedInfo.name;
    name.append(link);

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
    const cnt1 = document.createElement('span');
    cnt1.classList.add('cnt');
    cnt1.id = 'jsLikeCommentCnt';
    cnt1.textContent = '0';
    like.append(button1);
    like.append(cnt1);
    buttonBox.append(like);

    //reply comment button
    const reply = document.createElement('span');
    reply.classList.add('replyCommentBtn');
    const button2 = document.createElement('button');
    button2.innerHTML = '<i class="fas fa-reply"></i>';
    const cnt2 = document.createElement('span');
    cnt2.classList.add('cnt');
    cnt2.id = 'jsReplyCnt';
    cnt2.textContent = '0';
    reply.append(button2);
    reply.append(cnt2);
    buttonBox.append(reply);

    //edit button
    const editBtn = document.createElement('span');
    editBtn.classList.add('editCommentBtn');
    const button3 = document.createElement('button');
    button3.innerHTML = '<i class="fas fa-pencil-alt editComment"></i>';
    editBtn.append(button3);
    buttonBox.append(editBtn);

    //delete button
    const deleteBtn = document.createElement('span');
    deleteBtn.classList.add('deleteBtn');
    deleteBtn.id = 'jsDeleteBtn';
    const button4 = document.createElement('button');
    button4.innerHTML = '<i class="fas fa-minus-circle deleteComment"></i>';
    deleteBtn.append(button4);
    buttonBox.append(deleteBtn);
    displayBox.append(buttonBox);

    //editBox
    const editBox = document.createElement('div');
    editBox.classList.add('editBox');
    editBox.classList.add('hidden');
    right.append(editBox);

    //editForm
    const editForm = document.createElement('form');
    editForm.id = 'jsEditCommentForm';
    editBox.append(editForm);

    //editInput
    const editInput = document.createElement('input');
    editInput.id = 'jsEditCommentInput';
    editInput.type = 'text';
    editInput.name = 'comment';
    editInput.autocomplete = 'off';
    editInput.required;
    editForm.append(editInput);

    //editBtnBox
    const editBtnBox = document.createElement('div');
    editBtnBox.classList.add('editBtnBox');
    editForm.append(editBtnBox);

    //buttons
    const button5 = document.createElement('button');
    button5.id = 'jsEditCommentCancelBtn';
    button5.type = 'button';
    button5.textContent = 'CANCEL';
    editBtnBox.append(button5);

    const button6 = document.createElement('button');
    button6.id = 'jsEditCommentSaveBtn';
    button6.textContent = 'REPLY';
    editBtnBox.append(button6);

    //replyFormBox
    const replyFormBox = document.createElement('div');
    replyFormBox.classList.add('replyFormBox');
    replyFormBox.classList.add('hidden');
    right.append(replyFormBox);

    //imgDiv
    const imgDiv = document.createElement('div');
    imgDiv.classList.add('imgDiv');
    replyFormBox.append(imgDiv);
    const image2 = document.createElement('img');
    image2.src = parsedInfo.avatarUrl;
    imgDiv.append(image2);

    //replyForm
    const replyForm = document.createElement('form');
    replyForm.id = 'jsReplyForm';
    replyFormBox.append(replyForm);

    //replyInput
    const replyInput = document.createElement('input');
    replyInput.id = 'jsReplyInput';
    replyInput.type = 'text';
    replyInput.name = 'reply';
    replyInput.autocomplete = 'off';
    replyInput.required;
    replyInput.placeholder = 'Add a public reply.....';
    replyForm.append(replyInput);

    //buttons
    const replyBtnBox = document.createElement('div');
    replyBtnBox.classList.add('replyBtnBox');
    replyForm.append(replyBtnBox);

    const button7 = document.createElement('button');
    button7.id = 'jsReplyCancelBtn';
    button7.type = 'button';
    button7.textContent = 'CANCEL';
    replyBtnBox.append(button7);

    const button8 = document.createElement('button');
    button8.id = 'jsReplySaveBtn';
    button8.textContent = 'REPLY';
    replyBtnBox.append(button8);

    //replyListBox
    const replyListBox = document.createElement('div');
    replyListBox.classList.add('replyListBox');
    right.append(replyListBox);

    //ul
    const ul = document.createElement('ul');
    replyListBox.append(ul);
}

// Add comment

function plusCommentCount() {
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
        plusCommentCount();
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
    commentSubmitBtn.addEventListener('submit', handleSubmit);
    commentCancelBtn.addEventListener('click', handleCancel);
}

if (commentContainer) {
    init();
}
