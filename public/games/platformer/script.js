const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");
const scoreEl = document.getElementById("score");
const modal = document.getElementById("game-modal");
const restartBtn = document.getElementById("restart-btn");

let score = 0;
let gameRunning = true;
let friction = 0.8;
let gravity = 0.5;

const player = {
    x: 50,
    y: 300,
    width: 30,
    height: 30,
    speed: 5,
    velX: 0,
    velY: 0,
    jumpForce: 12,
    grounded: false
};

const platforms = [
    { x: 0, y: 380, width: 800, height: 20 },
    { x: 100, y: 300, width: 150, height: 20 },
    { x: 350, y: 220, width: 150, height: 20 },
    { x: 600, y: 300, width: 150, height: 20 },
    { x: 200, y: 140, width: 100, height: 20 },
    { x: 500, y: 100, width: 200, height: 20 }
];

const coins = [
    { x: 150, y: 270, collected: false },
    { x: 400, y: 190, collected: false },
    { x: 650, y: 270, collected: false },
    { x: 250, y: 110, collected: false },
    { x: 600, y: 70, collected: false }
];

let keys = {};
document.addEventListener("keydown", (e) => { keys[e.code] = true; });
document.addEventListener("keyup", (e) => { keys[e.code] = false; });

function update() {
    if (!gameRunning) return;

    // Movement
    if (keys["ArrowUp"] || keys["Space"]) {
        if (!player.jumping && player.grounded) {
            player.velY = -player.jumpForce;
            player.grounded = false;
        }
    }
    if (keys["ArrowRight"]) {
        if (player.velX < player.speed) player.velX++;
    }
    if (keys["ArrowLeft"]) {
        if (player.velX > -player.speed) player.velX--;
    }

    player.velX *= friction;
    player.velY += gravity;

    player.grounded = false;
    platforms.forEach(p => {
        // Simple collision
        if (player.x < p.x + p.width && player.x + player.width > p.x && player.y < p.y + p.height && player.y + player.height > p.y) {
            if (player.velY > 0) { // falling
                player.grounded = true;
                player.velY = 0;
                player.y = p.y - player.height;
            } else {
                player.velY *= -1;
            }
        }
    });

    player.x += player.velX;
    player.y += player.velY;

    // Boundaries
    if (player.x < 0) player.x = 0;
    if (player.x > canvas.width - player.width) player.x = canvas.width - player.width;
    if (player.y > canvas.height) endGame();

    // Coins
    coins.forEach(c => {
        if (!c.collected && player.x < c.x + 20 && player.x + player.width > c.x && player.y < c.y + 20 && player.y + player.height > c.y) {
            c.collected = true;
            score += 100;
            scoreEl.innerText = score;
            if (coins.every(coin => coin.collected)) {
                // Reset coins if all collected
                coins.forEach(coin => coin.collected = false);
            }
        }
    });

    draw();
    requestAnimationFrame(update);
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Platforms
    ctx.fillStyle = "#1e214d";
    platforms.forEach(p => {
        ctx.fillRect(p.x, p.y, p.width, p.height);
        ctx.strokeStyle = "#00f2ff";
        ctx.strokeRect(p.x, p.y, p.width, p.height);
    });

    // Coins
    ctx.fillStyle = "#ffea00";
    coins.forEach(c => {
        if (!c.collected) {
            ctx.beginPath();
            ctx.arc(c.x + 10, c.y + 10, 8, 0, Math.PI * 2);
            ctx.fill();
            ctx.shadowBlur = 10;
            ctx.shadowColor = "#ffea00";
        }
    });
    ctx.shadowBlur = 0;

    // Player
    ctx.fillStyle = "#ff007a";
    ctx.fillRect(player.x, player.y, player.width, player.height);
    ctx.shadowBlur = 15;
    ctx.shadowColor = "#ff007a";
}

function endGame() {
    gameRunning = false;
    document.getElementById("final-score").innerText = score;
    modal.classList.remove("hide");
    saveScore('Cyber Platformer', score);
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
update();
