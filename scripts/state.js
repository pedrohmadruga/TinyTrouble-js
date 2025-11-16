import {Player} from "./classes/Player.js";
import { GameObject } from "./classes/GameObject.js";  
import * as constants from "./constants.js";

export const player = new Player(constants.canvas.width / 2, constants.canvas.height / 2, 30);

export const level = {
    bounds: {
        x: 0,
        y: 0,
        width: 3000,
        height: 3000,
    },
    levelNumber: 1,
    requiredSizeToAdvance: 250,
}

// Defining objects for each level
const levelObjectsMap = {
    1: [ // Level 1
        new GameObject(level.bounds.x, level.bounds.y, level.bounds.width, level.bounds.height, 0, 0, `./images/background_level${level.levelNumber}.png`), // Background
        
        // Cluster 1 - Top left corner
        new GameObject(200, 150, 50, 50, 30, 10, "./images/Rock_Particle.png"), // Small
        new GameObject(250, 200, 70, 70, 40, 15, "./images/Rock_Particle.png"), // Medium
        new GameObject(150, 250, 60, 60, 35, 12, "./images/Rock_Particle.png"), // Small-Medium
        
        // Cluster 2 - Upper center
        new GameObject(1500, 400, 100, 100, 50, 20, "./images/Rock_Particle.png"), // Large
        new GameObject(1600, 300, 50, 50, 30, 10, "./images/Rock_Particle.png"), // Small
        new GameObject(1400, 500, 70, 70, 40, 15, "./images/Rock_Particle.png"), // Medium
        
        // Cluster 3 - Right corner
        new GameObject(2700, 600, 80, 80, 45, 18, "./images/Rock_Particle.png"), // Medium-Large
        new GameObject(2800, 700, 50, 50, 30, 10, "./images/Rock_Particle.png"), // Small
        new GameObject(2600, 500, 60, 60, 35, 12, "./images/Rock_Particle.png"), // Small-Medium
        
        // Cluster 4 - Center
        new GameObject(1500, 1500, 100, 100, 50, 20, "./images/Rock_Particle.png"), // Large
        new GameObject(1400, 1600, 50, 50, 30, 10, "./images/Rock_Particle.png"), // Small
        new GameObject(1600, 1400, 70, 70, 40, 15, "./images/Rock_Particle.png"), // Medium

        // MEGA PARTICLE - Map Center
        new GameObject(1500, 1500, 250, 250, 120, 100, "./images/Rock_Particle.png"), // Giant
        
        // Cluster 5 - Bottom left corner
        new GameObject(400, 2400, 90, 90, 47, 17, "./images/Rock_Particle.png"), // Medium-Large
        new GameObject(300, 2500, 50, 50, 30, 10, "./images/Rock_Particle.png"), // Small
        new GameObject(500, 2300, 65, 65, 37, 13, "./images/Rock_Particle.png"), // Small-Medium
        
        // Cluster 6 - Bottom right corner
        new GameObject(2500, 2600, 100, 100, 50, 20, "./images/Rock_Particle.png"), // Large
        new GameObject(2400, 2700, 55, 55, 32, 11, "./images/Rock_Particle.png"), // Small
        new GameObject(2600, 2500, 75, 75, 42, 16, "./images/Rock_Particle.png"), // Medium
        
        // Particles scattered around the map
        new GameObject(800, 800, 50, 50, 30, 10, "./images/Rock_Particle.png"),
        new GameObject(2000, 1000, 60, 60, 35, 12, "./images/Rock_Particle.png"),
        new GameObject(1200, 2000, 70, 70, 40, 15, "./images/Rock_Particle.png"),
    ],
    2: [ // Level 2 (add later)
    ],
};

export const gameObjects = levelObjectsMap[level.levelNumber];

export const state = {
    gameLoopId: null,
    currentZoom: 1,
    hasWon: false,
    hasPlayedWinAnimation: false,
};

