import { player } from "../state.js";

export function registerPlayerMovement() {
    window.addEventListener("keydown", function({key}) {
        switch(key) {
            case "d":
                player.keyPressed.right = true;
                break;
            case "a":
                player.keyPressed.left = true;
                break;
            case "w":
                player.keyPressed.up = true;
                break;
            case "s":
                player.keyPressed.down = true;
                break;
        }
    });

    window.addEventListener("keyup", function({key}) {
        switch(key) {
            case "d":
                player.keyPressed.right = false;
                break;
            case "a":
                player.keyPressed.left = false;
                break;
            case "w":
                player.keyPressed.up = false;
                break;
            case "s":
                player.keyPressed.down = false;
                break;
        }
    });
}