// utils.js

/**
 * Iluminación difusa simple (sombra tipo Phong básico)
 */
export function applyLighting(ctx, cx, cy, radius, options = {}) {
    const {
        offsetX = 0.5,
        offsetY = -0.5,
        innerColor = 'rgba(255,255,255,0.9)',
        outerColor = 'rgba(0,0,0,0.3)',
        innerRadiusFactor = 0.1
    } = options;

    ctx.save();
    ctx.globalCompositeOperation = 'multiply';

    const lightX = cx + radius * offsetX;
    const lightY = cy + radius * offsetY;

    const shade = ctx.createRadialGradient(
        lightX, lightY, radius * innerRadiusFactor,
        cx, cy, radius
    );
    shade.addColorStop(0, innerColor);
    shade.addColorStop(1, outerColor);

    ctx.fillStyle = shade;
    ctx.beginPath();
    ctx.arc(cx, cy, radius, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
}

/**
 * Brillo especular (punto brillante del sol sobre la superficie)
 */
export function applySpecularHighlight(ctx, cx, cy, radius, options = {}) {
    const {
        offsetX = 0.5,
        offsetY = -0.5,
        sizeFactor = 0.3,
        color = 'rgba(255,255,255,0.6)'
    } = options;

    const lightX = cx + radius * offsetX;
    const lightY = cy + radius * offsetY;

    ctx.save();
    ctx.globalCompositeOperation = 'lighter';

    const spec = ctx.createRadialGradient(
        lightX, lightY, 0,
        lightX, lightY, radius * sizeFactor
    );
    spec.addColorStop(0, color);
    spec.addColorStop(1, 'rgba(255,255,255,0)');

    ctx.fillStyle = spec;
    ctx.beginPath();
    ctx.arc(lightX, lightY, radius * sizeFactor, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
}

/**
 * Atmósfera (halo alrededor del planeta)
 */
export function applyAtmosphere(ctx, cx, cy, radius, options = {}) {
    const {
        color = 'rgba(0,150,255,0.2)',
        innerAlpha = 0.0,
        outerAlpha = 0.2
    } = options;

    ctx.save();
    ctx.globalCompositeOperation = 'lighter';

    const atm = ctx.createRadialGradient(
        cx, cy, radius * 0.9,
        cx, cy, radius
    );
    atm.addColorStop(0, `rgba(0,150,255,${innerAlpha})`);
    atm.addColorStop(1, color);

    ctx.fillStyle = atm;
    ctx.beginPath();
    ctx.arc(cx, cy, radius, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
}
