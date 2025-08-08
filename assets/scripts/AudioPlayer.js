export class AudioPlayer {
    constructor(game) {
        this.game = game;
        this.audio = this.game.assetManager.getSong();
        this.isPlaying = false;
        this.setVolume(0.5);
    }
    play() {
        this.audio.play();
        this.isPlaying = true;
    }
    pause() {
        this.audio.pause();
        this.isPlaying = false;
    }
    toggle() {
        this.isPlaying ? this.pause() : this.play();
    }
    setVolume(v) {
        this.audio.volume = Math.max(0, Math.min(1, v));
    }
}
