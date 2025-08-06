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
