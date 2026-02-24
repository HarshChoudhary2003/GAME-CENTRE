const icons = [
    'fa-ghost', 'fa-ghost',
    'fa-robot', 'fa-robot',
    'fa-rocket', 'fa-rocket',
    'fa-dragon', 'fa-dragon',
    'fa-bomb', 'fa-bomb',
    'fa-gem', 'fa-gem',
    'fa-bolt', 'fa-bolt',
    'fa-star', 'fa-star'
];

let flippedCards = [];
let matchedCount = 0;
let moves = 0;
let timer = null;
let seconds = 0;
let isLocked = false;

const board = document.getElementById('game-board');
const movesEl = document.getElementById('moves');
const timerEl = document.getElementById('timer');
const winModal = document.getElementById('win-modal');

function shuffle(array) {
    return array.sort(() => Math.random() - 0.5);
}

function createBoard() {
    board.innerHTML = '';
    const shuffledIcons = shuffle([...icons]);
    shuffledIcons.forEach(icon => {
        const card = document.createElement('div');
        card.className = 'card';
        card.innerHTML = `
            <div class="card-face card-front"></div>
            <div class="card-face card-back"><i class="fas ${icon}"></i></div>
        `;
        card.addEventListener('click', () => flipCard(card));
        board.appendChild(card);
    });
}

function flipCard(card) {
    if (isLocked || card.classList.contains('flipped') || flippedCards.includes(card)) return;

    if (!timer) startTimer();

    card.classList.add('flipped');
    flippedCards.push(card);

    if (flippedCards.length === 2) {
        checkMatch();
    }
}

function checkMatch() {
    isLocked = true;
    moves++;
    movesEl.innerText = moves;

    const [card1, card2] = flippedCards;
    const icon1 = card1.querySelector('i').classList[1];
    const icon2 = card2.querySelector('i').classList[1];

    if (icon1 === icon2) {
        matchedCount += 2;
        flippedCards = [];
        isLocked = false;
        if (matchedCount === icons.length) handleWin();
    } else {
        setTimeout(() => {
            card1.classList.remove('flipped');
            card2.classList.remove('flipped');
            flippedCards = [];
            isLocked = false;
        }, 1000);
    }
}

function startTimer() {
    seconds = 0;
    timer = setInterval(() => {
        seconds++;
        const mins = Math.floor(seconds / 60).toString().padStart(2, '0');
        const secs = (seconds % 60).toString().padStart(2, '0');
        timerEl.innerText = `${mins}:${secs}`;
    }, 1000);
}

function handleWin() {
    clearInterval(timer);
    document.getElementById('final-moves').innerText = moves;
    document.getElementById('final-time').innerText = timerEl.innerText;
    winModal.classList.remove('hide');
    saveScore('Memory Drift', 10000 - (moves * 100) - (seconds * 10)); // Arbitrary formula
}

function resetGame() {
    clearInterval(timer);
    timer = null;
    seconds = 0;
    moves = 0;
    matchedCount = 0;
    flippedCards = [];
    isLocked = false;
    movesEl.innerText = '0';
    timerEl.innerText = '00:00';
    winModal.classList.add('hide');
    createBoard();
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

document.getElementById('reset-btn').onclick = resetGame;
document.getElementById('play-again').onclick = resetGame;

createBoard();
