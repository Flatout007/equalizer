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
        // document.querySelector("#volume-control").addEventListener("change", (e) => {
        //     this.audio.volume = e.currentTarget.value / 100;
        // })
    }


    handleCanvas() {
        let context = new AudioContext();
        let src = context.createMediaElementSource(this.audio);
        let analyser = context.createAnalyser();
        let gainParam = -39.0;
        let bandType = [360, 3600];
        let highEq = context.createBiquadFilter();

        highEq.type = "lowshelf";
        highEq.frequency.value = bandType[0];
        highEq.gain.value = gainParam;

        let highBand = context.createGain();
        highBand.gain.value = -1.0;
        src.connect(highEq);       
        highEq.connect(highBand);
        
        let highGain = context.createGain();

        highEq.connect(highGain);
        let gainOutput = context.createGain();
        
        highGain.connect(gainOutput);
        gainOutput.connect(context.destination);


        
        src.connect(analyser);
        analyser.connect(context.destination); 
        analyser.fftSize = 256;

        
        

        // document.querySelector("#volume-control").addEventListener("change", (e) => {
        //     highGain.gain.value = e.currentTarget.value / 100;
        // })

        
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
         
                let myheight = audioBuffers[i]

                ctx.fillStyle = "rgb(" + r + "," + g + "," + b + ")";
                ctx.fillRect(bufferWidth, canvas.height - myheight, thicknessAmount, myheight);
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



