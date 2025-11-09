import * as constants from "../constants.js";

export class GameObject {
    #xPosition;
    #yPosition;
    #width;
    #height;
    #imageSrc;
    #sprite;
    #requiredRadius;
    #points;
    #isLoaded = false;
    #isVisible = true;

    constructor(xPosition, yPosition, width, height, requiredRadius, points, imageSrc) {
        this.#xPosition = xPosition;
        this.#yPosition = yPosition;
        this.#width = width;
        this.#height = height;
        this.#requiredRadius = requiredRadius;
        this.#points = points;
        this.#imageSrc = imageSrc;

        this.#sprite = new Image();
        this.#sprite.src = imageSrc;

        this.#sprite.onload = () => {
            this.#isLoaded = true;
        };

        this.#sprite.onerror = () => {
            console.warn(`⚠️ Error loading sprite: ${imageSrc}`);
        };
    }

    get x() { return this.#xPosition; }
    get y() { return this.#yPosition; }
    get width() { return this.#width; }
    get height() { return this.#height; }
    get requiredRadius() { return this.#requiredRadius; }
    get points() { return this.#points; }
    get imageSrc() { return this.#imageSrc; }
    get sprite() { return this.#sprite; }
    get isLoaded() { return this.#isLoaded; }
    get isVisible() { return this.#isVisible; }

    set x(newX) { this.#xPosition = newX; }
    set y(newY) { this.#yPosition = newY; }
    set width(newWidth) { this.#width = newWidth; }
    set height(newHeight) { this.#height = newHeight; }
    set imageSrc(newSrc) {
        this.#imageSrc = newSrc;
        this.#sprite.src = newSrc;
    }
    set isVisible(visibility) { this.#isVisible = visibility; }

    draw() {
        if (this.#isLoaded && this.#sprite.naturalWidth > 0) {
            const aspectRatio = this.sprite.naturalWidth / this.sprite.naturalHeight;

            const drawWidth = this.width;
            const drawHeight = this.width / aspectRatio;

            constants.ctx.drawImage(
            this.sprite,
            this.x,
            this.y,
            drawWidth,
            drawHeight
            );
        }
    }
}
