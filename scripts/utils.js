import { player } from "./state.js";
import * as constants from "./constants.js";

export function handlePlayerMovement() {
    const speed = 5;
    player.xSpeed = 0;
    player.ySpeed = 0;

    if (player.keyPressed.right) player.xSpeed += speed;
    if (player.keyPressed.left)  player.xSpeed -= speed;
    if (player.keyPressed.up)    player.ySpeed -= speed;
    if (player.keyPressed.down)  player.ySpeed += speed;

    // Adjust player movement so that it does not move faster diagonally
    if (player.xSpeed !== 0 && player.ySpeed !== 0) {
        player.xSpeed *= Math.SQRT1_2; // 1/sqrt(2)
        player.ySpeed *= Math.SQRT1_2; // 1/sqrt(2)
    }
}

export function cameraFollow() {
    let worldOffsetX = 0;
    let worldOffsetY = 0;

    // Move game objects in the opposite direction when player is too far from center
    if (player.x > constants.canvasCenterX + 100 && player.xSpeed > 0) {
        worldOffsetX = -player.xSpeed;
        player.x -= player.xSpeed; // Keeps player within bounds
    } else if (player.x < constants.canvasCenterX - 100 && player.xSpeed < 0) {
        worldOffsetX = -player.xSpeed;
        player.x -= player.xSpeed;
    }

    if (player.y > constants.canvasCenterY + 100 && player.ySpeed > 0) {
        worldOffsetY = -player.ySpeed;
        player.y -= player.ySpeed;
    } else if (player.y < constants.canvasCenterY - 100 && player.ySpeed < 0) {
        worldOffsetY = -player.ySpeed;
        player.y -= player.ySpeed;
    }

    return { worldOffsetX, worldOffsetY };
}