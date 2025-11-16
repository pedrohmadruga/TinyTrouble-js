import { player, state, gameObjects } from "./state.js";
import * as constants from "./constants.js";

export function handlePlayerMovement() {
    if (player.frozen)  return;
    const speed = 5;
    player.xSpeed = 0;
    player.ySpeed = 0;

    // Do not let player move out of level bounds
    if (player.keyPressed.right && player.x + player.radius < constants.canvas.width)
    player.xSpeed += speed;

    if (player.keyPressed.left && player.x - player.radius > 0)
        player.xSpeed -= speed;

    if (player.keyPressed.up && player.y - player.radius > 0)
        player.ySpeed -= speed;

    if (player.keyPressed.down && player.y + player.radius < constants.canvas.height)
        player.ySpeed += speed;

    // Adjust player movement so that it does not move faster diagonally
    if (player.xSpeed !== 0 && player.ySpeed !== 0) {
        player.xSpeed *= Math.SQRT1_2; // 1/sqrt(2)
        player.ySpeed *= Math.SQRT1_2; // 1/sqrt(2)
    }
}

export function cameraFollow() {
    let worldOffsetX = 0;
    let worldOffsetY = 0;
    let leftBrackgroundOnOrigin = (gameObjects[0].x >= 0) ? true : false;
    let rightBrackgroundOnOrigin = (gameObjects[0].x + gameObjects[0].width <= constants.canvas.width) ? true : false;
    let topBrackgroundOnOrigin = (gameObjects[0].y >= 0) ? true : false;
    let bottomBrackgroundOnOrigin = (gameObjects[0].y + gameObjects[0].height <= 1720) ? true : false;

    // Move game objects in the opposite direction when player is too far from center
    if (player.x > constants.canvasCenterX + 100 && player.xSpeed > 0 && !rightBrackgroundOnOrigin) { // Player moving right
        worldOffsetX = -player.xSpeed;
        player.x -= player.xSpeed; // Keeps player within bounds
    } else if (player.x < constants.canvasCenterX - 100 && player.xSpeed < 0 && !leftBrackgroundOnOrigin) { // Player moving left
        worldOffsetX = -player.xSpeed;
        player.x -= player.xSpeed;
    }

    if (player.y > constants.canvasCenterY + 100 && player.ySpeed > 0 && !bottomBrackgroundOnOrigin) { // Player moving down
        worldOffsetY = -player.ySpeed;
        player.y -= player.ySpeed;
    } else if (player.y < constants.canvasCenterY - 100 && player.ySpeed < 0 && !topBrackgroundOnOrigin) { // Player moving up
        worldOffsetY = -player.ySpeed;
        player.y -= player.ySpeed;
    }

    return { worldOffsetX, worldOffsetY };
}

export function handleZoom() {
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
}

export function createWinExplosion(ctx) {

    // If there is not yet a particle system, create one
    if (!createWinExplosion.particles) {
        createWinExplosion.particles = [];

        const count = 80;
        const speedMin = 2;
        const speedMax = 6;
        const lifeMin = 40;
        const lifeMax = 80;

        const cx = player.x;
        const cy = player.y;

        for (let i = 0; i < count; i++) {
            const angle = Math.random() * Math.PI * 2;
            const speed = speedMin + Math.random() * (speedMax - speedMin);

            createWinExplosion.particles.push({
                x: cx,
                y: cy,
                vx: Math.cos(angle) * speed,
                vy: Math.sin(angle) * speed,
                radius: 3 + Math.random() * 3,
                life: lifeMin + Math.random() * (lifeMax - lifeMin),
                color: `hsl(${Math.random() * 360}, 100%, 60%)`
            });
        }
    }

    const particles = createWinExplosion.particles;

    // Update and draw particles
    for (let p of particles) {
        p.x += p.vx;
        p.y += p.vy;
        p.life--;

        ctx.beginPath();
        ctx.fillStyle = p.color;
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fill();
    }

    // Removes dead particles
    createWinExplosion.particles = particles.filter(p => p.life > 0);

    // If all particles are dead, remove the particle system
    if (createWinExplosion.particles.length === 0) {
        createWinExplosion.particles = null;
    }
}
