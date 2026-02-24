const colors = ["#ff007a", "#00ff41", "#00f2ff", "#ffea00", "#9d00ff", "#ff8a00"];
let score = 0;
let timeLeft = 30;
let targetColor = "";
let timerId = null;
let isGameOver = false;

const scoreEl = document.getElementById("score");
const timerEl = document.getElementById("timer");
const targetEl = document.getElementById("target-color");
const optionsEl = document.getElementById("options");
const modal = document.getElementById("game-modal");
const finalScoreEl = document.getElementById("final-score");
const restartBtn = document.getElementById("restart-btn");

function init() {
    score = 0;
    timeLeft = 30;
    isGameOver = false;
    scoreEl.innerText = score;
    timerEl.innerText = timeLeft;
    modal.classList.add("hide");

    generateNewRound();

    if (timerId) clearInterval(timerId);
    timerId = setInterval(() => {
        timeLeft--;
        timerEl.innerText = timeLeft;
        if (timeLeft <= 0) endGame();
    }, 1000);
}

function generateNewRound() {
    targetColor = colors[Math.floor(Math.random() * colors.length)];
    targetEl.style.backgroundColor = targetColor;

    optionsEl.innerHTML = "";
    const shuffled = [...colors].sort(() => Math.random() - 0.5);
    shuffled.forEach(c => {
        const btn = document.createElement("div");
        btn.className = "color-btn";
        btn.style.backgroundColor = c;
        btn.onclick = () => {
            if (isGameOver) return;
            if (c === targetColor) {
                score++;
                scoreEl.innerText = score;
                generateNewRound();
            } else {
                score = Math.max(0, score - 1);
                scoreEl.innerText = score;
            }
        };
        optionsEl.appendChild(btn);
    });
}

function endGame() {
    isGameOver = true;
    clearInterval(timerId);
    finalScoreEl.innerText = score;
    modal.classList.remove("hide");
    saveScore('Color Blast', score);
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
