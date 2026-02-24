const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");
const scoreEl = document.getElementById("score");
const finalScoreEl = document.getElementById("final-score");
const modal = document.getElementById("game-modal");
const restartBtn = document.getElementById("restart-btn");

let score = 0;
let gameRunning = true;
let hurdles = [];
let gameSpeed = 5;

const dino = {
    x: 50,
    y: canvas.height - 40,
    width: 40,
    height: 40,
    dy: 0,
    jumpForce: 12,
    gravity: 0.6,
    grounded: true
};

function init() {
    score = 0;
    gameRunning = true;
    hurdles = [];
    gameSpeed = 5;
    dino.y = canvas.height - 40;
    dino.dy = 0;
    modal.classList.add("hide");
    requestAnimationFrame(update);
}

function spawnHurdle() {
    let size = Math.random() * (50 - 20) + 20;
    hurdles.push({
        x: canvas.width,
        y: canvas.height - size,
        width: 20,
        height: size
    });
}

let spawnTimer = 0;
function update() {
    if (!gameRunning) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Dino physics
    if (!dino.grounded) {
        dino.dy += dino.gravity;
        dino.y += dino.dy;
    }

    if (dino.y + dino.height >= canvas.height) {
        dino.y = canvas.height - dino.height;
        dino.dy = 0;
        dino.grounded = true;
    }

    // Draw Dino
    ctx.fillStyle = "#00ff41";
    ctx.fillRect(dino.x, dino.y, dino.width, dino.height);
    // Eye
    ctx.fillStyle = "#000";
    ctx.fillRect(dino.x + 25, dino.y + 10, 5, 5);

    // Hurdles
    spawnTimer++;
    if (spawnTimer > Math.max(50, 100 - score / 10)) {
        spawnHurdle();
        spawnTimer = 0;
    }

    hurdles.forEach((h, i) => {
        h.x -= gameSpeed;
        ctx.fillStyle = "#ff007a";
        ctx.fillRect(h.x, h.y, h.width, h.height);

        // Collision
        if (dino.x < h.x + h.width && dino.x + dino.width > h.x && dino.y < h.y + h.height && dino.y + dino.height > h.y) {
            endGame();
        }

        if (h.x + h.width < 0) {
            hurdles.splice(i, 1);
            score += 10;
            scoreEl.innerText = score;
            if (score % 100 === 0) gameSpeed += 0.5;
        }
    });

    requestAnimationFrame(update);
}

function jump() {
    if (dino.grounded) {
        dino.dy = -dino.jumpForce;
        dino.grounded = false;
    }
}

function endGame() {
    gameRunning = false;
    finalScoreEl.innerText = score;
    modal.classList.remove("hide");
    saveScore('Dino Run', score);
}

function saveScore(game, points) {
    const username = localStorage.getItem('arcade_username') || 'Player';
    let scores = JSON.parse(localStorage.getItem('arcade_scores')) || [];
    const idx = scores.findIndex(s => s.name === username && s.game === game);
    if (idx > -1) { if (points > scores[idx].score) scores[idx].score = points; }
    else scores.push({ name: username, game: game, score: points });
    scores.sort((a, b) => b.score - a.score);
    localStorage.setItem('arcade_scores', JSON.stringify(scores.slice(0, 5)));
}

window.addEventListener("keydown", (e) => { if (e.code === "Space" || e.code === "ArrowUp") jump(); });
canvas.addEventListener("click", jump);
restartBtn.onclick = init;

init();
