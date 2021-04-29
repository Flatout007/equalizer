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
        this.handleAudioFile();
    }


    handleConrols() {
        document.querySelector("#volume").addEventListener("change", (e) => {
            this.audio.volume = e.currentTarget.value / 100;
        })
    }


    handleCanvas() {
        let context = new AudioContext();
        let src = context.createMediaElementSource(this.audio);
        let analyser = context.createAnalyser();


        let gainParam = -40.0;
        let bandTypes = [360, 3600];
        let gainOutput = context.createGain();


        // high 
        let highEq = context.createBiquadFilter();
        highEq.type = "lowshelf";
        highEq.frequency.value = bandTypes[0];
        highEq.gain.value = gainParam;
        let highBand = context.createGain();
        highBand.gain.value = -1.0;
        src.connect(highEq);       
        highEq.connect(highBand);
        let highGain = context.createGain();
        highEq.connect(highGain);
        highGain.connect(gainOutput);


        //low
        let lowEq = context.createBiquadFilter();
        lowEq.type = 'highshelf';
        lowEq.frequency.value = bandTypes[1];
        lowEq.gain.value = gainParam;
        let lowBand = context.createGain();
        lowBand.gain.value = -1.0;
        src.connect(lowEq);
        lowEq.connect(lowBand);
        let lowGain = context.createGain();
        lowEq.connect(lowGain);
        lowGain.connect(gainOutput);


        //mid
        let midEq = context.createGain();
        src.connect(midEq);
        highEq.connect(midEq);
        lowEq.connect(midEq);
        let midGain = context.createGain();
        midEq.connect(midGain);
        midGain.connect(gainOutput);


        // gain aggregate
        gainOutput.connect(context.destination);


        src.connect(analyser);
        analyser.connect(context.destination); 
        analyser.fftSize = 256;


        document.querySelector("#high").addEventListener("change", (e) => {
            highGain.gain.value = parseFloat(e.currentTarget.value / 100.0);
        })


        document.querySelector("#low").addEventListener("change", (e) => {
            lowGain.gain.value = parseFloat(e.currentTarget.value / 100.0);
        })


        document.querySelector("#mid").addEventListener("change", (e) => {
            midGain.gain.value = parseFloat(e.currentTarget.value / 100.0);
        })


        canvas.width = window.innerWidth / 4;
        canvas.height = window.innerHeight / 4;
        let ctx = canvas.getContext("2d");


        let binCount = analyser.frequencyBinCount;
        let audioBuffers = new Uint8Array(binCount);
        let thicknessAmount = ( canvas.width / binCount) * 2.5; // # => controls buffer thickness
        

        const render = () => {
            requestAnimationFrame(render);
            let bufferWidth = 0;
            analyser.getByteFrequencyData(audioBuffers);
            ctx.fillStyle = "#000"; // => controls canvas background color
            ctx.fillRect(0, 0, canvas.width , canvas.height ); // => controls height and width of canvas background


            for(let i = 0; i < binCount; i++) {
                let r = audioBuffers[i] + (2.5 * (i / binCount));
                let g = 200;
                let b = 90 + i;
         
                
                ctx.fillStyle = "rgb(" + r + "," + g + "," + b + ")";
                ctx.fillRect(bufferWidth - 100, canvas.height - audioBuffers[i], thicknessAmount, audioBuffers[i]);
                bufferWidth += thicknessAmount + 1;
            }
        }


        return render();
    }


    handleAudioFile() {
        this.file.addEventListener('change', (e) => {
            this.audio.src = URL.createObjectURL(this.file.files[0]);
            this.handleConrols();
            this.audio.load();
            this.audio.play();
            this.handleCanvas();
            
        })
    }


}



