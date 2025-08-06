
// Módulo principal del juego
import { CONFIG } from './assets/scripts/config.js';
import { AssetManager } from './assets/scripts/assets.js';
import { StarManager } from './assets/scripts/stars.js';
import { Sun } from './assets/scripts/sun.js';
import { EarthSystem } from './assets/scripts/earth.js';
import { UI } from './assets/scripts/ui.js';

class SpaceJourneyGame {
    constructor() {
        this.canvas = document.getElementById('viaje');
        this.ctx = this.canvas.getContext('2d');
        
        // Inicializar sistemas
        this.assetManager = new AssetManager();
        this.starManager = new StarManager(this.canvas);
        this.sun = new Sun(this.canvas, CONFIG.sunRelativePos);
        this.earthSystem = new EarthSystem(this.canvas, this.assetManager);
        this.ui = new UI(this.canvas);
        
        // Variables de tiempo y velocidad
        this.startTime = performance.now();
        this.shipSpeed = CONFIG.initialSpeed;
        
        // Configurar canvas y eventos
        this.setupCanvas();
        this.setupEvents();
        
        // Iniciar animación
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
        this.starManager.onResize();
    }
    
    updateShipSpeed(elapsed) {
        const midSp = CONFIG.initialSpeed * 0.25;
        if (elapsed <= CONFIG.earthAppearTime) {
            const t = elapsed / CONFIG.earthAppearTime;
            this.shipSpeed = CONFIG.initialSpeed - (CONFIG.initialSpeed - midSp) * t;
        } else {
            const t2 = (elapsed - CONFIG.earthAppearTime) / CONFIG.earthDuration;
            this.shipSpeed = midSp - (midSp - CONFIG.minSpeed) * Math.min(t2, 1);
        }
    }
    
    animate() {
        // Fondo negro
        this.ctx.fillStyle = '#000';
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

        // Tiempo transcurrido
        const now = performance.now();
        const elapsed = now - this.startTime;

        // Actualizar velocidad de la nave
        this.updateShipSpeed(elapsed);

        // Dibujar elementos de fondo
        this.starManager.drawBackgroundStars(this.ctx);
        this.sun.draw(this.ctx);

        // Actualizar y dibujar estrellas en movimiento
        this.starManager.updateStars(this.shipSpeed, elapsed, CONFIG.stopSpawnTime);
        this.starManager.drawStars(this.ctx);

        // Aparición de la Tierra
        let progress = (elapsed - CONFIG.earthAppearTime) / CONFIG.earthDuration;
        progress = Math.min(Math.max(progress, 0), 1);
        if (progress > 0) {
            this.earthSystem.drawEarthAnimation(this.ctx, progress);
        }

        // Dibujar UI
        this.ui.drawTimer(this.ctx, elapsed, CONFIG.journeyDuration);

        // Continuar animación
        requestAnimationFrame(() => this.animate());
    }
}

// Inicializar el juego cuando se carga la página
document.addEventListener('DOMContentLoaded', () => {
    new SpaceJourneyGame();
});
