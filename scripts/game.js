import * as constants from "./constants.js";
import { player, state } from "./state.js";
import { handlePlayerMovement } from "./utils.js";

export function gameLoop() {
    constants.ctx.clearRect(0, 0, constants.canvas.width, constants.canvas.height);

    handlePlayerMovement();
    player.draw();
    player.update();

    state.gameLoopId = requestAnimationFrame(gameLoop);
}