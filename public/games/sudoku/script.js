var numSelected = null;
var tileSelected = null;

var errors = 0;

var board = [
    "--74-18-5",
    "2---8--91",
    "---3-5--7",
    "-5--6-3-9",
    "---8-4---",
    "9-6-3--2-",
    "2--5-7---",
    "67--1---8",
    "5-42-6--1"
]

var solution = [
    "397421865",
    "253687491",
    "486395217",
    "851762349",
    "723814659",
    "946538127",
    "218547936",
    "679315248",
    "534276981"
]

window.onload = function () {
    setGame();
}

function setGame() {
    // Digits 1-9
    for (let i = 1; i <= 9; i++) {
        let number = document.getElementById("digits").children[i - 1];
        number.addEventListener("click", selectNumber);
    }

    // Board 9x9
    for (let r = 0; r < 9; r++) {
        for (let c = 0; c < 9; c++) {
            let tile = document.createElement("div");
            tile.id = r.toString() + "-" + c.toString();
            if (board[r][c] != "-") {
                tile.innerText = board[r][c];
                tile.classList.add("tile-start");
            }
            if (r == 2 || r == 5) {
                tile.classList.add("horizontal-line");
            }
            if (c == 2 || c == 5) {
                tile.classList.add("vertical-line");
            }
            tile.addEventListener("click", selectTile);
            tile.classList.add("tile");
            document.getElementById("board").append(tile);
        }
    }
}

function selectNumber() {
    if (numSelected != null) {
        numSelected.style.background = "#1e214d";
        numSelected.style.color = "white";
    }
    numSelected = this;
    numSelected.style.background = "var(--primary)";
    numSelected.style.color = "black";
}

function selectTile() {
    if (numSelected) {
        if (this.innerText != "") {
            return;
        }

        // "0-0" "0-1" .. "3-1"
        let coords = this.id.split("-"); //["0", "0"]
        let r = parseInt(coords[0]);
        let c = parseInt(coords[1]);

        if (solution[r][c] == numSelected.innerText) {
            this.innerText = numSelected.innerText;
            this.classList.add("tile-correct");
            checkWin();
        }
        else {
            errors += 1;
            document.getElementById("mistakes").innerText = errors;
            if (errors >= 3) {
                alert("GAME OVER! TOO MANY MISTAKES.");
                location.reload();
            }
        }
    }
}

function checkWin() {
    let tiles = document.querySelectorAll(".tile");
    let complete = true;
    tiles.forEach(t => {
        if (t.innerText === "") complete = false;
    });
    if (complete) {
        document.getElementById("game-modal").classList.remove("hide");
        saveScore('Sudoku Zen', 1000 - errors * 100);
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
