const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");
const scoreEl = document.getElementById("score");
const highScoreEl = document.getElementById("high-score");
const gameOverEl = document.getElementById("game-over");
const finalScoreEl = document.getElementById("final-score");
const restartBtn = document.getElementById("restart-btn");

const gridSize = 20;
const tileCount = canvas.width / gridSize;

let score = 0;
let dx = 0;
let dy = 0;
let snake = [
    { x: 10, y: 10 },
    { x: 10, y: 11 },
    { x: 10, y: 12 }
];
let food = { x: 5, y: 5 };
let gameLoop;
let gameRunning = false;

// Initialize
function init() {
    score = 0;
    dx = 0;
    dy = -1; // Start moving up
    snake = [
        { x: 10, y: 10 },
        { x: 10, y: 11 },
        { x: 10, y: 12 }
    ];
    scoreEl.innerText = score;
    gameOverEl.classList.add("hide");
    if (gameLoop) clearInterval(gameLoop);
    gameLoop = setInterval(draw, 100);
    gameRunning = true;

    // Load local high score
    const savedStats = JSON.parse(localStorage.getItem('arcade_scores')) || [];
    const snakeStat = savedStats.find(s => s.game === 'Snake Neon');
    highScoreEl.innerText = snakeStat ? snakeStat.score : 0;
}

function draw() {
    moveSnake();
    if (checkGameOver()) return;

    // Clear canvas
    ctx.fillStyle = "#05060f";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Draw food
    ctx.fillStyle = "#ff007a";
    ctx.shadowBlur = 15;
    ctx.shadowColor = "#ff007a";
    ctx.beginPath();
    ctx.arc(food.x * gridSize + gridSize / 2, food.y * gridSize + gridSize / 2, gridSize / 2 - 2, 0, Math.PI * 2);
    ctx.fill();

    // Draw snake
    snake.forEach((part, index) => {
        ctx.fillStyle = index === 0 ? "#00ff41" : "#00aa2b";
        ctx.shadowBlur = index === 0 ? 15 : 0;
        ctx.shadowColor = "#00ff41";
        ctx.fillRect(part.x * gridSize + 1, part.y * gridSize + 1, gridSize - 2, gridSize - 2);
    });
    ctx.shadowBlur = 0;
}

function moveSnake() {
    const head = { x: snake[0].x + dx, y: snake[0].y + dy };

    // Wrap around screen
    if (head.x < 0) head.x = tileCount - 1;
    if (head.x >= tileCount) head.x = 0;
    if (head.y < 0) head.y = tileCount - 1;
    if (head.y >= tileCount) head.y = 0;

    snake.unshift(head);

    if (head.x === food.x && head.y === food.y) {
        score += 10;
        scoreEl.innerText = score;
        createFood();
    } else {
        snake.pop();
    }
}

function createFood() {
    food = {
        x: Math.floor(Math.random() * tileCount),
        y: Math.floor(Math.random() * tileCount)
    };
    // Don't spawn on snake
    if (snake.some(part => part.x === food.x && part.y === food.y)) {
        createFood();
    }
}

function checkGameOver() {
    const head = snake[0];
    // Check collision with self
    for (let i = 1; i < snake.length; i++) {
        if (head.x === snake[i].x && head.y === snake[i].y) {
            endGame();
            return true;
        }
    }
    return false;
}

function endGame() {
    gameRunning = false;
    clearInterval(gameLoop);
    finalScoreEl.innerText = score;
    gameOverEl.classList.remove("hide");
    saveScore('Snake Neon', score);
}

function saveScore(game, points) {
    const username = localStorage.getItem('arcade_username') || 'Player';
    let scores = JSON.parse(localStorage.getItem('arcade_scores')) || [];

    const userScoreIndex = scores.findIndex(s => s.name === username && s.game === game);
    if (userScoreIndex > -1) {
        if (points > scores[userScoreIndex].score) {
            scores[userScoreIndex].score = points;
        }
    } else {
        scores.push({ name: username, game: game, score: points });
    }

    scores.sort((a, b) => b.score - a.score);
    localStorage.setItem('arcade_scores', JSON.stringify(scores.slice(0, 5)));
}

window.addEventListener("keydown", e => {
    if (!gameRunning) return;
    switch (e.key.toLowerCase()) {
        case "arrowup": case "w": if (dy !== 1) { dx = 0; dy = -1; } break;
        case "arrowdown": case "s": if (dy !== -1) { dx = 0; dy = 1; } break;
        case "arrowleft": case "a": if (dx !== 1) { dx = -1; dy = 0; } break;
        case "arrowright": case "d": if (dx !== -1) { dx = 1; dy = 0; } break;
    }
});

restartBtn.onclick = init;
init();
