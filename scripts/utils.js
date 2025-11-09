import { player } from "./state.js";

export function handlePlayerMovement() {
    const speed = 2.5;
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