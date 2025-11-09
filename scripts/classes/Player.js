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
        constants.ctx.beginPath();
        constants.ctx.arc(this.#xPosition, this.#yPosition, this.#radius, 0, Math.PI * 2);
        constants.ctx.fillStyle = "red";
        constants.ctx.fill();
        constants.ctx.closePath();
    }

    update()  {
        this.#xPosition += this.#xSpeed;
        this.#yPosition += this.#ySpeed;
    }
}