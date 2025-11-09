import * as constants from "./constants.js";
import { player, state, gameObjects } from "./state.js";
import { handlePlayerMovement } from "./utils.js";

export function gameLoop() {
    constants.ctx.clearRect(0, 0, constants.canvas.width, constants.canvas.height);

    handlePlayerMovement();

    gameObjects.forEach((obj) => {
        if (!obj.isVisible) return;

        obj.draw();

        // Calcs distance from player to object center
        const xDistance = player.x - (obj.x + obj.width / 2);
        const yDistance = player.y - (obj.y + obj.height / 2);
        const distance = Math.sqrt(xDistance * xDistance + yDistance * yDistance);

        // Approximate object radius as half the largest dimension
        const objectRadius = Math.max(obj.width, obj.height) / 2;

        const overlapFactor = 0.5; // Will only swallow when overlapping by 50%

        const swallowDistance = (player.radius + objectRadius) * overlapFactor;

        if (distance < swallowDistance && player.radius >= obj.requiredRadius) {
            obj.isVisible = false;
            player.radius += obj.points; 
        }
    });

    player.draw();
    player.update();

    // Next step: test swallowing objects smaller than the player, increasing player radius, and colliding with larger objects
    // After that, make camera follow player if he distances too much from the center of the canvas

    state.gameLoopId = requestAnimationFrame(gameLoop);
}