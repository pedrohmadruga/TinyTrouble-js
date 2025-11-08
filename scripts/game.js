import * as constants from "./constants.js";
import { player, state } from "./state.js";

export function gameLoop() {
    constants.ctx.clearRect(0, 0, constants.canvas.width, constants.canvas.height);

    player.draw();

    state.gameLoopId = requestAnimationFrame(gameLoop);
}