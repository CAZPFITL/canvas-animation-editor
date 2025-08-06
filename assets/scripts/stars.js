export class Stars {
    constructor(game) {
        this.game = game;
        this.stars = [];
        this.backgroundStars = [];
        this.createStars();
        this.createBackgroundStars();
    }
    
    createStars() {
        const numStars = 500;
        this.stars = [];
        for (let i = 0; i < numStars; i++) {
            this.stars.push({
                x: (Math.random() * 2 - 1) * this.game.canvas.width * 0.35,
                y: (Math.random() * 2 - 1) * this.game.canvas.height * 0.35,
                z: Math.random() * this.game.canvas.width,
                speedFactor: 0.3 + Math.random() * 0.7
            });
        }
    }
    
    createBackgroundStars() {
        const total = 200;
        this.backgroundStars = [];
        for (let i = 0; i < total; i++) {
            this.backgroundStars.push({
                x: Math.random() * this.game.canvas.width,
                y: Math.random() * this.game.canvas.height,
                size: Math.random() * 1.5 + 0.3,
                brightness: Math.random() * 0.6 + 0.4
            });
        }
    }

    drawBackgroundStars(ctx) {
        this.backgroundStars.forEach(s => {
            ctx.beginPath();
            ctx.arc(s.x, s.y, s.size, 0, Math.PI * 2);
            const v = Math.floor(255 * s.brightness);
            ctx.fillStyle = `rgb(${v},${v},${v})`;
            ctx.fill();
        });
    }
    
    drawStars(ctx) {
        const focal = this.game.canvas.width;
        const maxD = this.game.canvas.width;
        
        this.stars.forEach(star => {
            const k = focal / star.z;
            const px = star.x * k + this.game.canvas.width / 2;
            const py = star.y * k + this.game.canvas.height / 2;
            const sz = Math.max(1, (1 - star.z / maxD) * 3);
            if (px >= 0 && px <= this.game.canvas.width && py >= 0 && py <= this.game.canvas.height) {
                this.drawStar(ctx, px, py, sz);
            }
        });
    }
    
    drawStar(ctx, px, py, size) {
        ctx.beginPath();
        ctx.arc(px, py, size, 0, Math.PI * 2);
        ctx.fillStyle = '#FFF';
        ctx.fill();
    }

    onResize() {
        this.createBackgroundStars();
        this.createStars();
    }

    draw(ctx, drawBackground = false) {
        (drawBackground) ? this.drawBackgroundStars(ctx) : this.drawStars(ctx);
    }

    update() {
        const maxD = this.game.canvas.width;

        this.stars.forEach(star => {
            star.z -= this.game.shipSpeed * star.speedFactor;
            if (star.z <= 0) {
                if (this.game.elapsed < this.game.config.stopSpawnTime) {
                    star.x = (Math.random() * 2 - 1) * this.game.canvas.width * 0.35;
                    star.y = (Math.random() * 2 - 1) * this.game.canvas.height * 0.35;
                    star.z = maxD;
                } else {
                    star.z = 0;
                }
            }
        });
    }
}
