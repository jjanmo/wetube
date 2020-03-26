import axios from 'axios';
import { parseUser } from './changeVideoLiking';

const commentList = document.getElementById('jsCommentList');

let userId, commentId, commentBlock, replyFormBox, replyForm, replyListBox, replySaveButton, replyCancelButton;

function toggleReplyform(replyForm) {
    replyForm.classList.toggle('hidden');
}

function plusReplyCount() {
    let replyCount = Number(commentBlock.querySelector('#jsReplyCnt').textContent);
    replyCount++;
    commentBlock.querySelector('#jsReplyCnt').textContent = replyCount;
}

function handleReplyCancel() {
    replyFormBox.classList.add('hidden');
}

function paintReply(data) {
    const li = document.createElement('li');
    li.dataset.id = data.replyId;
    replyListBox.append(li);

    const div1 = document.createElement('div');
    li.append(div1);
    const img = document.createElement('img');
    img.src = data.avatarUrl;
    div1.append(img);

    const div2 = document.createElement('div');
    li.append(div2);
    const nameSpan = document.createElement('span');
    nameSpan.classList.add('name');
    nameSpan.textContent = data.name;
    div2.append(nameSpan);

    const dateSpan = document.createElement('span');
    dateSpan.classList.add('date');
    dateSpan.textContent = data.date;
    div2.append(dateSpan);

    const div3 = document.createElement('div');
    li.append(div3);
    const textSpan = document.createElement('span');
    textSpan.classList.add('replyText');
    textSpan.textContent = data.text;
    div3.append(textSpan);

    const div4 = document.createElement('div');
    li.append(div4);

    const replyEditBtn = document.createElement('span');
    replyEditBtn.classList.add('editBtn');
    replyEditBtn.innerHTML = '<i class="fas fa-pencil-alt edit"></i>';
    div4.append(replyEditBtn);

    const replyDeleteBtn = document.createElement('span');
    replyDeleteBtn.classList.add('deleteBtn');
    replyDeleteBtn.innerHTML = '<i class="fas fa-minus-circle delete"></i>';
    div4.append(replyDeleteBtn);
}

async function sendReply(text) {
    const response = await axios({
        method: 'post',
        url: `/api/${commentId}/add-reply`,
        data: {
            userId,
            text
        }
    });
    if (response.status === 200) {
        console.log(response.data);
        paintReply(response.data);
        toggleReplyform(replyFormBox);
        plusReplyCount();
    }
}

function handleReplySubmit(e) {
    e.preventDefault();
    const replyText = replyForm.querySelector('input').value;
    if (!replyText) return; //double check
    sendReply(replyText);
    replyForm.querySelector('input').value = '';
}

function handleReply(e) {
    userId = parseUser(); //get userId
    const target = e.target;
    if (userId && target.className.includes('fa-reply')) {
        commentId = target.parentElement.parentElement.parentElement.dataset.id; //commentId
        commentBlock = document.getElementById(`${commentId}`); //commentBlock
        //show replyForm
        replyFormBox = target.parentElement.parentElement.parentElement.parentElement.nextSibling.nextSibling;
        toggleReplyform(replyFormBox);
        //replyForm
        replyForm = replyFormBox.firstChild.nextSibling;
        //replylist > ul tag
        replyListBox =
            target.parentElement.parentElement.parentElement.parentElement.nextSibling.nextSibling.nextSibling.firstChild;
        //add event listener
        if (commentBlock) {
            replySaveButton = commentBlock.querySelector('#jsReplySaveBtn');
            replySaveButton.addEventListener('submit', handleReplySubmit);
            replyForm.addEventListener('submit', handleReplySubmit);
            replyCancelButton = commentBlock.querySelector('#jsReplyCancelBtn');
            replyCancelButton.addEventListener('click', handleReplyCancel);
        }
    }
}

function init() {
    commentList.addEventListener('click', handleReply);
}

if (commentList && commentList.childElementCount !== 0) init();
