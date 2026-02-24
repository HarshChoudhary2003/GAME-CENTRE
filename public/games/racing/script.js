const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");
const scoreEl = document.getElementById("score");
const finalScoreEl = document.getElementById("final-score");
const modal = document.getElementById("game-modal");
const restartBtn = document.getElementById("restart-btn");

let score = 0;
let gameRunning = true;
let enemyCars = [];
let carSpeed = 5;
let playerX = 125;

const player = {
    width: 50,
    height: 80,
    color: "#ffea00"
};

function init() {
    score = 0;
    gameRunning = true;
    enemyCars = [];
    carSpeed = 5;
    playerX = canvas.width / 2 - player.width / 2;
    modal.classList.add("hide");
    requestAnimationFrame(update);
}

function spawnEnemy() {
    const lanes = [10, 85, 160, 235];
    enemyCars.push({
        x: lanes[Math.floor(Math.random() * lanes.length)],
        y: -100,
        width: 50,
        height: 80,
        color: `hsl(${Math.random() * 360}, 70%, 50%)`
    });
}

let leftPressed = false;
let rightPressed = false;

document.addEventListener("keydown", (e) => {
    if (e.key === "ArrowLeft") leftPressed = true;
    if (e.key === "ArrowRight") rightPressed = true;
});

document.addEventListener("keyup", (e) => {
    if (e.key === "ArrowLeft") leftPressed = false;
    if (e.key === "ArrowRight") rightPressed = false;
});

let spawnTimer = 0;
function update() {
    if (!gameRunning) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Road lines
    ctx.strokeStyle = "#fff";
    ctx.setLineDash([20, 20]);
    ctx.beginPath();
    ctx.moveTo(75, 0); ctx.lineTo(75, canvas.height);
    ctx.moveTo(150, 0); ctx.lineTo(150, canvas.height);
    ctx.moveTo(225, 0); ctx.lineTo(225, canvas.height);
    ctx.stroke();

    // Player
    if (leftPressed && playerX > 0) playerX -= 5;
    if (rightPressed && playerX < canvas.width - player.width) playerX += 5;

    ctx.fillStyle = player.color;
    ctx.fillRect(playerX, canvas.height - 100, player.width, player.height);
    // Windshield
    ctx.fillStyle = "rgba(255,255,255,0.5)";
    ctx.fillRect(playerX + 5, canvas.height - 80, 40, 20);

    // Enemies
    spawnTimer++;
    if (spawnTimer > 60) {
        spawnEnemy();
        spawnTimer = 0;
    }

    enemyCars.forEach((car, i) => {
        car.y += carSpeed;
        ctx.fillStyle = car.color;
        ctx.fillRect(car.x, car.y, car.width, car.height);

        // Collision
        if (playerX < car.x + car.width && playerX + player.width > car.x && (canvas.height - 100) < car.y + car.height && (canvas.height - 100) + player.height > car.y) {
            endGame();
        }

        if (car.y > canvas.height) {
            enemyCars.splice(i, 1);
            score += 10;
            scoreEl.innerText = score;
            if (score % 100 === 0) carSpeed += 0.5;
        }
    });

    requestAnimationFrame(update);
}

function endGame() {
    gameRunning = false;
    finalScoreEl.innerText = score;
    modal.classList.remove("hide");
    saveScore('Racing Nitro', score);
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

restartBtn.onclick = init;
init();
