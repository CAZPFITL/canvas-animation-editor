
// Gestión de assets (imágenes)
export class AssetManager {
    constructor() {
        this.earthSprite = new Image();
        this.cloudOverlay = new Image();
        this.cloudOverlayInverted = new Image();
        this.moonOverlay = new Image();
        
        this.earthLoaded = false;
        this.earthFrameSize = 0;
        
        this.loadAssets();
    }
    
    loadAssets() {
        // Cargar sprite de la Tierra
        this.earthSprite.src = 'https://opengameart.org/sites/default/files/earthspin-sheet.png';
        this.earthSprite.onload = () => {
            this.earthLoaded = true;
            if (this.earthSprite.naturalWidth > 0) {
                this.earthFrameSize = this.earthSprite.naturalWidth / 10; // earthCols
            }
        };
        
        if (this.earthSprite.complete && this.earthSprite.naturalWidth > 0) {
            this.earthLoaded = true;
            this.earthFrameSize = this.earthSprite.naturalWidth / 10;
        }
        
        // Cargar overlays de nubes y luna
        this.cloudOverlay.src = 'assets/cloud.png';
        this.cloudOverlayInverted.src = 'assets/cloud2.png';
        this.moonOverlay.src = 'assets/moon.png';
    }
    
    isEarthLoaded() {
        return this.earthLoaded;
    }
    
    getEarthSprite() {
        return this.earthSprite;
    }
    
    getEarthFrameSize() {
        return this.earthFrameSize;
    }
    
    getCloudOverlay() {
        return this.cloudOverlay;
    }
    
    getCloudOverlayInverted() {
        return this.cloudOverlayInverted;
    }
    
    getMoonOverlay() {
        return this.moonOverlay;
    }
}
