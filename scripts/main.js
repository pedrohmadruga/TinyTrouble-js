"use strict"

import { gameLoop } from "./game.js";
import { registerPlayerMovement } from "./events/playerMovement.js";

registerPlayerMovement();

gameLoop();