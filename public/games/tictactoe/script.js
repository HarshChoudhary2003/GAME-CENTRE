let boxes = document.querySelectorAll(".box");
let resetbtn = document.querySelector("#reset-btn");
let newGameBtn = document.querySelector("#new-btn");
let msgContainer = document.querySelector(".msg-container");
let msg = document.querySelector("#msg");
let turnIndicator = document.querySelector("#turn-indicator");

let turnO = false; // Start with X
let count = 0; // To track draw

const winPatterns = [
    [0, 1, 2], [0, 3, 6], [0, 4, 8],
    [1, 4, 7], [2, 5, 8], [2, 4, 6],
    [3, 4, 5], [6, 7, 8],
];

const resetGame = () => {
    turnO = false;
    count = 0;
    enableBoxes();
    msgContainer.classList.add("hide");
    turnIndicator.innerText = "Player X's Turn";
};

boxes.forEach((box) => {
    box.addEventListener("click", () => {
        if (turnO) {
            box.innerText = "O";
            box.setAttribute("data-player", "O");
            turnIndicator.innerText = "Player X's Turn";
            turnO = false;
        } else {
            box.innerText = "X";
            box.setAttribute("data-player", "X");
            turnIndicator.innerText = "Player O's Turn";
            turnO = true;
        }
        box.disabled = true;
        count++;

        let isWinner = checkWinner();

        if (count === 9 && !isWinner) {
            gameDraw();
        }
    });
});

const gameDraw = () => {
    msg.innerText = "It's a Draw!";
    msgContainer.classList.remove("hide");
    disableBoxes();
};

const disableBoxes = () => {
    for (let box of boxes) {
        box.disabled = true;
    }
};

const enableBoxes = () => {
    for (let box of boxes) {
        box.disabled = false;
        box.innerText = "";
        box.removeAttribute("data-player");
    }
};

const showWinner = (winner) => {
    msg.innerText = `Victory for ${winner}!`;
    msgContainer.classList.remove("hide");
    disableBoxes();

    // Save to high scores if applicable
    saveScore('Tic-Tac-Toe', 10);
};

function checkWinner() {
    for (let pattern of winPatterns) {
        let pos1Val = boxes[pattern[0]].innerText;
        let pos2Val = boxes[pattern[1]].innerText;
        let pos3Val = boxes[pattern[2]].innerText;

        if (pos1Val !== "" && pos2Val !== "" && pos3Val !== "") {
            if (pos1Val === pos2Val && pos2Val === pos3Val) {
                showWinner(pos1Val);
                return true;
            }
        }
    }
    return false;
}

function saveScore(game, points) {
    const username = localStorage.getItem('arcade_username') || 'Player';
    let scores = JSON.parse(localStorage.getItem('arcade_scores')) || [];

    // Check if user already in list for this game
    const userScoreIndex = scores.findIndex(s => s.name === username && s.game === game);
    if (userScoreIndex > -1) {
        scores[userScoreIndex].score += points;
    } else {
        scores.push({ name: username, game: game, score: points });
    }

    // Sort and limit
    scores.sort((a, b) => b.score - a.score);
    localStorage.setItem('arcade_scores', JSON.stringify(scores.slice(0, 5)));
}

newGameBtn.addEventListener("click", resetGame);
resetbtn.addEventListener("click", resetGame);