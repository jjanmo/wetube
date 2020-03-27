import { playtimeFormatter } from './videoPlayTimeFormat';
import getBlobDuration from 'get-blob-duration';

const videoPlayer = document.getElementById('jsVideoPlayer');
const video = document.getElementById('jsVideo');
const videoController = document.getElementById('jsVideoController');
const playBtn = document.getElementById('jsPlayBtn');
const volumeBtn = document.getElementById('jsVolumeBtn');
const volumeBar = document.getElementById('jsVolumeBar');
const fullScreenBtn = document.getElementById('jsFullScreenBtn');
const totalTimeSpan = document.getElementById('jsTotalTime');
const currentTimeSpan = document.getElementById('jsCurrentTime');
const progressBar = document.getElementById('jsProgressBar');
const filledBar = document.getElementById('jsFilledBar');
const backwardBtn = document.getElementById('jsBackwardBtn');
const forwardBtn = document.getElementById('jsForwardBtn');

let player; //setInterval : print currentTime
let restart = false;
let hideTimer = null;

// Register video view
const registerView = () => {
    const id = window.location.pathname.split('/')[2];
    // console.log(id);
    fetch(`/api/${id}/view`, { method: 'POST' });
};

function handleVolumeBtn() {
    const currentVolume = video.volume;
    if (video.muted) {
        video.muted = false;
        if (currentVolume >= 0.6) {
            volumeBtn.innerHTML = '<i class="fas fa-volume-up"></i>';
        } else if (currentVolume >= 0.3) {
            volumeBtn.innerHTML = '<i class="fas fa-volume-down"></i>';
        } else if (currentVolume > 0) {
            volumeBtn.innerHTML = '<i class="fas fa-volume-off"></i>';
        } else {
            video.volume = 1;
            volumeBar.value = video.volume;
            volumeBtn.innerHTML = '<i class="fas fa-volume-up"></i>';
            return;
        }
        volumeBar.value = currentVolume;
    } else {
        video.muted = true;
        volumeBtn.innerHTML = '<i class="fas fa-volume-mute"></i>';
        volumeBar.value = 0;
        video.volume = currentVolume;
    }
}

function handleVolumeBar(e) {
    const currentVolume = Number(e.target.value);
    video.volume = currentVolume;
    if (currentVolume >= 0.6) {
        volumeBtn.innerHTML = '<i class="fas fa-volume-up"></i>';
    } else if (currentVolume >= 0.3) {
        volumeBtn.innerHTML = '<i class="fas fa-volume-down"></i>';
    } else if (currentVolume > 0) {
        volumeBtn.innerHTML = '<i class="fas fa-volume-off"></i>';
    } else {
        volumeBtn.innerHTML = '<i class="fas fa-volume-mute"></i>';
        video.muted = true;
    }
}

function handleVideoPlay() {
    if (video.paused) {
        if (restart) {
            currentTimeSpan.innerHTML = '00:00:00 / '; //initialization
            restart = false;
        }
        video.play();
        playBtn.innerHTML = '<i class="fas fa-pause"></i>';
    } else {
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

async function handlePlaytime() {
    const blob = await fetch(video.src).then(response => response.blob());
    const duration = await getBlobDuration(blob);
    const totalPlaytime = playtimeFormatter(duration);
    totalTimeSpan.innerHTML = totalPlaytime;
    let currentPlaytime;
    player = setInterval(() => {
        currentPlaytime = playtimeFormatter(video.currentTime);
        currentTimeSpan.innerHTML = `${currentPlaytime} / `;
    }, 1000);
}

function handleEndtime() {
    registerView();
    // clearInterval(player);
    playBtn.innerHTML = '<i class="fas fa-undo-alt"></i>';
    restart = true;
}

function handlePlaybarUpdate() {
    const barWidth = `${(video.currentTime / video.duration) * 100}%`;
    filledBar.style.width = barWidth;
}

function handleSkip(e) {
    const skipTime = e.currentTarget.dataset.skip;
    video.currentTime += Number(skipTime);
}

function handlePlaybar(e) {
    //change bar
    const barWidth = e.offsetX / progressBar.offsetWidth;
    filledBar.style.width = `${barWidth * 100}%`;
    //change current time
    video.currentTime = Math.floor(video.duration * barWidth);
    currentTimeSpan.innerHTML = `${playtimeFormatter(video.currentTime)} / `;
}

function handleMouseover() {
    videoController.style.opacity = 1;
}

function handleMouseout() {
    if (video.paused) {
        videoController.style.opacity = 1;
    } else {
        videoController.style.opacity = 0;
    }
}

function handleMousemove(e) {
    if (video.paused) {
        video.style.cursor = 'default';
    } else {
        const target = e.target;
        video.style.cursor = 'default';
        if (target === video) {
            handleMouseover();
        }
        window.clearTimeout(hideTimer);
        hideTimer = window.setTimeout(function() {
            video.style.cursor = 'none';
            if (target === video) {
                handleMouseout();
            }
        }, 1500);
    }
}

function init() {
    //play&pause
    playBtn.addEventListener('click', handleVideoPlay);
    video.addEventListener('click', handleVideoPlay);
    //volume
    volumeBtn.addEventListener('click', handleVolumeBtn);
    volumeBar.addEventListener('input', handleVolumeBar);
    //fullscreen
    fullScreenBtn.addEventListener('click', handleFullScreen);
    //playtime
    video.addEventListener('loadedmetadata', handlePlaytime);
    video.addEventListener('ended', handleEndtime);
    //update progressbar(playbar)
    video.addEventListener('timeupdate', handlePlaybarUpdate);
    //click progressbar(playbar)
    progressBar.addEventListener('click', handlePlaybar);
    //skip
    backwardBtn.addEventListener('click', handleSkip);
    forwardBtn.addEventListener('click', handleSkip);
    //mouse hover -> disappear
    document.addEventListener('mousemove', handleMousemove);
    //hover & out
    videoPlayer.addEventListener('mouseover', handleMouseover);
    videoPlayer.addEventListener('mouseout', handleMouseout);
}

if (videoPlayer) {
    init();
}
