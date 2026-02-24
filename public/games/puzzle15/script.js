var rows = 4;
var columns = 4;

var currTile;
var otherTile; //empty tile

var turns = 0;

var imgOrder = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14", "15", "16"];

window.onload = function () {
    shuffle();
    initBoard();
}

function shuffle() {
    for (let i = 0; i < imgOrder.length; i++) {
        let j = Math.floor(Math.random() * imgOrder.length);
        let temp = imgOrder[i];
        imgOrder[i] = imgOrder[j];
        imgOrder[j] = temp;
    }
}

function initBoard() {
    document.getElementById("board").innerHTML = "";
    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < columns; c++) {
            let tile = document.createElement("div");
            tile.id = r.toString() + "-" + c.toString();
            let val = imgOrder[r * columns + c];
            if (val === "16") {
                tile.className = "tile empty-tile";
            } else {
                tile.className = "tile";
                tile.innerText = val;
            }

            tile.addEventListener("click", () => {
                moveTile(tile);
            });

            document.getElementById("board").append(tile);
        }
    }
}

function moveTile(tile) {
    if (tile.classList.contains("empty-tile")) return;

    let currCoords = tile.id.split("-");
    let r = parseInt(currCoords[0]);
    let c = parseInt(currCoords[1]);

    let emptyTile = document.querySelector(".empty-tile");
    let emptyCoords = emptyTile.id.split("-");
    let r2 = parseInt(emptyCoords[0]);
    let c2 = parseInt(emptyCoords[1]);

    let moveLeft = r == r2 && c2 == c - 1;
    let moveRight = r == r2 && c2 == c + 1;
    let moveUp = c == c2 && r2 == r - 1;
    let moveDown = c == c2 && r2 == r + 1;

    if (moveLeft || moveRight || moveUp || moveDown) {
        let currText = tile.innerText;
        tile.innerText = "";
        tile.classList.add("empty-tile");

        emptyTile.innerText = currText;
        emptyTile.classList.remove("empty-tile");

        turns++;
        document.getElementById("turns").innerText = turns;
        checkWin();
    }
}

function checkWin() {
    let allTiles = document.querySelectorAll(".tile");
    let win = true;
    for (let i = 0; i < 15; i++) {
        if (allTiles[i].innerText != (i + 1).toString()) {
            win = false;
            break;
        }
    }
    if (win) {
        document.getElementById("game-modal").classList.remove("hide");
        document.getElementById("final-turns").innerText = turns;
        saveScore('15 Puzzle', 5000 - turns * 10);
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

document.getElementById("restart-btn").onclick = () => location.reload();
