document.addEventListener('DOMContentLoaded', () => {
    const audioBuffer = new AudioBuffer();
    audioBuffer.handleAudio();
}) 


class AudioBuffer {
    constructor() {
        this.file = document.querySelector(".audio-file");
        this.audio = document.querySelector(".audio");
        this.canvas = document.getElementById('canvas');
    }

    handleCanvas() {

    }

    handleAudio() {
        this.file.addEventListener('change', (e) => {
            this.audio.src = URL.createObjectURL(this.file.files[0]);
            this.audio.load();
            this.audio.play();
           
        })
    }

}
