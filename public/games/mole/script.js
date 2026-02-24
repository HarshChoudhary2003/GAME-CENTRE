let currMoleTile;
let currPlantTile;
let score = 0;
let gameOver = false;
let timeRemaining = 30;
let gameTimer;

window.onload = function () {
    setGame();
    document.getElementById("resetButton").addEventListener("click", resetGame);
}

function setGame() {
    //set up the grid in html
    const board = document.getElementById("board");
    board.innerHTML = ""; // Clear existing

    for (let i = 0; i < 9; i++) {
        let tile = document.createElement("div");
        tile.id = i.toString();
        tile.addEventListener("click", selectTile);
        board.appendChild(tile);
    }

    // Start intervals
    setInterval(setMole, 800);
    setInterval(setPlant, 1500);

    // Start countdown
    gameTimer = setInterval(countdown, 1000);
}

function countdown() {
    if (gameOver) return;

    timeRemaining--;
    document.getElementById("timer").innerText = timeRemaining;

    if (timeRemaining <= 0) {
        endGame();
    }
}

function getRandomTile() {
    let num = Math.floor(Math.random() * 9);
    return num.toString();
}

function setMole() {
    if (gameOver) return;

    if (currMoleTile) {
        currMoleTile.innerHTML = "";
    }

    let mole = document.createElement("img");
    mole.src = "assets/monty-mole.png";

    let num = getRandomTile();
    if (currPlantTile && currPlantTile.id == num) return;

    currMoleTile = document.getElementById(num);
    currMoleTile.appendChild(mole);

    // Animation trigger
    setTimeout(() => mole.classList.add("show"), 10);

    // Auto-hide mole after some time
    setTimeout(() => {
        if (mole.parentElement) mole.classList.remove("show");
    }, 700);
}

function setPlant() {
    if (gameOver) return;

    if (currPlantTile) {
        currPlantTile.innerHTML = "";
    }

    let plant = document.createElement("img");
    plant.src = "assets/piranha-plant.png";

    let num = getRandomTile();
    if (currMoleTile && currMoleTile.id == num) return;

    currPlantTile = document.getElementById(num);
    currPlantTile.appendChild(plant);

    setTimeout(() => plant.classList.add("show"), 10);

    setTimeout(() => {
        if (plant.parentElement) plant.classList.remove("show");
    }, 1200);
}

function selectTile(e) {
    if (gameOver) return;

    // Check if we clicked the image inside the pipe
    const target = e.target;

    if (target.tagName === 'IMG') {
        const parent = target.parentElement;

        if (parent == currMoleTile) {
            score += 10;
            document.getElementById("score").innerText = score;
            target.classList.remove("show"); // Hide on hit

            // Pop effect? (optional)
        }
        else if (parent == currPlantTile) {
            endGame();
        }
    }
}

function endGame() {
    gameOver = true;
    clearInterval(gameTimer);
    document.getElementById("final-score-val").innerText = score;
    document.getElementById("game-over-modal").classList.remove("hide");

    // Save score to global leaderboard
    saveScore('Whack-a-Mole', score);
}

function resetGame() {
    score = 0;
    timeRemaining = 30;
    gameOver = false;
    document.getElementById("score").innerText = "0";
    document.getElementById("timer").innerText = "30";
    document.getElementById("game-over-modal").classList.add("hide");

    if (currMoleTile) currMoleTile.innerHTML = "";
    if (currPlantTile) currPlantTile.innerHTML = "";

    // Restart timer
    clearInterval(gameTimer);
    gameTimer = setInterval(countdown, 1000);
}

function saveScore(game, points) {
    const username = localStorage.getItem('arcade_username') || 'Player';
    let scores = JSON.parse(localStorage.getItem('arcade_scores')) || [];

    // Update score logic
    const userScoreIndex = scores.findIndex(s => s.name === username && s.game === game);
    if (userScoreIndex > -1) {
        if (points > scores[userScoreIndex].score) {
            scores[userScoreIndex].score = points; // Save high score
        }
    } else {
        scores.push({ name: username, game: game, score: points });
    }

    scores.sort((a, b) => b.score - a.score);
    localStorage.setItem('arcade_scores', JSON.stringify(scores.slice(0, 5)));
}