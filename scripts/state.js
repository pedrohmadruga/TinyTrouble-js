import {Player} from "./classes/Player.js";
import { GameObject } from "./classes/GameObject.js";  
import * as constants from "./constants.js";

export const player = new Player(constants.canvas.width / 2, constants.canvas.height / 2, 30);
export const gameObjects = [
    // XPosition, YPosition, Width, Height, RequiredRadius, Points, ImageSrc
    new GameObject(100, 100, 100, 100, 40, 15, "./images/Rock_Particle.png"),
    new GameObject(300, 200, 160, 160, 50, 20, "./images/Rock_Particle.png"),
    new GameObject(500, 400, 60, 60, 30, 10, "./images/Rock_Particle.png"),
];

export const state = {
    gameLoopId: null,
};