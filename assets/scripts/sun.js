
// Gestión del sol
export class Sun {
    constructor(canvas, sunRelativePos) {
        this.canvas = canvas;
        this.sunRelativePos = sunRelativePos;
        this.x = 0;
        this.y = 0;
        this.size = 0;
        this.updatePosition();
    }
    
    updatePosition() {
        const minDim = Math.min(this.canvas.width, this.canvas.height);
        this.x = this.sunRelativePos.x * this.canvas.width;
        this.y = this.sunRelativePos.y * this.canvas.height;
        this.size = minDim * 0.03;
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
    
    onResize() {
        this.updatePosition();
    }
}
