import * as constants from "./constants.js";
import { player, state, gameObjects, level } from "./state.js";
import { handlePlayerMovement, cameraFollow, handleZoom, createWinExplosion } from "./utils.js";

export function gameLoop() {
    constants.ctx.clearRect(0, 0, constants.canvas.width, constants.canvas.height);

    handlePlayerMovement();
    handleZoom();

    const { worldOffsetX, worldOffsetY } = cameraFollow();
    
    gameObjects.forEach((obj) => {
        if (!obj.isVisible) return; // Skip invisible objects

        obj.update(worldOffsetX, worldOffsetY);
        obj.draw();

        // If gameObject is background, skip collision detection
        if (obj.imageSrc.includes("background_level")) return;

        // Calcs distance from player to object center
        const xDistance = player.x - (obj.x + obj.width / 2); // X Distance to the object
        const yDistance = player.y - (obj.y + obj.height / 2); // Y Distance to the object
        const distance = Math.sqrt(xDistance * xDistance + yDistance * yDistance);

        // Approximate object radius as half the largest dimension
        const objectRadius = Math.max(obj.width, obj.height) / 2;

        const overlapFactor = 0.5; // Will only swallow when overlapping by 50%

        const swallowDistance = (player.radius + objectRadius) * overlapFactor;

        // Check if player can swallow the object
        if (distance < swallowDistance && player.targetRadius >= obj.requiredRadius) { // Can swallow
            obj.isVisible = false;
            player.targetRadius += obj.points;
            console.log(player.targetRadius);
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
    
    // TODO: Starting menu and options menu
    // TODO: Sound effects and background music
    // TODO: Different levels with increasing difficulty
    // TODO: AI movement for dynamic objects (mice, birds, humans, etc.)

    player.draw();
    player.update();

    constants.ctx.restore();

    if (player.targetRadius >= level.requiredSizeToAdvance && !state.hasWon) {
        state.hasWon = true;

        // stops every movement
        player.xSpeed = 0;
        player.ySpeed = 0;
        player.frozen = true;
    }

    // Win animation
    if (state.hasWon && !state.hasPlayedWinAnimation) {
        createWinExplosion(constants.ctx); 

        if(createWinExplosion.particles === null) { // Animation finished
            state.hasPlayedWinAnimation = true;
        }
    }

    state.gameLoopId = requestAnimationFrame(gameLoop);
}