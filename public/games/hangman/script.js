const wordList = ["FIREWALL", "NODEJS", "CYBER", "ROBOT", "DATABASE", "ENCRYPT", "BINARY", "PROTOCOL", "NETWORK", "ALGORITHM"];
let selectedWord = "";
let guessedLetters = [];
let lives = 6;

const wordDisplay = document.getElementById("word-display");
const keyboard = document.getElementById("keyboard");
const livesEl = document.getElementById("lives");
const modal = document.getElementById("game-modal");
const modalTitle = document.getElementById("modal-title");
const correctWordEl = document.getElementById("correct-word");
const restartBtn = document.getElementById("restart-btn");
const parts = document.querySelectorAll(".part");

function initGame() {
    selectedWord = wordList[Math.floor(Math.random() * wordList.length)];
    guessedLetters = [];
    lives = 6;
    livesEl.innerText = lives;
    modal.classList.add("hide");

    parts.forEach(p => p.classList.add("hide"));

    // Draw word slots
    wordDisplay.innerHTML = "";
    selectedWord.split("").forEach(() => {
        const slot = document.createElement("div");
        slot.className = "letter-slot";
        wordDisplay.appendChild(slot);
    });

    // Draw keyboard
    keyboard.innerHTML = "";
    "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("").forEach(char => {
        const key = document.createElement("div");
        key.className = "key";
        key.innerText = char;
        key.addEventListener("click", () => handleGuess(char, key));
        keyboard.appendChild(key);
    });
}

function handleGuess(letter, keyElement) {
    if (keyElement.classList.contains("used") || lives <= 0) return;

    keyElement.classList.add("used");
    guessedLetters.push(letter);

    if (selectedWord.includes(letter)) {
        updateWordDisplay();
        checkWin();
    } else {
        lives--;
        livesEl.innerText = lives;
        parts[6 - lives - 1].classList.remove("hide");
        if (lives === 0) endGame(false);
    }
}

function updateWordDisplay() {
    const slots = document.querySelectorAll(".letter-slot");
    selectedWord.split("").forEach((char, i) => {
        if (guessedLetters.includes(char)) {
            slots[i].innerText = char;
        }
    });
}

function checkWin() {
    const slots = document.querySelectorAll(".letter-slot");
    const isWin = Array.from(slots).every(slot => slot.innerText !== "");
    if (isWin) endGame(true);
}

function endGame(isWin) {
    modal.classList.remove("hide");
    modalTitle.innerText = isWin ? "ACCESS GRANTED" : "ACCESS DENIED";
    modalTitle.style.color = isWin ? "var(--primary)" : "#ff3e3e";
    correctWordEl.innerText = selectedWord;
    if (isWin) saveScore('Hangman Cyber', lives * 100);
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

restartBtn.onclick = initGame;
initGame();
