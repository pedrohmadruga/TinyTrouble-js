import { player } from "./state.js";

export function handlePlayerMovement() {
    const speed = 5;
    player.xSpeed = 0;
    player.ySpeed = 0;

    if (player.keyPressed.right) player.xSpeed += speed;
    if (player.keyPressed.left)  player.xSpeed -= speed;
    if (player.keyPressed.up)    player.ySpeed -= speed;
    if (player.keyPressed.down)  player.ySpeed += speed;
}