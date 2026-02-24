const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");
const scoreEl = document.getElementById("score");
const modal = document.getElementById("game-modal");
const finalScoreEl = document.getElementById("final-score");
const restartBtn = document.getElementById("restart-btn");

let score = 0;
let gameRunning = true;

const player = {
    x: canvas.width / 2 - 25,
    y: canvas.height - 40,
    width: 50,
    height: 30,
    speed: 5
};

let bullets = [];
let enemies = [];
let enemyBullets = [];

const enemyRows = 4;
const enemyCols = 8;
const enemyWidth = 40;
const enemyHeight = 30;
const enemyPadding = 15;
let enemyDirection = 1;
let enemySpeed = 1;

function initEnemies() {
    enemies = [];
    for (let r = 0; r < enemyRows; r++) {
        for (let c = 0; c < enemyCols; c++) {
            enemies.push({
                x: c * (enemyWidth + enemyPadding) + 50,
                y: r * (enemyHeight + enemyPadding) + 50,
                width: enemyWidth,
                height: enemyHeight,
                color: r % 2 === 0 ? "#00ff41" : "#00f2ff"
            });
        }
    }
}

let leftPressed = false;
let rightPressed = false;

document.addEventListener("keydown", (e) => {
    if (e.key === "ArrowLeft") leftPressed = true;
    if (e.key === "ArrowRight") rightPressed = true;
    if (e.key === " ") fireBullet();
});

document.addEventListener("keyup", (e) => {
    if (e.key === "ArrowLeft") leftPressed = false;
    if (e.key === "ArrowRight") rightPressed = false;
});

function fireBullet() {
    if (!gameRunning) return;
    bullets.push({
        x: player.x + player.width / 2 - 2,
        y: player.y,
        width: 4,
        height: 10
    });
}

function update() {
    if (!gameRunning) return;

    if (leftPressed && player.x > 0) player.x -= player.speed;
    if (rightPressed && player.x < canvas.width - player.width) player.x += player.speed;

    // Movement bullets
    bullets.forEach((b, i) => {
        b.y -= 7;
        if (b.y < 0) bullets.splice(i, 1);
    });

    // Move enemies
    let edgeReached = false;
    enemies.forEach(e => {
        e.x += enemyDirection * enemySpeed;
        if (e.x + e.width > canvas.width || e.x < 0) edgeReached = true;
    });

    if (edgeReached) {
        enemyDirection *= -1;
        enemies.forEach(e => {
            e.y += 20;
            if (e.y + e.height >= player.y) endGame();
        });
    }

    // Collision detection
    bullets.forEach((b, bi) => {
        enemies.forEach((e, ei) => {
            if (b.x < e.x + e.width && b.x + b.width > e.x && b.y < e.y + e.height && b.y + b.height > e.y) {
                bullets.splice(bi, 1);
                enemies.splice(ei, 1);
                score += 100;
                scoreEl.innerText = score;
                if (enemies.length === 0) {
                    enemySpeed += 0.5;
                    initEnemies();
                }
            }
        });
    });

    // Enemy firing
    if (Math.random() < 0.02 && enemies.length > 0) {
        const shooter = enemies[Math.floor(Math.random() * enemies.length)];
        enemyBullets.push({
            x: shooter.x + shooter.width / 2,
            y: shooter.y + shooter.height,
            width: 4,
            height: 10
        });
    }

    enemyBullets.forEach((eb, i) => {
        eb.y += 5;
        if (eb.y > canvas.height) enemyBullets.splice(i, 1);
        if (eb.x < player.x + player.width && eb.x + eb.width > player.x && eb.y < player.y + player.height && eb.y + eb.height > player.y) {
            endGame();
        }
    });
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw player
    ctx.fillStyle = "#ff007a";
    ctx.fillRect(player.x, player.y, player.width, player.height);
    // Ship detail
    ctx.fillStyle = "#fff";
    ctx.fillRect(player.x + 22, player.y - 10, 6, 10);

    // Draw bullets
    ctx.fillStyle = "#00f2ff";
    bullets.forEach(b => ctx.fillRect(b.x, b.y, b.width, b.height));

    // Draw enemies
    enemies.forEach(e => {
        ctx.fillStyle = e.color;
        ctx.fillRect(e.x, e.y, e.width, e.height);
        // Eyes
        ctx.fillStyle = "#000";
        ctx.fillRect(e.x + 10, e.y + 10, 5, 5);
        ctx.fillRect(e.x + 25, e.y + 10, 5, 5);
    });

    // Draw enemy bullets
    ctx.fillStyle = "#ff0000";
    enemyBullets.forEach(eb => ctx.fillRect(eb.x, eb.y, eb.width, eb.height));

    if (gameRunning) requestAnimationFrame(() => {
        update();
        draw();
    });
}

function endGame() {
    gameRunning = false;
    finalScoreEl.innerText = score;
    modal.classList.remove("hide");
    saveScore('Space Defenders', score);
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

restartBtn.onclick = () => location.reload();

initEnemies();
draw();
