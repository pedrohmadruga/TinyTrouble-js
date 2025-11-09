import * as constants from "./constants.js";
import { player, state, gameObjects } from "./state.js";
import { handlePlayerMovement, cameraFollow } from "./utils.js";

export function gameLoop() {
    constants.ctx.clearRect(0, 0, constants.canvas.width, constants.canvas.height);

    handlePlayerMovement();
    const { worldOffsetX, worldOffsetY } = cameraFollow();

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

    player.draw();
    player.update();

    // After that, make camera follow player if he distances too much from the center of the canvas
    /*
    1. Calcular a distância do jogador ao centro do canvas no arquivo
    2. Se a distância for maior que um certo limite (ex: 100 pixels), mover o canvas na direção oposta ao movimento do jogador no arquivo
    3. Ajustar a posição de todos os objetos do jogo de acordo com o movimento do canvas
    */ 

    state.gameLoopId = requestAnimationFrame(gameLoop);
}