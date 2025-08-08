export const CONFIG = {
    // Velocidades
    initialSpeed: 20,
    minSpeed: 0.5,
    
    // Duración del viaje
    journeyMinutes: 0.1,
    get journeyDuration() { return this.journeyMinutes * 60 * 1000; },
    get earthAppearTime() { return this.journeyDuration / 2; },
    get earthDuration() { return this.journeyDuration - this.earthAppearTime; },
    get stopSpawnTime() { return this.earthAppearTime - 10000; },
    
    // Parámetros de sprites
    totalEarthFrames: 8000,
    framesPerEarthUpdate: 1,

    totalMoonFrames: 6000,
    framesPerMoonUpdate: 1,

    totalCloudFrames: 7000,
    framesPerCloudsUpdate: 1,

    // Posición relativa del sol
    sunRelativePos: { x: 0.05, y: 0.5 },
    
    // Cantidad de elementos
    numStars: 500,
};
