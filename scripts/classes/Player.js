import * as constants from "../constants.js";

export class Player {
    #xSpeed; #ySpeed;
    #xPosition; #yPosition;
    #radius;

    constructor(xPosition, yPosition, radius) {
        this.#xPosition = xPosition;
        this.#yPosition = yPosition;
        this.#radius = radius;
        this.#xSpeed = 0;
        this.#ySpeed = 0;
    }

    draw() {
        constants.ctx.beginPath();
        constants.ctx.arc(this.#xPosition, this.#yPosition, this.#radius, 0, Math.PI * 2);
        constants.ctx.fillStyle = "red";
        constants.ctx.fill();
        constants.ctx.closePath();
    }

    update = function() {
        this.#xPosition += this.#xSpeed;
        this.#yPosition += this.#ySpeed;
    }
}