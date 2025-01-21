const themeSelector = document.getElementById("theme-selector");
const libraryButton = document.getElementById("library-button");
const microphoneButton = document.getElementById("microphone-button");
const uploadButton = document.getElementById("upload-button");
const audioUpload = document.getElementById("audio-upload");
const canvas = document.getElementById("visualization-canvas");
const canvasContext = canvas.getContext("2d");

canvas.width = window.innerWidth * 0.8;
canvas.height = 400;

let audioContext, analyzer, source;

function visualizeAudio(stream) {
    audioContext = new (window.AudioContext || window.webkitAudioContext)();
    analyzer = audioContext.createAnalyser();
    source = audioContext.createMediaStreamSource(stream);

    source.connect(analyzer);
    analyzer.fftSize = 256;

    const bufferLength = analyzer.frequencyBinCount;
    const dataArray = new Uint8Array(bufferLength);

    function draw() {
        canvasContext.clearRect(0, 0, canvas.width, canvas.height);
        analyzer.getByteFrequencyData(dataArray);

        const barWidth = (canvas.width / bufferLength) * 2.5;
        let x = 0;

        for (let i = 0; i < bufferLength; i++) {
            const barHeight = dataArray[i];
            canvasContext.fillStyle = `rgb(${barHeight + 100}, 50, 150)`;
            canvasContext.fillRect(x, canvas.height - barHeight, barWidth, barHeight);
            x += barWidth + 1;
        }

        requestAnimationFrame(draw);
    }

    draw();
}

libraryButton.addEventListener("click", () => {
    alert("Feature to choose music from library is under development.");
});

microphoneButton.addEventListener("click", async () => {
    try {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        visualizeAudio(stream);
    } catch (error) {
        alert("Error accessing microphone: " + error.message);
    }
});

uploadButton.addEventListener("click", () => {
    audioUpload.click();
});

audioUpload.addEventListener("change", (event) => {
    const file = event.target.files[0];
    if (file) {
        const fileReader = new FileReader();
        fileReader.onload = () => {
            const audio = new Audio(fileReader.result);
            audioContext = new (window.AudioContext || window.webkitAudioContext)();
            analyzer = audioContext.createAnalyser();

            const track = audioContext.createMediaElementSource(audio);
            track.connect(analyzer);
            analyzer.connect(audioContext.destination);

            analyzer.fftSize = 256;
            const bufferLength = analyzer.frequencyBinCount;
            const dataArray = new Uint8Array(bufferLength);

            audio.play();

            function draw() {
                canvasContext.clearRect(0, 0, canvas.width, canvas.height);
                analyzer.getByteFrequencyData(dataArray);

                const barWidth = (canvas.width / bufferLength) * 2.5;
                let x = 0;

                for (let i = 0; i < bufferLength; i++) {
                    const barHeight = dataArray[i];
                    canvasContext.fillStyle = `rgb(${barHeight + 100}, 50, 150)`;
                    canvasContext.fillRect(x, canvas.height - barHeight, barWidth, barHeight);
                    x += barWidth + 1;
                }

                requestAnimationFrame(draw);
            }

            draw();
        };

        fileReader.readAsDataURL(file);
    }
});
