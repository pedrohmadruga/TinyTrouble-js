import * as constants from "./constants.js";
import { player, state } from "./state.js";
import { handlePlayerMovement } from "./utils.js";

export function gameLoop() {
    constants.ctx.clearRect(0, 0, constants.canvas.width, constants.canvas.height);

    handlePlayerMovement();
    player.draw();
    player.update();

    // Next step: test swallowing objects smaller than the player, increasing player radius, and colliding with larger objects
    // After that, make camera follow player if he distances too much from the center of the canvas

    state.gameLoopId = requestAnimationFrame(gameLoop);
}