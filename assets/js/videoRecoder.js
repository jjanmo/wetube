const recorderContainer = document.getElementById('jsRecorderContainer');
const videoPreview = document.getElementById('jsVideoPreview');
const recorderBtn = document.getElementById('jsRecorderBtn');

let streamObject;
let videoRecorder;

const handleVideoData = e => {
    console.log(e);
    const { data: videoFile } = event;
    const link = document.createElement('a');
    link.href = URL.createObjectURL(videoFile);
    link.download = 'recorded.webm';
    document.body.appendChild(link);
    link.click();
};

const startRecording = () => {
    videoRecorder = new MediaRecorder(streamObject);
    videoRecorder.start();
    videoRecorder.addEventListener('dataavailable', handleVideoData);
    recorderBtn.addEventListener('click', stopRecording);
}

const stopRecording = () => {
    videoRecorder.stop();
    recorderBtn.removeEventListener('click', stopRecording);
    recorderBtn.addEventListener('click', getVideo);
    recorderBtn.innerHTML = 'START RECORDING';
}

const getVideo = async () => {
    try {
        const stream = await navigator.mediaDevices.getUserMedia({
            audio: true,
            video: { width: 1280, height: 720 }
        });
        if ('srcObject' in videoPreview) videoPreview.srcObject = stream;
        else videoPreview.src = window.URL.createObjectURL(stream);
        // videoPreview.muted = true;
        videoPreview.play();
        recorderBtn.innerHTML = 'STOP RECORDING';
        streamObject = stream;
        startRecording();
    } catch (error) {
        console.log(error);
        recorderBtn.innerHTML = 'Can NOT record'
    } finally {
        recorderBtn.removeEventListener('click', startRecording);
    }
}

function init() {
    recorderBtn.addEventListener('click', getVideo);
}


if (recorderContainer) {
    init();
}