const profileContainer = document.getElementById('jsProfileContainer');
const uploadedVideosBtn = document.getElementById('jsUploadedVideosBtn');
const likedVideosBtn = document.getElementById('jsLikedVideosBtn');
const uploadedVideosBox = document.getElementById('jsUploadedVideoBox');
const likedVideosBox = document.getElementById('jsLikedVideoBox');
const addProfileArtBtn = document.getElementById('jsAddProfileArtBtn');
const addProfileArtForm = document.getElementById('jsAddProfileArtForm');

function handleUploadedVideos() {
    uploadedVideosBtn.firstElementChild.classList.add('selected');
    likedVideosBtn.firstElementChild.classList.remove('selected');
    uploadedVideosBox.classList.remove('hidden');
    likedVideosBox.classList.add('hidden');
}
function handleLikedVideos() {
    likedVideosBtn.firstElementChild.classList.add('selected');
    uploadedVideosBtn.firstElementChild.classList.remove('selected');
    uploadedVideosBox.classList.add('hidden');
    likedVideosBox.classList.remove('hidden');
}

function showAddForm() {
    addProfileArtForm.classList.remove('hidden');
}

function hideAddForm() {
    addProfileArtForm.classList.add('hidden');
}

function init() {
    uploadedVideosBtn.addEventListener('click', handleUploadedVideos);
    likedVideosBtn.addEventListener('click', handleLikedVideos);
    if (addProfileArtBtn) addProfileArtBtn.addEventListener('click', showAddForm);
    if (addProfileArtForm) {
        const addProfileArtCancelBtn = addProfileArtForm.querySelector('.cancelBtn');
        addProfileArtCancelBtn.addEventListener('click', hideAddForm);
    }
}

if (profileContainer) init();
