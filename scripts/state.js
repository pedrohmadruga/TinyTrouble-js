import {Player} from "./classes/Player.js";
import * as constants from "./constants.js";

export const player = new Player(constants.canvas.width / 2, constants.canvas.height / 2, 30);

export const state = {
    gameLoopId: null,
};