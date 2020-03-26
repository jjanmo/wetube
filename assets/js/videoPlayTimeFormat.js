// const videoPlayer = document.getElementById('jsVideoPlayer');
export const playtimeFormatter = playtime => {
    let hour, min, sec;
    if (playtime >= 3600) {
        //hour:min:sec
        hour = Math.floor(playtime / 3600);
        const tmp = playtime % 3600;
        min = Math.floor(tmp / 60);
        sec = tmp % 60;
        return `${hour}:${min < 10 ? `0${min}` : min}:${sec < 10 ? `0${sec}` : sec}`;
    } else if (playtime >= 60) {
        //min:sec
        min = Math.floor(playtime / 60);
        sec = Math.floor(playtime % 60);
        return `00:${min < 10 ? `0${min}` : min}:${sec < 10 ? `0${sec}` : sec}`;
    } else {
        //sec
        sec = Math.floor(playtime);
        return `00:00:${sec < 10 ? `0${sec}` : sec}`;
    }
};

// function init() {
//     playtimeFormatter();

// }

// if (videoPlayer) {
//     init();
// }
