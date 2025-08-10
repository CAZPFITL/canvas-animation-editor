export class AssetManager {
    earthUrl = './assets/img/earth.png'
    cloudUrl = './assets/img/cloud.png'
    cloudInvertedUrl = './assets/img/cloud2.png'
    moonUrl = './assets/img/moon.png'

    constructor() {
        this.earthSprite = new Image();
        this.cloudOverlay = new Image();
        this.cloudOverlayInverted = new Image();
        this.moonOverlay = new Image();

        this.loadAssets();
    }

    loadAssets() {
        this.earthSprite.src = this.earthUrl;
        this.cloudOverlay.src = this.cloudUrl;
        this.cloudOverlayInverted.src = this.cloudInvertedUrl;
        this.moonOverlay.src = this.moonUrl;
    }

    getEarthSprite() {
        return this.earthSprite;
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
