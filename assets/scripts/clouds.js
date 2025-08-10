import { CONFIG } from './config.js';

export class Clouds {
    constructor(game) {
        this.game = game;
        this.cloudFrameCounter = 0;
        this.cloudFrameIndex = 0;
    }
    
    drawCloudLayer(ctx, img, alpha, invert, initShift = 0) {
        if (!img.complete) return;
        ctx.save();

        // Recorte circular alrededor de la Tierra
        ctx.beginPath();
        ctx.arc(this.game.cx, this.game.cy, this.game.boxSize/1.98, 0, Math.PI*2);
        ctx.clip();

        // Opacidad
        ctx.globalAlpha = alpha;

        // Calcular dimensiones escaladas de la capa de nubes
        const scale = this.game.boxSize / img.naturalHeight;
        const overlayW = img.naturalWidth * scale;
        const overlayH = this.game.boxSize;

        // Origen X para centrar la capa sobre la Tierra
        const xOrigin = this.game.dx - (overlayW - this.game.boxSize)/2;
        const yOrigin = this.game.dy;

        // Desplazamiento animado + inicial, con wrap sobre overlayW
        const baseShift = (this.cloudFrameIndex / CONFIG.totalCloudFrames) * overlayW;

        let totalOffset = (baseShift + initShift) % overlayW;
        if (totalOffset < 0) totalOffset += overlayW;

        // Invertir sentido del offset según flag
        const signedOffset = invert ? -totalOffset : +totalOffset;

        // Calcular dos X para cubrir wrap
        const x1 = xOrigin + signedOffset;
        const x2 = invert ? x1 + overlayW : x1 - overlayW;

        // Dibujar ambas repeticiones
        ctx.drawImage(img, x1, yOrigin, overlayW, overlayH);
        ctx.drawImage(img, x2, yOrigin, overlayW, overlayH);

        ctx.restore();
    }

    draw(ctx, behind = false) {
        const cloudsInvertedImg = this.game.assetManager.getCloudOverlayInverted()
        const cloudsImg = this.game.assetManager.getCloudOverlay()

        if (cloudsInvertedImg.complete && behind) {
            this.drawCloudLayer(ctx, cloudsInvertedImg, 0.7, true);
        }

        if (cloudsImg.complete && !behind) {
            this.drawCloudLayer(ctx, cloudsImg, 0.8, false);
        }
    }

    update() {
        this.cloudFrameCounter++;
        if (this.cloudFrameCounter >= CONFIG.framesPerCloudsUpdate) {
            this.cloudFrameCounter = 0;
            this.cloudFrameIndex   = (this.cloudFrameIndex + 1) % CONFIG.totalCloudFrames;
        }
    }
}
