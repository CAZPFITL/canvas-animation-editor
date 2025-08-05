
// Gestión de la interfaz de usuario
export class UI {
    constructor(canvas) {
        this.canvas = canvas;
    }
    
    drawTimer(ctx, elapsed, journeyDuration) {
        ctx.fillStyle = '#FFF';
        ctx.font = '16px monospace';
        const secs = Math.floor(elapsed / 1000);
        const mins = Math.floor(secs / 60);
        const rsec = secs % 60;
        const totSec = Math.floor(journeyDuration / 1000);
        const totMin = Math.floor(totSec / 60);
        const rTotSec = totSec % 60;
        const fmt = n => n < 10 ? '0' + n : '' + n;
        ctx.fillText(`${fmt(mins)}:${fmt(rsec)} / ${fmt(totMin)}:${fmt(rTotSec)}`, 10, 25);
    }
}
