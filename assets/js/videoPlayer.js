import { playtimeFormatter } from './videoPlayTimeFormat';

const videoPlayer = document.getElementById('jsVideoPlayer');
const video = document.getElementById('jsVideo');
const playBtn = document.getElementById('jsPlayBtn');
const volumeBtn = document.getElementById('jsVolumeBtn');
const volumeBar = document.getElementById('jsVolumeBar');
const fullScreenBtn = document.getElementById('jsFullScreenBtn');
const totalTimeSpan = document.getElementById('jsTotalTime');
const currentTimeSpan = document.getElementById('jsCurrentTime');
let player; //setInterval : print currentTime 
let restart = false;

// Register video view
const registerView = () => {
    const id = window.location.pathname.split('/')[2]
    // console.log(id);
    fetch(`/api/${id}/view`, { method: 'POST' });
}

function handleVolumeBtn() {
    const currentVolume = video.volume;
    console.log(currentVolume);
    if (video.muted) {
        video.muted = false;
        if (currentVolume >= 0.6) {
            volumeBtn.innerHTML = '<i class="fas fa-volume-up"></i>';
        }
        else if (currentVolume >= 0.2) {
            volumeBtn.innerHTML = '<i class="fas fa-volume-down"></i>';
        }
        else if (currentVolume > 0) {
            volumeBtn.innerHTML = '<i class="fas fa-volume-off"></i>';
        }
        else {
            volumeBtn.innerHTML = '<i class="fas fa-volume-mute"></i>';
        }
        volumeBar.value = currentVolume;
    }
    else {
        video.muted = true;
        volumeBtn.innerHTML = '<i class="fas fa-volume-mute"></i>';
        volumeBar.value = 0;
        video.volumn = currentVolume;
    }
}

function handleVolumeBar(e) {
    const currentVolume = e.target.value;
    console.log(currentVolume);
    video.volume = currentVolume;
    if (currentVolume >= 0.6) {
        volumeBtn.innerHTML = '<i class="fas fa-volume-up"></i>';
    }
    else if (currentVolume >= 0.2) {
        volumeBtn.innerHTML = '<i class="fas fa-volume-down"></i>';
    }
    else if (currentVolume > 0) {
        volumeBtn.innerHTML = '<i class="fas fa-volume-off"></i>';
    }
    else {
        volumeBtn.innerHTML = '<i class="fas fa-volume-mute"></i>';
    }
}

function handleVideoPlay() {
    if (video.paused) {
        if (restart) {
            currentTimeSpan.innerHTML = '00:00:00 / ';  //initialization
            restart = false;
        }
        video.play();
        playBtn.innerHTML = '<i class="fas fa-pause"></i>'
    }
    else {
        video.pause();
        playBtn.innerHTML = '<i class="fas fa-play"></i>';
    }
}

function handleExitScreen() {
    document.exitFullscreen();
    fullScreenBtn.removeEventListener('click', handleExitScreen);
    fullScreenBtn.innerHTML = '<i class="fas fa-expand"></i>';
    fullScreenBtn.addEventListener('click', handleFullScreen);
}

function handleFullScreen() {
    videoPlayer.requestFullscreen();
    fullScreenBtn.removeEventListener('click', handleFullScreen);
    fullScreenBtn.innerHTML = '<i class="fas fa-compress"></i>';
    fullScreenBtn.addEventListener('click', handleExitScreen);
}

function handlePlaytime() {
    const totalPlaytime = playtimeFormatter(video.duration);
    totalTimeSpan.innerHTML = totalPlaytime;
    let currentPlaytime;
    player = setInterval(() => {
        currentPlaytime = playtimeFormatter(video.currentTime)
        currentTimeSpan.innerHTML = `${currentPlaytime} / `;
    }, 900);
}

function handleEndtime() {
    registerView();
    // clearInterval(player);
    playBtn.innerHTML = '<i class="fas fa-undo-alt"></i>';
    restart = true;
}

function init() {
    playBtn.addEventListener('click', handleVideoPlay);
    video.addEventListener('click', handleVideoPlay);
    volumeBtn.addEventListener('click', handleVolumeBtn);
    volumeBar.addEventListener('input', handleVolumeBar);
    fullScreenBtn.addEventListener('click', handleFullScreen);
    video.addEventListener('loadedmetadata', handlePlaytime);
    video.addEventListener('ended', handleEndtime);
}

if (videoPlayer) {
    init();
}
