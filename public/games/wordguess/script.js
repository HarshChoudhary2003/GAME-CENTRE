const words = ["PLANE", "WORLD", "BRAIN", "MOUSE", "BLOCK", "PANDA", "LIGHT", "SOUND", "GAMER", "CODE"];
let answer = "";
let currentGuess = "";
let guesses = [];
let maxGuesses = 6;
let isGameOver = false;

window.onload = function () {
    initGame();
}

function initGame() {
    answer = words[Math.floor(Math.random() * words.length)];
    currentGuess = "";
    guesses = [];
    isGameOver = false;
    document.getElementById("board").innerHTML = "";
    document.getElementById("game-modal").classList.add("hide");

    for (let i = 0; i < 30; i++) {
        let tile = document.createElement("div");
        tile.className = "tile";
        tile.id = "tile-" + i;
        document.getElementById("board").appendChild(tile);
    }

    createKeyboard();
}

function createKeyboard() {
    const kb = document.getElementById("keyboard");
    kb.innerHTML = "";
    const rows = [
        "QWERTYUIOP".split(""),
        "ASDFGHJKL".split(""),
        ["ENTER", ..."ZXCVBNM".split(""), "BACK"]
    ];

    rows.forEach(row => {
        const rowDiv = document.createElement("div");
        rowDiv.className = "key-row";
        row.forEach(key => {
            const btn = document.createElement("div");
            btn.className = "key" + (key.length > 1 ? " key-big" : "");
            btn.innerText = key;
            btn.onclick = () => handleInput(key);
            rowDiv.appendChild(btn);
        });
        kb.appendChild(rowDiv);
    });
}

function handleInput(key) {
    if (isGameOver) return;

    if (key === "ENTER") {
        if (currentGuess.length === 5) submitGuess();
    } else if (key === "BACK") {
        currentGuess = currentGuess.slice(0, -1);
        updateBoard();
    } else if (currentGuess.length < 5 && key.length === 1) {
        currentGuess += key;
        updateBoard();
    }
}

function updateBoard() {
    let base = guesses.length * 5;
    for (let i = 0; i < 5; i++) {
        let tile = document.getElementById("tile-" + (base + i));
        tile.innerText = currentGuess[i] || "";
        tile.classList.toggle("filled", !!currentGuess[i]);
    }
}

function submitGuess() {
    let result = [];
    let answerArr = answer.split("");
    let guessArr = currentGuess.split("");

    // Identify correct spots
    for (let i = 0; i < 5; i++) {
        if (guessArr[i] === answerArr[i]) {
            result[i] = "correct";
            answerArr[i] = null;
        }
    }

    // Identify present but wrong spots
    for (let i = 0; i < 5; i++) {
        if (result[i]) continue;
        let idx = answerArr.indexOf(guessArr[i]);
        if (idx !== -1) {
            result[i] = "present";
            answerArr[idx] = null;
        } else {
            result[i] = "absent";
        }
    }

    // Update UI
    let base = guesses.length * 5;
    result.forEach((status, i) => {
        let tile = document.getElementById("tile-" + (base + i));
        tile.classList.add(status);
    });

    guesses.push(currentGuess);
    if (currentGuess === answer) {
        endGame(true);
    } else if (guesses.length === maxGuesses) {
        endGame(false);
    }
    currentGuess = "";
}

function endGame(win) {
    isGameOver = true;
    document.getElementById("game-modal").classList.remove("hide");
    document.getElementById("modal-title").innerText = win ? "DECRYPTED" : "SYSTEM LOCKED";
    document.getElementById("correct-word").innerText = answer;
    if (win) saveScore('Word Guess', (maxGuesses - guesses.length + 1) * 100);
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

document.getElementById("restart-btn").onclick = initGame;
