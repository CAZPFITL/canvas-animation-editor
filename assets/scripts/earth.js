import {applyAtmosphere, applyLighting, applySpecularHighlight} from "./utils.js";

export class Earth {
    constructor(game) {
        this.game = game;
        this.earthFrameIndex = 0;
        this.frameCounter = 0;
    }

    draw(ctx) {
        const earthImg = this.game.assetManager.getEarthSprite();
        if (earthImg.complete) {
            ctx.save();

            ctx.imageSmoothingEnabled = false;
            ctx.imageSmoothingQuality = 'low';

            // clip circular
            ctx.beginPath();
            ctx.arc(this.game.cx, this.game.cy, this.game.boxSize / 2, 0, Math.PI * 2);
            ctx.clip();

            // escala para altura = boxSize
            const scale = this.game.boxSize / earthImg.naturalHeight;
            const overlayW = earthImg.naturalWidth * scale;
            const overlayH = this.game.boxSize;

            // origen centrado
            const xOrigin = this.game.cx - overlayW / 2;
            const yOrigin = this.game.cy - overlayH / 2;

            // offset animado hacia la derecha + wrap
            let totalOffset = (this.earthFrameIndex / this.game.config.totalEarthFrames) * overlayW;
            totalOffset = totalOffset % overlayW;
            if (totalOffset < 0) totalOffset += overlayW;

            // dos repeticiones
            const x1 = xOrigin + totalOffset;
            const x2 = x1 - overlayW;

            ctx.drawImage(earthImg, x1, yOrigin, overlayW, overlayH);
            ctx.drawImage(earthImg, x2, yOrigin, overlayW, overlayH);

            ctx.restore();

            const earthArgs = [this.game.ctx, this.game.cx, this.game.cy, this.game.boxSize / 1.98];

            applyLighting(this.game.ctx, this.game.cx, this.game.cy, this.game.boxSize / 1.98, {
                offsetX: 0,
                offsetY: 0,
                innerColor: 'rgba(255,255,255,0.2)',
                outerColor: 'rgba(0,0,0,0.3)'
            });

            applySpecularHighlight(this.game.ctx, this.game.cx, this.game.cy, this.game.boxSize / 1.98, {
                offsetX: -0.2,
                offsetY: 0.2,
                sizeFactor: 0.8,
                color: 'rgba(255,255,255,0.2)'
            });

            applyAtmosphere(this.game.ctx, this.game.cx, this.game.cy, this.game.boxSize / 1.95, {
                color: 'rgba(0,150,255,0.3)'
            });
        }
    }

    update() {
        this.frameCounter++;
        if (this.frameCounter >= this.game.config.framesPerEarthUpdate) {
            this.frameCounter = 0;
            this.earthFrameIndex = (this.earthFrameIndex + 1) % this.game.config.totalEarthFrames;
        }
    }
}
