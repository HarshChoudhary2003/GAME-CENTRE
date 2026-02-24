let userScore = 0;
let compScore = 0;

const choices = document.querySelectorAll(".choice");
const msg = document.querySelector("#msg");
const userScorePara = document.querySelector("#user-score");
const compScorePara = document.querySelector("#comp-score");
const resetBtn = document.querySelector("#reset-btn");

const genCompChoice = () => {
  const options = ["rock", "paper", "scissors"];
  const randIdx = Math.floor(Math.random() * 3);
  return options[randIdx];
};

const drawGame = () => {
  msg.innerText = "It's a Draw! Both chose the same.";
  msg.className = "draw";
};

const showWinner = (userWin, userChoice, compChoice) => {
  if (userWin) {
    userScore++;
    userScorePara.innerText = userScore;
    msg.innerText = `You Win! Your ${userChoice} beats ${compChoice}`;
    msg.className = "win";

    // Save to global leaderboard if significant
    if (userScore % 5 === 0) saveScore('Rock Paper Scissors', userScore);
  } else {
    compScore++;
    compScorePara.innerText = compScore;
    msg.innerText = `You Lost! ${compChoice} beats your ${userChoice}`;
    msg.className = "lose";
  }

  if (userScore > 0 || compScore > 0) {
    resetBtn.classList.remove("hide");
  }
};

const playGame = (userChoice) => {
  const compChoice = genCompChoice();

  if (userChoice === compChoice) {
    drawGame();
  } else {
    let userWin = true;
    if (userChoice === "rock") {
      userWin = compChoice === "paper" ? false : true;
    } else if (userChoice === "paper") {
      userWin = compChoice === "scissors" ? false : true;
    } else {
      userWin = compChoice === "rock" ? false : true;
    }
    showWinner(userWin, userChoice, compChoice);
  }
};

choices.forEach((choice) => {
  choice.addEventListener("click", () => {
    const userChoice = choice.getAttribute("id");
    playGame(userChoice);
  });
});

resetBtn.addEventListener("click", () => {
  saveScore('Rock Paper Scissors', userScore);
  userScore = 0;
  compScore = 0;
  userScorePara.innerText = userScore;
  compScorePara.innerText = compScore;
  msg.innerText = "Choose your weapon!";
  msg.className = "";
  resetBtn.classList.add("hide");
});

function saveScore(game, points) {
  const username = localStorage.getItem('arcade_username') || 'Player';
  let scores = JSON.parse(localStorage.getItem('arcade_scores')) || [];

  // Check if user already in list for this game (only save high scores for RPS match)
  const userScoreIndex = scores.findIndex(s => s.name === username && s.game === game);
  if (userScoreIndex > -1) {
    if (points > scores[userScoreIndex].score) {
      scores[userScoreIndex].score = points;
    }
  } else {
    scores.push({ name: username, game: game, score: points });
  }

  scores.sort((a, b) => b.score - a.score);
  localStorage.setItem('arcade_scores', JSON.stringify(scores.slice(0, 5)));
}