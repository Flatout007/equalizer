document.addEventListener('DOMContentLoaded', () => {
    const audioVisualizer = new AudioVisualizer();
    audioVisualizer.initialize();
}) 


class AudioVisualizer {
    constructor() {
        this.file = document.querySelector(".audio-file");
        this.audio = document.querySelector(".audio");
        this.canvas = document.getElementById('canvas');
    }


    initialize() {
        this.handleFile();
    }


    handleConrols() {
        document.querySelector("#volume-control").addEventListener("change", (e) => {
            this.audio.volume = e.currentTarget.value / 100;
        })
    }


    handleCanvas() {
        let context = new AudioContext();
        let src = context.createMediaElementSource(this.audio);
        let analyser = context.createAnalyser();


        src.connect(analyser);
        analyser.connect(context.destination);
        analyser.fftSize = 32;


        // this.canvas.style.width = '500px';
        // this.canvas.style.height = '1000px';
        let ctx = canvas.getContext("2d");


        let binCount = analyser.frequencyBinCount;
        let audioBuffers = new Uint8Array(binCount);
        let thicknessAmount = (canvas.width / binCount) * 2.5; // # => controls buffer thickness
        

        const render = () => {
            requestAnimationFrame(render);
            let bufferWidth = 0;
            analyser.getByteFrequencyData(audioBuffers);
            ctx.fillStyle = "#333"; // => controls canvas background color
            ctx.fillRect(0, 0, canvas.width, canvas.height); // => controls height and width of canvas background


            for(let i = 0; i < binCount; i++) {
                let r = audioBuffers[i] + (2.5 * (i / binCount));
                let g = 200;
                let b = 90 + i;

                ctx.fillStyle = "rgb(" + r + "," + g + "," + b + ")";
                ctx.fillRect(bufferWidth - 300, canvas.height- audioBuffers[i], thicknessAmount, audioBuffers[i]);
                bufferWidth += thicknessAmount + 1;
            }
        }


        return render();
    }


    handleFile() {
        this.file.addEventListener('change', (e) => {
            this.audio.src = URL.createObjectURL(this.file.files[0]);
            this.handleConrols();
            this.audio.load();
            this.audio.play();
            this.handleCanvas();
            
        })
    }


}


