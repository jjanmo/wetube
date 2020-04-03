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
    li.id = data.replyId;
    replyListBox.append(li); // replyListBox == ul tag

    const replyDisplayBox = document.createElement('div');
    replyDisplayBox.classList.add('replyDisplayBox');
    li.append(replyDisplayBox);

    const div1 = document.createElement('div');
    replyDisplayBox.append(div1);
    const img = document.createElement('img');
    img.src = data.avatarUrl;
    div1.append(img);

    const div2 = document.createElement('div');
    replyDisplayBox.append(div2);
    const nameSpan = document.createElement('span');
    nameSpan.classList.add('name');
    const link = document.createElement('a');
    link.href = `/users/${data.creatorId}`;
    link.textContent = data.name;
    nameSpan.append(link);
    div2.append(nameSpan);

    const dateSpan = document.createElement('span');
    dateSpan.classList.add('date');
    dateSpan.textContent = data.date;
    div2.append(dateSpan);

    const div3 = document.createElement('div');
    replyDisplayBox.append(div3);
    const textSpan = document.createElement('span');
    textSpan.classList.add('replyText');
    textSpan.textContent = data.text;
    div3.append(textSpan);

    const div4 = document.createElement('div');
    replyDisplayBox.append(div4);

    const replyEditBtn = document.createElement('span');
    replyEditBtn.classList.add('editBtn');
    replyEditBtn.innerHTML = `<i class="fas fa-pencil-alt editReply" data-id=${data.replyId}></i>`;
    div4.append(replyEditBtn);

    const replyDeleteBtn = document.createElement('span');
    replyDeleteBtn.classList.add('deleteBtn');
    replyDeleteBtn.innerHTML = `<i class="fas fa-minus-circle deleteReply" data-id=${data.replyId}></i>`;
    div4.append(replyDeleteBtn);

    const replyEditBox = document.createElement('div');
    replyEditBox.classList.add('replyEditBox');
    replyEditBox.classList.add('hidden');
    li.append(replyEditBox);

    const replyEditForm = document.createElement('form');
    replyEditForm.id = 'jsReplyEditForm';
    replyEditBox.append(replyEditForm);

    const replyEditInput = document.createElement('input');
    replyEditInput.id = 'jsReplyEditInput';
    replyEditInput.type = 'text';
    replyEditInput.name = 'reply';
    replyEditInput.autocomplete = 'off';
    replyEditInput.required;
    replyEditForm.append(replyEditInput);

    const editBtnBox = document.createElement('div');
    editBtnBox.classList.add('editBtnBox');
    replyEditForm.append(editBtnBox);

    const button1 = document.createElement('button');
    button1.id = 'jsReplyEditCancelBtn';
    button1.type = 'button';
    button1.innerHTML = '<i class="far fa-times-circle cancel"></i>';
    editBtnBox.append(button1);

    const button2 = document.createElement('button');
    button2.id = 'jsReplyEditSaveBtn';
    button2.innerHTML = '<i class="far fa-check-circle save"></i>';
    editBtnBox.append(button2);
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
        //console.log(response.data);
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
