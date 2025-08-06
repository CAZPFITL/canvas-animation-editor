
// Gestión de assets (imágenes)
export class AssetManager {
    earthUrl = './assets/img/earthx.png'
    cloudUrl = './assets/img/cloud.png'
    cloudInvertedUrl = './assets/img/cloud2.png'
    moonUrl = './assets/img/moonx.png'

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
        this.earthSprite.src = this.earthUrl;
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
        this.cloudOverlay.src = this.cloudUrl;
        this.cloudOverlayInverted.src = this.cloudInvertedUrl;
        this.moonOverlay.src = this.moonUrl;
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
