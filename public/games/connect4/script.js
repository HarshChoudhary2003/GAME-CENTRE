var playerRed = "R";
var playerYellow = "Y";
var currPlayer = playerRed;

var gameOver = false;
var board;

var rows = 6;
var columns = 7;
var currColumns = []; //tracks which row each column is at

window.onload = function () {
    setGame();
    document.getElementById("reset-btn").addEventListener("click", resetGame);
}

function setGame() {
    board = [];
    currColumns = [5, 5, 5, 5, 5, 5, 5];
    const boardEl = document.getElementById("board");
    boardEl.innerHTML = "";

    for (let r = 0; r < rows; r++) {
        let row = [];
        for (let c = 0; c < columns; c++) {
            row.push(' ');
            let tile = document.createElement("div");
            tile.id = r.toString() + "-" + c.toString();
            tile.classList.add("tile");
            tile.addEventListener("click", setPiece);
            boardEl.append(tile);
        }
        board.push(row);
    }
}

function setPiece() {
    if (gameOver) return;

    let coords = this.id.split("-");
    let c = parseInt(coords[1]);

    let r = currColumns[c];

    if (r < 0) return; //column full

    board[r][c] = currPlayer;
    let tile = document.getElementById(r.toString() + "-" + c.toString());
    if (currPlayer == playerRed) {
        tile.classList.add("red-piece");
        currPlayer = playerYellow;
        document.getElementById("turn-indicator").innerText = "Yellow's Turn";
    }
    else {
        tile.classList.add("yellow-piece");
        currPlayer = playerRed;
        document.getElementById("turn-indicator").innerText = "Red's Turn";
    }

    r -= 1;
    currColumns[c] = r;

    checkWinner();
}

function checkWinner() {
    // horizontal
    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < columns - 3; c++) {
            if (board[r][c] != ' ') {
                if (board[r][c] == board[r][c + 1] && board[r][c + 1] == board[r][c + 2] && board[r][c + 2] == board[r][c + 3]) {
                    setWinner(r, c);
                    return;
                }
            }
        }
    }

    // vertical
    for (let c = 0; c < columns; c++) {
        for (let r = 0; r < rows - 3; r++) {
            if (board[r][c] != ' ') {
                if (board[r][c] == board[r + 1][c] && board[r + 1][c] == board[r + 2][c] && board[r + 2][c] == board[r + 3][c]) {
                    setWinner(r, c);
                    return;
                }
            }
        }
    }

    // anti diagonal
    for (let r = 0; r < rows - 3; r++) {
        for (let c = 0; c < columns - 3; c++) {
            if (board[r][c] != ' ') {
                if (board[r][c] == board[r + 1][c + 1] && board[r + 1][c + 1] == board[r + 2][c + 2] && board[r + 2][c + 2] == board[r + 3][c + 3]) {
                    setWinner(r, c);
                    return;
                }
            }
        }
    }

    // diagonal
    for (let r = 3; r < rows; r++) {
        for (let c = 0; c < columns - 3; c++) {
            if (board[r][c] != ' ') {
                if (board[r][c] == board[r - 1][c + 1] && board[r - 1][c + 1] == board[r - 2][c + 2] && board[r - 2][c + 2] == board[r - 3][c + 3]) {
                    setWinner(r, c);
                    return;
                }
            }
        }
    }
}

function setWinner(r, c) {
    gameOver = true;
    let winner = document.getElementById("winner-msg");
    if (board[r][c] == playerRed) {
        winner.innerText = "Red Wins!";
        saveScore('Connect 4', 10);
    } else {
        winner.innerText = "Yellow Wins!";
    }
    document.getElementById("msg-container").classList.remove("hide");
}

function resetGame() {
    currPlayer = playerRed;
    gameOver = false;
    document.getElementById("turn-indicator").innerText = "Red's Turn";
    document.getElementById("msg-container").classList.add("hide");
    setGame();
}

function saveScore(game, points) {
    const username = localStorage.getItem('arcade_username') || 'Player';
    let scores = JSON.parse(localStorage.getItem('arcade_scores')) || [];

    const userScoreIndex = scores.findIndex(s => s.name === username && s.game === game);
    if (userScoreIndex > -1) {
        scores[userScoreIndex].score += points;
    } else {
        scores.push({ name: username, game: game, score: points });
    }

    scores.sort((a, b) => b.score - a.score);
    localStorage.setItem('arcade_scores', JSON.stringify(scores.slice(0, 5)));
}
