let sequence = [];
let userSequence = [];
let level = 0;
let playingSequence = false;

const buttons = {
    green: document.getElementById("green"),
    red: document.getElementById("red"),
    yellow: document.getElementById("yellow"),
    blue: document.getElementById("blue")
};

const startBtn = document.getElementById("start-btn");
const scoreEl = document.getElementById("score");
const modal = document.getElementById("game-modal");
const finalScoreEl = document.getElementById("final-score");
const restartBtn = document.getElementById("restart-btn");

function nextLevel() {
    level++;
    scoreEl.innerText = level - 1;
    userSequence = [];
    sequence.push(Object.keys(buttons)[Math.floor(Math.random() * 4)]);
    playSequence();
}

async function playSequence() {
    playingSequence = true;
    for (const color of sequence) {
        await flashButton(color);
        await new Promise(r => setTimeout(r, 200));
    }
    playingSequence = false;
}

function flashButton(color) {
    return new Promise(resolve => {
        buttons[color].classList.add("active");
        setTimeout(() => {
            buttons[color].classList.remove("active");
            resolve();
        }, 500);
    });
}

function handleButtonClick(color) {
    if (playingSequence) return;

    userSequence.push(color);
    flashButton(color);

    const index = userSequence.length - 1;
    if (userSequence[index] !== sequence[index]) {
        endGame();
        return;
    }

    if (userSequence.length === sequence.length) {
        setTimeout(nextLevel, 1000);
    }
}

function endGame() {
    finalScoreEl.innerText = level - 1;
    modal.classList.remove("hide");
    saveScore('Simon Glow', level - 1);
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

Object.keys(buttons).forEach(color => {
    buttons[color].onclick = () => handleButtonClick(color);
});

startBtn.onclick = () => {
    startBtn.classList.add("hide");
    sequence = [];
    level = 0;
    nextLevel();
};

restartBtn.onclick = () => {
    modal.classList.add("hide");
    startBtn.classList.remove("hide");
    scoreEl.innerText = "0";
};
