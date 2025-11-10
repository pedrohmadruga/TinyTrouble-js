import {Player} from "./classes/Player.js";
import { GameObject } from "./classes/GameObject.js";  
import * as constants from "./constants.js";

export const player = new Player(constants.canvas.width / 2, constants.canvas.height / 2, 30);
export const gameObjects = [
    // XPosition, YPosition, Width, Height, RequiredRadius, Points, ImageSrc
    new GameObject(500, 400, 50, 50, 30, 10, "./images/Rock_Particle.png"), // Smallest
    new GameObject(100, 100, 70, 70, 40, 15, "./images/Rock_Particle.png"), // Medium
    new GameObject(300, 200, 100, 100, 50, 20, "./images/Rock_Particle.png"), // Biggest
];

export const state = {
    gameLoopId: null,
    currentZoom: 1,
};