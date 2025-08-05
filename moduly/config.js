
// Configuración global del juego
export const CONFIG = {
    // Velocidades
    initialSpeed: 20,
    minSpeed: 0.5,
    
    // Duración del viaje
    journeyMinutes: 0.2,
    get journeyDuration() { return this.journeyMinutes * 60 * 1000; },
    get earthAppearTime() { return this.journeyDuration / 2; },
    get earthDuration() { return this.journeyDuration - this.earthAppearTime; },
    get stopSpawnTime() { return this.earthAppearTime - 10000; },
    
    // Parámetros de sprites
    earthCols: 10,
    totalEarthFrames: 94,
    totalMoonFrames: 60,
    framesPerEarthUpdate: 12,
    framesPerMoonUpdate: 65,
    
    // Posición relativa del sol
    sunRelativePos: { x: 0.2, y: 0.3 },
    
    // Cantidad de elementos
    numStars: 500,
    numBackgroundStars: 200,
    numCloudPixels: 80
};
