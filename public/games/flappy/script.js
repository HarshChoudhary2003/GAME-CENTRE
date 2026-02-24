const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const scoreEl = document.getElementById('score');
const gameOverEl = document.getElementById('game-over');
const finalScoreEl = document.getElementById('final-score');
const restartBtn = document.getElementById('restart-btn');
const startHint = document.getElementById('start-hint');

// Game state
let bird = { x: 50, y: 150, width: 20, height: 20, gravity: 0.6, lift: -10, velocity: 0 };
let pipes = [];
let frame = 0;
let score = 0;
let gameRunning = false;

function init() {
    bird.y = 150;
    bird.velocity = 0;
    pipes = [];
    score = 0;
    frame = 0;
    scoreEl.innerText = score;
    gameOverEl.classList.add('hide');
    startHint.classList.remove('hide');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    gameRunning = false;
    draw();
}

function startGame() {
    if (gameRunning) return;
    gameRunning = true;
    startHint.classList.add('hide');
    animate();
}

function draw() {
    // Clear
    ctx.fillStyle = '#111';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Draw Bird
    ctx.fillStyle = '#00ff41';
    ctx.shadowBlur = 10;
    ctx.shadowColor = '#00ff41';
    ctx.fillRect(bird.x, bird.y, bird.width, bird.height);
    ctx.shadowBlur = 0;

    // Draw Pipes
    pipes.forEach(pipe => {
        ctx.fillStyle = '#1e214d';
        ctx.fillRect(pipe.x, 0, pipe.width, pipe.top);
        ctx.fillRect(pipe.x, canvas.height - pipe.bottom, pipe.width, pipe.bottom);

        ctx.strokeStyle = '#00f2ff';
        ctx.lineWidth = 2;
        ctx.strokeRect(pipe.x, 0, pipe.width, pipe.top);
        ctx.strokeRect(pipe.x, canvas.height - pipe.bottom, pipe.width, pipe.bottom);
    });
}

function update() {
    frame++;
    bird.velocity += bird.gravity;
    bird.y += bird.velocity;

    // Collision with ground/ceiling
    if (bird.y + bird.height > canvas.height || bird.y < 0) {
        endGame();
    }

    // Generate pipes
    if (frame % 80 === 0) {
        let gap = 120;
        let minHeight = 20;
        let maxHeight = canvas.height - gap - minHeight;
        let topHeight = Math.floor(Math.random() * (maxHeight - minHeight + 1)) + minHeight;
        pipes.push({
            x: canvas.width,
            width: 40,
            top: topHeight,
            bottom: canvas.height - topHeight - gap
        });
    }

    // Move pipes
    pipes.forEach((pipe, index) => {
        pipe.x -= 3;

        // Collision detection
        if (
            bird.x < pipe.x + pipe.width &&
            bird.x + bird.width > pipe.x &&
            (bird.y < pipe.top || bird.y + bird.height > canvas.height - pipe.bottom)
        ) {
            endGame();
        }

        // Score
        if (pipe.x + pipe.width === bird.x) {
            score++;
            scoreEl.innerText = score;
        }

        // Remove old pipes
        if (pipe.x + pipe.width < 0) {
            pipes.splice(index, 1);
        }
    });
}

function animate() {
    if (!gameRunning) return;
    update();
    draw();
    requestAnimationFrame(animate);
}

function endGame() {
    gameRunning = false;
    finalScoreEl.innerText = score;
    gameOverEl.classList.remove('hide');
    saveScore('Cyber Bird', score);
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

window.addEventListener('keydown', e => {
    if (e.code === 'Space') {
        if (!gameRunning) startGame();
        bird.velocity = bird.lift;
    }
});

canvas.addEventListener('mousedown', () => {
    if (!gameRunning) startGame();
    bird.velocity = bird.lift;
});

restartBtn.onclick = init;

init();
