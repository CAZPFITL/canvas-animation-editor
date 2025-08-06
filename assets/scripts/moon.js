import {applyLighting, applySpecularHighlight} from './utils.js';

export class Moon {
    constructor(game) {
        this.game = game;
        this.moonFrameIndex = 0;
        this.moonFrameCounter = 0;
        this.moonAngle = 500;
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

    draw(ctx, behind = false) {
        const orbit = this.game.boxSize * 0.8;
        const moonSz = this.game.boxSize * 0.15;
        const xOff = Math.sin(this.moonAngle) * orbit;
        const yOff = Math.cos(this.moonAngle) * orbit * 0.3;
        const depth = Math.cos(this.moonAngle);
        const moonX = this.game.cx + xOff;
        const moonY = this.game.cy + yOff;
        const isBehind = depth < 0;

        if (behind === isBehind) {
            const alpha = behind ? 0.8 : 1.0;
            this.drawMoonOverlay(
                ctx,
                this.game.assetManager.getMoonOverlay(),
                moonX,
                moonY,
                moonSz,
                this.moonFrameIndex,
                this.game.config.totalMoonFrames,
                alpha
            );

            const moonArgs = [ctx, moonX, moonY, moonSz/2];

            applyLighting(...moonArgs, {
                offsetX: 0,
                offsetY: 0,
                innerColor: behind ? 'rgba(255,255,255,0.1)' : 'rgba(255,255,255,0.2)',
                outerColor: 'rgba(0,0,0,0.4)'
            });

            applySpecularHighlight(...moonArgs, {
                offsetX: -0.2,
                offsetY: 0.2,
                sizeFactor: 0.8,
                color: behind ? 'rgba(255,255,255,0.08)' : 'rgba(255,255,255,0.1)'
            });
        }
    }

    update() {
        // Avanzar frame de la Luna
        this.moonFrameCounter++;
        if (this.moonFrameCounter >= this.game.config.framesPerMoonUpdate) {
            this.moonFrameCounter = 0;
            this.moonFrameIndex = (this.moonFrameIndex + 1) % this.game.config.totalMoonFrames;
        }

        // Actualizar ángulo orbital
        this.moonAngle += 0.001;
    }
}
