
// Gestión de la Tierra
import { CONFIG } from './config.js';
import { Moon } from './moon.js';
import { Clouds } from './clouds.js';

export class EarthSystem {
    constructor(canvas, assetManager) {
        this.canvas = canvas;
        this.assetManager = assetManager;
        
        // Inicializar subsistemas
        this.moon = new Moon(assetManager);
        this.clouds = new Clouds(assetManager);
        
        // Contadores de frames para la Tierra
        this.earthFrameIndex = 0;
        this.frameCounter = 0;
    }
    
    drawEarthAnimation(ctx, progress) {
        if (!this.assetManager.isEarthLoaded()) return;

        // Pixel art → desactivar smoothing
        ctx.imageSmoothingEnabled = false;
        ctx.imageSmoothingQuality = 'low';

        // Calcular frame origen
        const col = this.earthFrameIndex % CONFIG.earthCols;
        const row = Math.floor(this.earthFrameIndex / CONFIG.earthCols);
        const earthFrameSize = this.assetManager.getEarthFrameSize();
        const sx = col * earthFrameSize;
        const sy = row * earthFrameSize;

        // Tamaño destino con easing
        const minSize = 0;
        const maxSize = Math.min(this.canvas.width, this.canvas.height) / 3;
        const eased = Math.pow(progress, 3);
        const boxSize = minSize + (maxSize - minSize) * eased;
        const dx = (this.canvas.width - boxSize) / 2;
        const dy = (this.canvas.height - boxSize) / 2;
        const cx = dx + boxSize / 2;
        const cy = dy + boxSize / 2;

        // Avanzar frame de la Tierra
        this.frameCounter++;
        if (this.frameCounter >= CONFIG.framesPerEarthUpdate) {
            this.frameCounter = 0;
            this.earthFrameIndex = (this.earthFrameIndex + 1) % CONFIG.totalEarthFrames;
        }

        // Actualizar luna
        this.moon.update();

        // Dibujar luna detrás si corresponde
        this.moon.draw(ctx, cx, cy, boxSize, true);

        // Dibujar nubes traseras
        this.clouds.drawBackClouds(ctx, cx, cy, boxSize, dx, dy, this.earthFrameIndex);

        // Dibujar Tierra
        ctx.drawImage(
            this.assetManager.getEarthSprite(),
            sx, sy, earthFrameSize, earthFrameSize,
            dx, dy, boxSize, boxSize
        );

        // Dibujar nubes frontales
        this.clouds.drawFrontClouds(ctx, cx, cy, boxSize, dx, dy, this.earthFrameIndex);

        // Dibujar luna delante si corresponde
        this.moon.draw(ctx, cx, cy, boxSize, false);
    }
}
