import * as constants from "../constants.js";

export class GameObject {
    #xPosition;
    #yPosition;
    #width;
    #height;
    #imageSrc;
    #sprite;
    #isLoaded = false;

    constructor(xPosition, yPosition, width, height, imageSrc) {
        this.#xPosition = xPosition;
        this.#yPosition = yPosition;
        this.#width = width;
        this.#height = height;
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
    get imageSrc() { return this.#imageSrc; }
    get sprite() { return this.#sprite; }
    get isLoaded() { return this.#isLoaded; }

    set x(newX) { this.#xPosition = newX; }
    set y(newY) { this.#yPosition = newY; }
    set width(newWidth) { this.#width = newWidth; }
    set height(newHeight) { this.#height = newHeight; }
    set imageSrc(newSrc) {
        this.#imageSrc = newSrc;
        this.#sprite.src = newSrc;
    }

    draw() {
        if (this.#isLoaded) {
            constants.ctx.drawImage(
                this.#sprite,
                this.#xPosition,
                this.#yPosition,
                this.#width,
                this.#height
            );
        }
    }
}
