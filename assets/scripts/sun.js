export class Sun {
    constructor(game) {
        this.game = game;
        this.x = 0;
        this.y = 0;
        this.size = 0;
        this.updatePosition();
    }
    
    updatePosition() {
        const minDim = Math.min(this.game.canvas.width, this.game.canvas.height);
        this.x = this.game.config.sunRelativePos.x * this.game.canvas.width;
        this.y = this.game.config.sunRelativePos.y * this.game.canvas.height;
        this.size = minDim * 0.03;
    }
    
    onResize() {
        this.updatePosition();
    }

    draw(ctx) {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        const grad = ctx.createRadialGradient(this.x, this.y, 0, this.x, this.y, this.size);
        grad.addColorStop(0, 'rgba(255,230,150,1)');
        grad.addColorStop(1, 'rgba(255,200,50,0)');
        ctx.fillStyle = grad;
        ctx.fill();
    }
}
