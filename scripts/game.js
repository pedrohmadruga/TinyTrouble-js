import * as constants from "./constants.js";
import { player, state, gameObjects } from "./state.js";
import { handlePlayerMovement, cameraFollow } from "./utils.js";

export function gameLoop() {
    constants.ctx.clearRect(0, 0, constants.canvas.width, constants.canvas.height);

    handlePlayerMovement();
    const { worldOffsetX, worldOffsetY } = cameraFollow();

    // Smooth zooming based on player size
    let targetZoom = 1;

    if (player.targetRadius > 130) {
        targetZoom = 130 / player.targetRadius;
    }

    const zoomLerpSpeed = 0.05; // LERP: Linear Interpolation
    state.currentZoom += (targetZoom - state.currentZoom) * zoomLerpSpeed;

    // Apply camera transformations
    constants.ctx.save();
    constants.ctx.translate(constants.canvasCenterX, constants.canvasCenterY);
    constants.ctx.scale(state.currentZoom, state.currentZoom);
    constants.ctx.translate(-constants.canvasCenterX, -constants.canvasCenterY);

    gameObjects.forEach((obj) => {
        if (!obj.isVisible) return; // Skip invisible objects

        obj.update(worldOffsetX, worldOffsetY);
        obj.draw();

        // Calcs distance from player to object center
        const xDistance = player.x - (obj.x + obj.width / 2); // X Distance to the object
        const yDistance = player.y - (obj.y + obj.height / 2); // Y Distance to the object
        const distance = Math.sqrt(xDistance * xDistance + yDistance * yDistance);

        // Approximate object radius as half the largest dimension
        const objectRadius = Math.max(obj.width, obj.height) / 2;

        const overlapFactor = 0.5; // Will only swallow when overlapping by 50%

        const swallowDistance = (player.radius + objectRadius) * overlapFactor;

        // Check if player can swallow the object
        if (distance < swallowDistance && player.targetRadius >= obj.requiredRadius) {
            obj.isVisible = false;
            player.targetRadius += obj.points; 
        }
        else if (distance < swallowDistance && player.targetRadius < obj.requiredRadius) { // Collide with larger object, but can't swallow it
            // Current player movement vector
            const dotProduct = xDistance * player.xSpeed + yDistance * player.ySpeed;

            // If the dot product is negative, the player is approaching the object
            if (dotProduct < 0) {
                player.x -= player.xSpeed;
                player.y -= player.ySpeed;
            }
        }
    });

    // TODO: When the player reaches a certain size (130px), scale down all game objects instead of growing the player further.
    // TODO: Small explosion animation when all objects are swallowed.

    player.draw();
    player.update();

    constants.ctx.restore();

    state.gameLoopId = requestAnimationFrame(gameLoop);
}