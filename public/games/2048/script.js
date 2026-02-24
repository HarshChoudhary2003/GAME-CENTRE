var board;
var score = 0;
var rows = 4;
var columns = 4;

window.onload = function () {
    setGame();
    document.getElementById("new-game-btn").addEventListener("click", resetGame);
    document.getElementById("try-again-btn").addEventListener("click", resetGame);
}

function setGame() {
    board = [
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0]
    ]

    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < columns; c++) {
            let tile = document.getElementById(r.toString() + "-" + c.toString());
            updateTile(tile, 0);
        }
    }

    setTwo();
    setTwo();

    // Load best score
    const savedStats = JSON.parse(localStorage.getItem('arcade_scores')) || [];
    const stat = savedStats.find(s => s.game === '2048 Nexus');
    document.getElementById("best").innerText = stat ? stat.score : 0;
}

function updateTile(tile, num) {
    tile.innerText = "";
    tile.classList.value = ""; //clear classList
    tile.classList.add("grid-cell");
    if (num > 0) {
        tile.innerText = num.toString();
        if (num <= 2048) {
            tile.classList.add("tile-" + num.toString());
        } else {
            tile.classList.add("tile-2048");
        }
    }
}

function resetGame() {
    score = 0;
    document.getElementById("score").innerText = "0";
    document.getElementById("game-status").classList.add("hide");
    setGame();
}

function hasEmptyTile() {
    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < columns; c++) {
            if (board[r][c] == 0) return true;
        }
    }
    return false;
}

function setTwo() {
    if (!hasEmptyTile()) return;
    let found = false;
    while (!found) {
        let r = Math.floor(Math.random() * rows);
        let c = Math.floor(Math.random() * columns);
        if (board[r][c] == 0) {
            board[r][c] = 2;
            let tile = document.getElementById(r.toString() + "-" + c.toString());
            updateTile(tile, 2);
            found = true;
        }
    }
}

function filterZero(row) {
    return row.filter(num => num != 0); //create new array of all nums != 0
}

function slide(row) {
    row = filterZero(row);
    for (let i = 0; i < row.length - 1; i++) {
        if (row[i] == row[i + 1]) {
            row[i] *= 2;
            row[i + 1] = 0;
            score += row[i];
        }
    }
    row = filterZero(row);
    while (row.length < columns) {
        row.push(0);
    }
    return row;
}

document.addEventListener('keyup', (e) => {
    let boardChanged = false;
    let oldBoard = JSON.stringify(board);

    if (e.code == "ArrowLeft" || e.code == "KeyA") {
        slideLeft();
        boardChanged = oldBoard !== JSON.stringify(board);
    }
    else if (e.code == "ArrowRight" || e.code == "KeyD") {
        slideRight();
        boardChanged = oldBoard !== JSON.stringify(board);
    }
    else if (e.code == "ArrowUp" || e.code == "KeyW") {
        slideUp();
        boardChanged = oldBoard !== JSON.stringify(board);
    }
    else if (e.code == "ArrowDown" || e.code == "KeyS") {
        slideDown();
        boardChanged = oldBoard !== JSON.stringify(board);
    }

    if (boardChanged) {
        document.getElementById("score").innerText = score;
        setTwo();
        if (checkGameOver()) endGame();
    }
});

function slideLeft() {
    for (let r = 0; r < rows; r++) {
        let row = board[r];
        row = slide(row);
        board[r] = row;
        for (let c = 0; c < columns; c++) {
            let tile = document.getElementById(r.toString() + "-" + c.toString());
            let num = board[r][c];
            updateTile(tile, num);
        }
    }
}

function slideRight() {
    for (let r = 0; r < rows; r++) {
        let row = board[r];
        row.reverse();
        row = slide(row);
        board[r] = row.reverse();
        for (let c = 0; c < columns; c++) {
            let tile = document.getElementById(r.toString() + "-" + c.toString());
            let num = board[r][c];
            updateTile(tile, num);
        }
    }
}

function slideUp() {
    for (let c = 0; c < columns; c++) {
        let row = [board[0][c], board[1][c], board[2][c], board[3][c]];
        row = slide(row);
        for (let r = 0; r < rows; r++) {
            board[r][c] = row[r];
            let tile = document.getElementById(r.toString() + "-" + c.toString());
            let num = board[r][c];
            updateTile(tile, num);
        }
    }
}

function slideDown() {
    for (let c = 0; c < columns; c++) {
        let row = [board[0][c], board[1][c], board[2][c], board[3][c]];
        row.reverse();
        row = slide(row);
        row.reverse();
        for (let r = 0; r < rows; r++) {
            board[r][c] = row[r];
            let tile = document.getElementById(r.toString() + "-" + c.toString());
            let num = board[r][c];
            updateTile(tile, num);
        }
    }
}

function checkGameOver() {
    if (hasEmptyTile()) return false;
    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < columns; c++) {
            if (c < 3 && board[r][c] == board[r][c + 1]) return false;
            if (r < 3 && board[r][c] == board[r + 1][c]) return false;
        }
    }
    return true;
}

function endGame() {
    document.getElementById("game-status").classList.remove("hide");
    saveScore('2048 Nexus', score);
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
