import {CONFIG} from './assets/scripts/config.js';
import {AssetManager} from './assets/scripts/assets.js';
import {Stars} from './assets/scripts/stars.js';
import {Sun} from './assets/scripts/sun.js';
import {Earth} from './assets/scripts/earth.js';
import {UI} from './assets/scripts/ui.js';
import {Moon} from "./assets/scripts/moon.js";
import {Clouds} from "./assets/scripts/clouds.js";

class SpaceJourneyGame {
    constructor() {
        this.canvas = document.getElementById('viaje');
        this.ctx = this.canvas.getContext('2d');
        this.config = CONFIG

        this.assetManager = new AssetManager();
        this.stars = new Stars(this);
        this.sun = new Sun(this);
        this.moon = new Moon(this);
        this.earth = new Earth(this);
        this.clouds = new Clouds(this);
        this.ui = new UI(this.canvas);

        this.startTime = performance.now();
        this.shipSpeed = CONFIG.initialSpeed;

        this.setupCanvas();
        this.setupEvents();

        this.animate();
    }

    setupCanvas() {
        this.resizeCanvas();
    }

    setupEvents() {
        window.addEventListener('resize', () => this.resizeCanvas());
    }

    resizeCanvas() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
        this.sun.onResize();
        this.stars.onResize();
    }

    updateElapsedTime() {
        const now = performance.now();
        this.elapsed = now - this.startTime;
    }

    updateShipSpeed() {
        const midSp = CONFIG.initialSpeed * 0.25;
        if (this.elapsed <= CONFIG.earthAppearTime) {
            const t = this.elapsed / CONFIG.earthAppearTime;
            this.shipSpeed = CONFIG.initialSpeed - (CONFIG.initialSpeed - midSp) * t;
        } else {
            const t2 = (this.elapsed - CONFIG.earthAppearTime) / CONFIG.earthDuration;
            this.shipSpeed = midSp - (midSp - CONFIG.minSpeed) * Math.min(t2, 1);
        }
    }

    updateProgress() {
        const progress = (this.elapsed - CONFIG.earthAppearTime) / CONFIG.earthDuration;
        this.progress = Math.min(Math.max(progress, 0), 1);
    }

    updateTargetSize() {
        this.eased = Math.pow(this.progress, 3);
        this.maxSize = Math.min(this.canvas.width, this.canvas.height) / 3;
        this.boxSize = this.maxSize * this.eased;
        this.dx = (this.canvas.width - this.boxSize) / 2;
        this.dy = (this.canvas.height - this.boxSize) / 2;
        this.cx = this.dx + this.boxSize / 2;
        this.cy = this.dy + this.boxSize / 2;
    }

    drawBackground(ctx) {
        ctx.fillStyle = '#000';
        ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    }


    update() {
        this.updateElapsedTime();
        this.updateShipSpeed();
        this.updateProgress();
        this.updateTargetSize();
        this.stars.update();
        this.earth.update();
        this.moon.update();
        this.clouds.update();
    }

    draw() {
        this.drawBackground(this.ctx);
        this.stars.draw(this.ctx);
        this.sun.draw(this.ctx);
        this.stars.draw(this.ctx, true);

        if (this.progress > 0) {
            this.moon.draw(this.ctx, true);
            this.clouds.draw(this.ctx, true);
            this.earth.draw(this.ctx);
            this.clouds.draw(this.ctx, false);
            this.moon.draw(this.ctx, false);
        }

        this.ui.drawTimer(this.ctx, this.elapsed, CONFIG.journeyDuration);
    }

    animate() {
        this.update()
        this.draw()
        requestAnimationFrame(() => this.animate());
    }
}

// Inicializar el juego cuando se carga la página
document.addEventListener('DOMContentLoaded', () => {
    new SpaceJourneyGame();
});
