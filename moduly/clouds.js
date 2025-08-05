
// Gestión de las nubes
import { CONFIG } from './config.js';

export class Clouds {
    constructor(assetManager) {
        this.assetManager = assetManager;
    }
    
    drawCloudLayer(ctx, img, cx, cy, boxSize, dx, dy, earthFrameIndex, totalEarthFrames, alpha, invert, initShift = 0) {
        if (!img.complete) return;
        ctx.save();

        // Recorte circular alrededor de la Tierra
        ctx.beginPath();
        ctx.arc(cx, cy, boxSize/1.98, 0, Math.PI*2);
        ctx.clip();

        // Opacidad
        ctx.globalAlpha = alpha;

        // Calcular dimensiones escaladas de la capa de nubes
        const scale = boxSize / img.naturalHeight;
        const overlayW = img.naturalWidth * scale;
        const overlayH = boxSize;

        // Origen X para centrar la capa sobre la Tierra
        const xOrigin = dx - (overlayW - boxSize)/2;
        const yOrigin = dy;

        // Desplazamiento animado + inicial, con wrap sobre overlayW
        const baseShift = (earthFrameIndex / totalEarthFrames) * overlayW;
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
    
    drawBackClouds(ctx, cx, cy, boxSize, dx, dy, earthFrameIndex) {
        // Capa de nubes TRASERAS (detrás de la Tierra)
        if (this.assetManager.getCloudOverlayInverted().complete) {
            this.drawCloudLayer(
                ctx, this.assetManager.getCloudOverlayInverted(),
                cx, cy, boxSize, dx, dy,
                earthFrameIndex, CONFIG.totalEarthFrames,
                0.7,    // alpha
                true    // invert
            );
        }
    }
    
    drawFrontClouds(ctx, cx, cy, boxSize, dx, dy, earthFrameIndex) {
        // Capa de nubes FRONTALES
        if (this.assetManager.getCloudOverlay().complete) {
            this.drawCloudLayer(
                ctx, this.assetManager.getCloudOverlay(),
                cx, cy, boxSize, dx, dy,
                earthFrameIndex, CONFIG.totalEarthFrames,
                0.8,    // alpha
                false   // no invert
            );
        }
    }
}
