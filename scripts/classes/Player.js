import * as constants from "../constants.js";

export class Player {
    #xSpeed; #ySpeed;
    #xPosition; #yPosition;
    #radius;
    #keyPressed = {
        up: false,
        down: false,
        left: false,
        right: false
    }

    constructor(xPosition, yPosition, radius) {
        this.#xPosition = xPosition;
        this.#yPosition = yPosition;
        this.#radius = radius;
        this.#xSpeed = 0;
        this.#ySpeed = 0;

        this.sprite = new Image();
        this.sprite.src = "./images/Player_sprite.png";
    }

    get x() { return this.#xPosition; }
    get y() { return this.#yPosition; }
    get xSpeed() { return this.#xSpeed }
    get ySpeed() { return this.#ySpeed }
    get radius() { return this.#radius; }
    get keyPressed() { return this.#keyPressed; }

    set xSpeed(xSpe) { this.#xSpeed = xSpe };
    set ySpeed(ySpe) { this.#ySpeed = ySpe };
    set x(x) { this.#xPosition = x};
    set y(y) { this.#yPosition = y};
    set keyPressed(newKeyPressed) { this.#keyPressed = newKeyPressed; }

    draw() {
        if (this.sprite.complete) {
            // Desenha a imagem centralizada na posição do player
            constants.ctx.drawImage(
                this.sprite,
                this.#xPosition - this.radius,
                this.#yPosition - this.radius,
                this.radius * 2,
                this.radius * 2
            );
        } 
    }

    update() {
        this.#xPosition += this.#xSpeed;
        this.#yPosition += this.#ySpeed;
    }
}