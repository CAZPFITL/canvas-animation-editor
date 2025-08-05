
// Gestión de la Luna
import { CONFIG } from './config.js';

export class Moon {
    constructor(assetManager) {
        this.assetManager = assetManager;
        this.moonFrameIndex = 0;
        this.moonFrameCounter = 0;
        this.moonAngle = 0;
    }
    
    drawMoonOverlay(ctx, img, cx, cy, moonSize, frameIndex, totalFrames, alpha) {
        if (!img.complete) return;
        ctx.save();

        // Recorte circular de la luna
        ctx.beginPath();
        ctx.arc(cx, cy, moonSize / 2, 0, Math.PI * 2);
        ctx.clip();

        ctx.globalAlpha = alpha;

        // Calcular escala del sprite rectangular a la altura de la luna
        const scale = moonSize / img.naturalHeight;
        const overlayW = img.naturalWidth * scale;
        const overlayH = moonSize;

        // Centrar sobre la luna
        const xOrigin = cx - overlayW / 2;
        const yOrigin = cy - overlayH / 2;

        // Offset animado
        const baseShift = (Math.floor(frameIndex) / totalFrames) * overlayW;
        const totalOffset = baseShift % overlayW;

        // Dibujar dos repeticiones para wrap
        ctx.drawImage(img, xOrigin + totalOffset, yOrigin, overlayW, overlayH);
        ctx.drawImage(img, xOrigin + totalOffset - overlayW, yOrigin, overlayW, overlayH);

        ctx.restore();
    }
    
    update() {
        // Avanzar frame de la Luna
        this.moonFrameCounter++;
        if (this.moonFrameCounter >= CONFIG.framesPerMoonUpdate) {
            this.moonFrameCounter = 0;
            this.moonFrameIndex = (this.moonFrameIndex + 1) % CONFIG.totalMoonFrames;
        }
        
        // Actualizar ángulo orbital
        this.moonAngle += 0.0025;
    }
    
    draw(ctx, cx, cy, boxSize, behind = false) {
        // Luna en órbita
        const orbit = boxSize * 0.8;
        const moonSz = boxSize * 0.15;
        const xOff = Math.sin(this.moonAngle) * orbit;
        const yOff = Math.cos(this.moonAngle) * orbit * 0.3;
        const depth = Math.cos(this.moonAngle);
        const moonX = cx + xOff;
        const moonY = cy + yOff;
        const isBehind = depth < 0;
        
        // Solo dibujar si coincide con la condición behind
        if (behind === isBehind) {
            const alpha = behind ? 0.8 : 1.0;
            this.drawMoonOverlay(ctx, this.assetManager.getMoonOverlay(), moonX, moonY, moonSz, this.moonFrameIndex, CONFIG.totalMoonFrames, alpha);
        }
    }
    
    isVisible() {
        return this.assetManager.getMoonOverlay().complete;
    }
}
