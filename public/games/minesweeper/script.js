const grid = document.getElementById("mine-grid");
const minesLeftEl = document.getElementById("mines-left");
const timerEl = document.getElementById("timer");
const modal = document.getElementById("game-modal");
const modalTitle = document.getElementById("modal-title");
const finalTimeEl = document.getElementById("final-time");
const restartBtn = document.getElementById("restart-btn");

let width = 10;
let bombAmount = 10;
let flags = 0;
let squares = [];
let isGameOver = false;
let startTime;
let timerId;

function createBoard() {
    isGameOver = false;
    flags = 0;
    minesLeftEl.innerText = bombAmount;
    timerEl.innerText = "000";
    grid.innerHTML = "";
    squares = [];
    clearInterval(timerId);

    // Get shuffled game array with random bombs
    const bombsArray = Array(bombAmount).fill('bomb');
    const emptyArray = Array(width * width - bombAmount).fill('valid');
    const gameArray = emptyArray.concat(bombsArray);
    const shuffledArray = gameArray.sort(() => Math.random() - 0.5);

    for (let i = 0; i < width * width; i++) {
        const square = document.createElement('div');
        square.setAttribute('id', i);
        square.classList.add('cell');
        square.classList.add(shuffledArray[i]);
        grid.appendChild(square);
        squares.push(square);

        // Normal click
        square.addEventListener('click', function (e) {
            click(square);
        });

        // Control and Right click
        square.oncontextmenu = function (e) {
            e.preventDefault();
            addFlag(square);
        }
    }

    // Add numbers
    for (let i = 0; i < squares.length; i++) {
        let total = 0;
        const isLeftEdge = (i % width === 0);
        const isRightEdge = (i % width === width - 1);

        if (squares[i].classList.contains('valid')) {
            if (i > 0 && !isLeftEdge && squares[i - 1].classList.contains('bomb')) total++;
            if (i > 9 && !isRightEdge && squares[i + 1 - width].classList.contains('bomb')) total++;
            if (i > 10 && squares[i - width].classList.contains('bomb')) total++;
            if (i > 11 && !isLeftEdge && squares[i - 1 - width].classList.contains('bomb')) total++;
            if (i < 98 && !isRightEdge && squares[i + 1].classList.contains('bomb')) total++;
            if (i < 90 && !isLeftEdge && squares[i - 1 + width].classList.contains('bomb')) total++;
            if (i < 88 && !isRightEdge && squares[i + 1 + width].classList.contains('bomb')) total++;
            if (i < 89 && squares[i + width].classList.contains('bomb')) total++;
            squares[i].setAttribute('data', total);
        }
    }
}

function startTimer() {
    startTime = Date.now();
    timerId = setInterval(() => {
        const elapsed = Math.floor((Date.now() - startTime) / 1000);
        timerEl.innerText = elapsed.toString().padStart(3, '0');
    }, 1000);
}

function addFlag(square) {
    if (isGameOver) return;
    if (!square.classList.contains('revealed') && (flags < bombAmount)) {
        if (!square.classList.contains('flag')) {
            square.classList.add('flag');
            square.innerHTML = '<i class="fas fa-flag"></i>';
            flags++;
            minesLeftEl.innerText = bombAmount - flags;
            checkForWin();
        } else {
            square.classList.remove('flag');
            square.innerHTML = '';
            flags--;
            minesLeftEl.innerText = bombAmount - flags;
        }
    }
}

function click(square) {
    if (isGameOver || square.classList.contains('revealed') || square.classList.contains('flag')) return;

    if (!startTime || timerEl.innerText === "000") startTimer();

    if (square.classList.contains('bomb')) {
        gameOver(square);
    } else {
        let total = square.getAttribute('data');
        if (total != 0) {
            square.classList.add('revealed');
            square.innerHTML = total;
            square.classList.add('n' + total);
            return;
        }
        checkSquare(square, square.id);
    }
    square.classList.add('revealed');
}

function checkSquare(square, currentId) {
    const isLeftEdge = (currentId % width === 0);
    const isRightEdge = (currentId % width === width - 1);

    setTimeout(() => {
        if (currentId > 0 && !isLeftEdge) {
            const newId = squares[parseInt(currentId) - 1].id;
            const newSquare = document.getElementById(newId);
            click(newSquare);
        }
        if (currentId > 9 && !isRightEdge) {
            const newId = squares[parseInt(currentId) + 1 - width].id;
            const newSquare = document.getElementById(newId);
            click(newSquare);
        }
        if (currentId > 10) {
            const newId = squares[parseInt(currentId) - width].id;
            const newSquare = document.getElementById(newId);
            click(newSquare);
        }
        if (currentId > 11 && !isLeftEdge) {
            const newId = squares[parseInt(currentId) - 1 - width].id;
            const newSquare = document.getElementById(newId);
            click(newSquare);
        }
        if (currentId < 99 && !isRightEdge) {
            const newId = squares[parseInt(currentId) + 1].id;
            const newSquare = document.getElementById(newId);
            click(newSquare);
        }
        if (currentId < 90 && !isLeftEdge) {
            const newId = squares[parseInt(currentId) - 1 + width].id;
            const newSquare = document.getElementById(newId);
            click(newSquare);
        }
        if (currentId < 88 && !isRightEdge) {
            const newId = squares[parseInt(currentId) + 1 + width].id;
            const newSquare = document.getElementById(newId);
            click(newSquare);
        }
        if (currentId < 89) {
            const newId = squares[parseInt(currentId) + width].id;
            const newSquare = document.getElementById(newId);
            click(newSquare);
        }
    }, 10);
}

function gameOver(square) {
    isGameOver = true;
    clearInterval(timerId);
    modalTitle.innerText = "SYSTEM CRASHED";
    finalTimeEl.innerText = timerEl.innerText;
    modal.classList.remove('hide');

    // Show all bombs
    squares.forEach(s => {
        if (s.classList.contains('bomb')) {
            s.innerHTML = '<i class="fas fa-bomb"></i>';
            s.classList.add('revealed');
            s.classList.add('mine');
        }
    });
}

function checkForWin() {
    let matches = 0;
    for (let i = 0; i < squares.length; i++) {
        if (squares[i].classList.contains('flag') && squares[i].classList.contains('bomb')) {
            matches++;
        }
        if (matches === bombAmount) {
            isGameOver = true;
            clearInterval(timerId);
            modalTitle.innerText = "THREAT NEUTRALIZED";
            finalTimeEl.innerText = timerEl.innerText;
            modal.classList.remove('hide');
            saveScore('Minesweeper Pro', 1000 - parseInt(timerEl.innerText));
        }
    }
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

restartBtn.onclick = () => {
    modal.classList.add('hide');
    createBoard();
};

createBoard();
