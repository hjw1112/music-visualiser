// script.js

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

const themes = {
    retro: { background: "#000000", barColor: "rgb(255, 165, 0)" },
    cyberpunk: { background: "#1a1a2e", barColor: "rgb(173, 0, 255)" },
    lofi: { background: "#f5f5dc", barColor: "rgb(150, 75, 0)" },
    classical: { background: "#ffffff", barColor: "rgb(0, 0, 139)" },
};

function setTheme(theme) {
    const { background, barColor } = themes[theme];
    canvas.style.backgroundColor = background;
    canvasContext.barColor = barColor;
}

themeSelector.addEventListener("change", () => {
    setTheme(themeSelector.value);
});

// Function to play demo sounds
function playDemoSound(filePath) {
    const audio = new Audio(filePath);
    visualizeAudioElement(audio);
}

// Toggle the demo sounds section visibility
libraryButton.addEventListener("click", () => {
    const demoSoundSection = document.getElementById("demo-sounds");
    demoSoundSection.style.display =
        demoSoundSection.style.display === "none" ? "block" : "none";
});

// Visualize microphone input
microphoneButton.addEventListener("click", async () => {
    try {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        visualizeAudioStream(stream);
    } catch (error) {
        alert("Error accessing microphone: " + error.message);
    }
});

// Visualize uploaded audio file
uploadButton.addEventListener("click", () => {
    audioUpload.click();
});

audioUpload.addEventListener("change", (event) => {
    const file = event.target.files[0];
    if (file) {
        const fileReader = new FileReader();
        fileReader.onload = () => {
            const audio = new Audio(fileReader.result);
            visualizeAudioElement(audio);
        };
        fileReader.readAsDataURL(file);
    }
});

// Function to visualize an audio element
function visualizeAudioElement(audio) {
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
            canvasContext.fillStyle = canvasContext.barColor || "rgb(255, 255, 255)";
            canvasContext.fillRect(x, canvas.height - barHeight, barWidth, barHeight);
            x += barWidth + 1;
        }

        requestAnimationFrame(draw);
    }

    draw();
}

// Function to visualize audio stream (microphone)
function visualizeAudioStream(stream) {
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
            canvasContext.fillStyle = canvasContext.barColor || "rgb(255, 255, 255)";
            canvasContext.fillRect(x, canvas.height - barHeight, barWidth, barHeight);
            x += barWidth + 1;
        }

        requestAnimationFrame(draw);
    }

    draw();
}
