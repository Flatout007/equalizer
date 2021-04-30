document.addEventListener('DOMContentLoaded', () => {
    const audioVisualizer = new AudioVisualizer();
    audioVisualizer.initialize();
}) 


class AudioVisualizer {
    constructor() {
        this.file = document.querySelector(".audio-file");
        this.audio = document.querySelector(".audio");
        this.canvas = document.getElementById('canvas');
        this.eye = document.querySelector('.eye');
        this.travis = document.querySelector('.travis');
        this.theKill = document.querySelector('.mars');
        this.down = document.querySelector('.down');
        this.blinding = document.querySelector('.blinding');
        this.bed = document.querySelector('.bed');
        

        this.handleVideo = this.handleVideo.bind(this);
       
    }


    initialize() {
        this.handleFile();
        this.handleEyeOfTheTiger();
        this.handleTravisBarker();
        this.handleTheKill();
        this.handleSystemOfADown();
        this.handleWeeknd();
        this.handleRightSideOfTheBed();
        this.handleControls();
        
    }


    handleControls() {
        document.querySelector("#volume").addEventListener("change", (e) => {
            this.audio.volume = e.currentTarget.value / 100;
            this.eye.volume = e.currentTarget.value / 100;
            this.travis.volume = e.currentTarget.value / 100;
            this.theKill.volume = e.currentTarget.value / 100;
            this.down.volume = e.currentTarget.value / 100;
            this.blinding.volume = e.currentTarget.value / 100;
            this.bed.volume = e.currentTarget.value / 100;
        })


        let playButton = document.querySelector('.flex-list li:nth-child(1)');
        

        playButton.addEventListener('click', e => {
            if (!this.audio.paused && this.audio.currentTime > 0 && !this.audio.ended) {
                this.audio.pause();


                document.querySelector('.vid').style.display = 'none';
            }
            else if (this.audio.paused && this.audio.currentTime > 0) {

                this.audio.play();

                document.querySelector('.vid').style.display = 'block';
            }
        })

        playButton.addEventListener('click', e => {
            if (!this.blinding.paused && this.blinding.currentTime > 0 && !this.blinding.ended) {
                this.blinding.pause();


                document.querySelector('.vid').style.display = 'none';
            }
            else if (this.blinding.paused && this.blinding.currentTime > 0) {

                this.blinding.play();

                document.querySelector('.vid').style.display = 'block';
            }
        })



        playButton.addEventListener('click', e => {   
            if (!this.eye.paused && this.eye.currentTime > 0 && !this.eye.ended) { 
                this.eye.pause();
               
                
                document.querySelector('.vid').style.display = 'none';
            }
            else if(this.eye.paused && this.eye.currentTime > 0 ) {
               
                this.eye.play();
                
                document.querySelector('.vid').style.display = 'block';
            }  
        })


        playButton.addEventListener('click', e => {
            if (!this.travis.paused && this.travis.currentTime > 0 && !this.travis.ended) {
                this.travis.pause();
                document.querySelector('.vid').style.display = 'none';

            }
            else if (this.travis.paused && this.travis.currentTime > 0) {
                this.travis.play();
                
                document.querySelector('.vid').style.display = 'block';
            }
            console.log('hello')
        })

        playButton.addEventListener('click', e => {
            if (!this.bed.paused && this.bed.currentTime > 0 && !this.bed.ended) {
                this.bed.pause();
                document.querySelector('.vid').style.display = 'none';

            }
            else if (this.bed.paused && this.bed.currentTime > 0) {
                this.bed.play();

                document.querySelector('.vid').style.display = 'block';
            }
            console.log('hello')
        })


        playButton.addEventListener('click', e => {
            if (!this.theKill.paused && this.theKill.currentTime > 0 && !this.theKill.ended) {
                this.theKill.pause();
                document.querySelector('.vid').style.display = 'none';

            }
            else if (this.theKill.paused && this.theKill.currentTime > 0) {
                this.theKill.play();

                document.querySelector('.vid').style.display = 'block';
            }
            console.log('hello')
        })

        playButton.addEventListener('click', e => {
            if (!this.down.paused && this.down.currentTime > 0 && !this.down.ended) {
                this.down.pause();


                document.querySelector('.vid').style.display = 'none';
            }
            else if (this.down.paused && this.down.currentTime > 0) {

                this.down.play();

                document.querySelector('.vid').style.display = 'block';
            }
        })

    }


    handleWeeknd() {
        document.querySelector('.album-grid li:nth-child(5)').addEventListener('click', e => {
            this.blinding.load();
            this.blinding.play();
            let context = new AudioContext();
            let src = context.createMediaElementSource(this.blinding);
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


            canvas.width = 1800
            canvas.height = 250
            let ctx = canvas.getContext("2d");


            let binCount = analyser.frequencyBinCount;
            let audioBuffers = new Uint8Array(binCount);
            let thicknessAmount = (canvas.width / binCount) * 2.5; // # => controls buffer thickness


            const render = () => {
                requestAnimationFrame(render);
                let bufferWidth = 0;
                let r, g, b;
                analyser.getByteFrequencyData(audioBuffers);
                ctx.fillStyle = "#000"; // => controls canvas background color
                ctx.fillRect(0, 0, canvas.width, canvas.height); // => controls height and width of canvas background


                for (let i = 0; i < binCount; i++) {
                    r = audioBuffers[i] + (2.5 * (i / binCount));
                    g = 200 - audioBuffers[i];
                    b = 90 + i;


                    ctx.fillStyle = `rgb(${r},${g},${b})`;
                    ctx.fillRect(bufferWidth - 50, canvas.height - audioBuffers[i], thicknessAmount, audioBuffers[i]); // => controls bin pattern
                    bufferWidth += thicknessAmount + 1;
                }
            }

            document.querySelector('.vid').style.display = 'block';
            return render();
        })

    }

    
    handleSystemOfADown() {
        document.querySelector('.album-grid li:nth-child(4)').addEventListener('click', e => {
            this.down.load();
            this.down.play();
            let context = new AudioContext();
            let src = context.createMediaElementSource(this.down);
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


            canvas.width = 1800
            canvas.height = 250
            let ctx = canvas.getContext("2d");


            let binCount = analyser.frequencyBinCount;
            let audioBuffers = new Uint8Array(binCount);
            let thicknessAmount = (canvas.width / binCount) * 2.5; // # => controls buffer thickness


            const render = () => {
                requestAnimationFrame(render);
                let bufferWidth = 0;
                let r, g, b;
                analyser.getByteFrequencyData(audioBuffers);
                ctx.fillStyle = "#000"; // => controls canvas background color
                ctx.fillRect(0, 0, canvas.width, canvas.height); // => controls height and width of canvas background


                for (let i = 0; i < binCount; i++) {
                    r = audioBuffers[i] + (2.5 * (i / binCount));
                    g = 200 - audioBuffers[i];
                    b = 90 + i;


                    ctx.fillStyle = `rgb(${r},${g},${b})`;
                    ctx.fillRect(bufferWidth - 50, canvas.height - audioBuffers[i], thicknessAmount, audioBuffers[i]); // => controls bin pattern
                    bufferWidth += thicknessAmount + 1;
                }
            }

            document.querySelector('.vid').style.display = 'block';
            return render();
        })

    }


    handleTheKill() {
        document.querySelector('.album-grid li:nth-child(3)').addEventListener('click', e => {
            this.theKill.load();
            this.theKill.play();
            let context = new AudioContext();
            let src = context.createMediaElementSource(this.theKill);
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


            canvas.width = 1800
            canvas.height = 250
            let ctx = canvas.getContext("2d");


            let binCount = analyser.frequencyBinCount;
            let audioBuffers = new Uint8Array(binCount);
            let thicknessAmount = (canvas.width / binCount) * 2.5; // # => controls buffer thickness


            const render = () => {
                requestAnimationFrame(render);
                let bufferWidth = 0;
                let r, g, b;
                analyser.getByteFrequencyData(audioBuffers);
                ctx.fillStyle = "#000"; // => controls canvas background color
                ctx.fillRect(0, 0, canvas.width, canvas.height); // => controls height and width of canvas background


                for (let i = 0; i < binCount; i++) {
                    r = audioBuffers[i] + (2.5 * (i / binCount));
                    g = 200 - audioBuffers[i];
                    b = 90 + i;


                    ctx.fillStyle = `rgb(${r},${g},${b})`;
                    ctx.fillRect(bufferWidth - 50, canvas.height - audioBuffers[i], thicknessAmount, audioBuffers[i]); // => controls bin pattern
                    bufferWidth += thicknessAmount + 1;
                }
            }

            document.querySelector('.vid').style.display = 'block';
            return render();
        })


    }


    handleRightSideOfTheBed() {
        document.querySelector('.album-grid li:nth-child(6)').addEventListener('click', e => {
            this.bed.load();
            this.bed.play();
            let context = new AudioContext();
            let src = context.createMediaElementSource(this.bed);
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


            canvas.width = 1800
            canvas.height = 250
            let ctx = canvas.getContext("2d");


            let binCount = analyser.frequencyBinCount;
            let audioBuffers = new Uint8Array(binCount);
            let thicknessAmount = (canvas.width / binCount) * 2.5; // # => controls buffer thickness


            const render = () => {
                requestAnimationFrame(render);
                let bufferWidth = 0;
                let r, g, b;
                analyser.getByteFrequencyData(audioBuffers);
                ctx.fillStyle = "#000"; // => controls canvas background color
                ctx.fillRect(0, 0, canvas.width, canvas.height); // => controls height and width of canvas background


                for (let i = 0; i < binCount; i++) {
                    r = audioBuffers[i] + (2.5 * (i / binCount));
                    g = 300 - audioBuffers[i];
                    b = 60 + i;


                    ctx.fillStyle = `rgb(${r},${g},${b})`;
                    ctx.fillRect(bufferWidth - 50, canvas.height - audioBuffers[i], thicknessAmount, audioBuffers[i]); // => controls bin pattern
                    bufferWidth += thicknessAmount + 1;
                }
            }

            document.querySelector('.vid').style.display = 'block';
            return render();
        })

    }


    handleTravisBarker() {
        document.querySelector('.album-grid li:nth-child(2)').addEventListener('click', e => {
            this.travis.load();
            this.travis.play();
            let context = new AudioContext();
            let src = context.createMediaElementSource(this.travis);
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


            canvas.width = 1800
            canvas.height = 250
            let ctx = canvas.getContext("2d");


            let binCount = analyser.frequencyBinCount;
            let audioBuffers = new Uint8Array(binCount);
            let thicknessAmount = (canvas.width / binCount) * 2.5; // # => controls buffer thickness


            const render = () => {
                requestAnimationFrame(render);
                let bufferWidth = 0;
                let r, g, b;
                analyser.getByteFrequencyData(audioBuffers);
                ctx.fillStyle = "#000"; // => controls canvas background color
                ctx.fillRect(0, 0, canvas.width, canvas.height); // => controls height and width of canvas background


                for (let i = 0; i < binCount; i++) {
                    r = audioBuffers[i] + (2.5 * (i / binCount));
                    g = 300 - audioBuffers[i];
                    b = 60 + i;


                    ctx.fillStyle = `rgb(${r},${g},${b})`;
                    ctx.fillRect(bufferWidth - 50, canvas.height - audioBuffers[i], thicknessAmount, audioBuffers[i]); // => controls bin pattern
                    bufferWidth += thicknessAmount + 1;
                }
            }

            document.querySelector('.vid').style.display = 'block';
            return render();
        })

    }

    

    handleEyeOfTheTiger() {
        document.querySelector('.album-grid li:nth-child(1)').addEventListener('click', e => {
            this.eye.load();
            this.eye.play();
            let context = new AudioContext();
            let src = context.createMediaElementSource(this.eye);
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


            canvas.width = 1800
            canvas.height = 250
            let ctx = canvas.getContext("2d");


            let binCount = analyser.frequencyBinCount;
            let audioBuffers = new Uint8Array(binCount);
            let thicknessAmount = (canvas.width / binCount) * 2.5; // # => controls buffer thickness


            const render = () => {
                requestAnimationFrame(render);
                let bufferWidth = 0;
                let r, g, b;
                analyser.getByteFrequencyData(audioBuffers);
                ctx.fillStyle = "#000"; // => controls canvas background color
                ctx.fillRect(0, 0, canvas.width, canvas.height); // => controls height and width of canvas background


                for (let i = 0; i < binCount; i++) {
                    r = audioBuffers[i] + (2.5 * (i / binCount));
                    g = 200 - audioBuffers[i];
                    b = 90 + i;

                    
                    ctx.fillStyle = `rgb(${r},${g},${b})`;
                    ctx.fillRect(bufferWidth, canvas.height - audioBuffers[i], thicknessAmount, audioBuffers[i]); // => controls bin pattern
                    bufferWidth += thicknessAmount + 1;
                }
            }
 
            document.querySelector('.vid').style.display = 'block';
            return render();
        })

    }


    handleUserAudioFile() {
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


        // this is the canvas's territory
        canvas.width = 1800
        canvas.height = 200
        let ctx = canvas.getContext("2d");


        let binCount = analyser.frequencyBinCount;
        let audioBuffers = new Uint8Array(binCount);
        let thicknessAmount = ( canvas.width / binCount) * 2.5; // # => controls buffer thickness
        

        const render = () => {
            requestAnimationFrame(render);
            let bufferWidth = 0;
            let r,g,b;
            analyser.getByteFrequencyData(audioBuffers);
            ctx.fillStyle = "#000"; // => controls canvas background color
            ctx.fillRect(0, 0, canvas.width , canvas.height ); // => controls height and width of canvas background


            for(let i = 0; i < binCount; i++) {
                r = audioBuffers[i] + (2.5 * (i / binCount));
                g = 200;
                b = 90 + i;
                 

                ctx.fillStyle = "rgb(" + r + "," + g + "," + b + ")";
                ctx.fillRect(bufferWidth, canvas.height - audioBuffers[i], thicknessAmount, audioBuffers[i]);
                bufferWidth += thicknessAmount + 1;
            }
        }


        return render();
    }


    handleVideo() {
        document.querySelector('.vid').style.display = 'block';
    }


    handleFile() {
        this.file.addEventListener('change', (e) => {
            this.audio.src = URL.createObjectURL(this.file.files[0]);
            this.audio.load();
            this.audio.play();
            this.handleUserAudioFile();  
            // this.handleVideo();
            
            document.querySelector('.vid').style.display = 'block';
            
            
            
            
        })
    }


}



