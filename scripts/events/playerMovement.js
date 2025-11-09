import { player } from "../state.js";

export function registerPlayerMovement() {
    window.addEventListener("keydown", function({key}) {
        switch(key) {
            case "d": case "ArrowRight":
                player.keyPressed.right = true;
                break;
            case "a": case "ArrowLeft":
                player.keyPressed.left = true;
                break;
            case "w": case "ArrowUp":
                player.keyPressed.up = true;
                break;
            case "s": case "ArrowDown":
                player.keyPressed.down = true;
                break;
        }
    });

    window.addEventListener("keyup", function({key}) {
        switch(key) {
            case "d": case "ArrowRight":
                player.keyPressed.right = false;
                break;
            case "a": case "ArrowLeft":
                player.keyPressed.left = false;
                break;
            case "w": case "ArrowUp":
                player.keyPressed.up = false;
                break;
            case "s": case "ArrowDown":
                player.keyPressed.down = false;
                break;
        }
    });
}