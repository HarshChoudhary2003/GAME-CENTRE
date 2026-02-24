const canvas = document.getElementById("mazeCanvas");
const ctx = canvas.getContext("2d");
const timerEl = document.getElementById("timer");
const modal = document.getElementById("game-modal");
const finalTimeEl = document.getElementById("final-time");
const restartBtn = document.getElementById("restart-btn");

let size = 20; // 20x20 cells
let cellSize = canvas.width / size;
let grid = [];
let player = { x: 0, y: 0 };
let goal = { x: size - 1, y: size - 1 };
let startTime;
let timerId;
let isGameOver = false;

class Cell {
    constructor(r, c) {
        this.r = r;
        this.c = c;
        this.walls = [true, true, true, true]; // top, right, bottom, left
        this.visited = false;
    }

    draw() {
        let x = this.c * cellSize;
        let y = this.r * cellSize;
        ctx.strokeStyle = "#1e214d";
        ctx.lineWidth = 2;

        if (this.walls[0]) { ctx.beginPath(); ctx.moveTo(x, y); ctx.lineTo(x + cellSize, y); ctx.stroke(); }
        if (this.walls[1]) { ctx.beginPath(); ctx.moveTo(x + cellSize, y); ctx.lineTo(x + cellSize, y + cellSize); ctx.stroke(); }
        if (this.walls[2]) { ctx.beginPath(); ctx.moveTo(x + cellSize, y + cellSize); ctx.lineTo(x, y + cellSize); ctx.stroke(); }
        if (this.walls[3]) { ctx.beginPath(); ctx.moveTo(x, y + cellSize); ctx.lineTo(x, y); ctx.stroke(); }
    }
}

function initMaze() {
    isGameOver = false;
    grid = [];
    for (let r = 0; r < size; r++) {
        for (let c = 0; c < size; c++) {
            grid.push(new Cell(r, c));
        }
    }

    // Maze generation (DFS)
    let stack = [];
    let current = grid[0];
    current.visited = true;

    while (true) {
        let neighbor = getUnvisitedNeighbor(current);
        if (neighbor) {
            neighbor.visited = true;
            stack.push(current);
            removeWalls(current, neighbor);
            current = neighbor;
        } else if (stack.length > 0) {
            current = stack.pop();
        } else {
            break;
        }
    }

    player = { x: 0, y: 0 };
    startTime = Date.now();
    if (timerId) clearInterval(timerId);
    timerId = setInterval(() => {
        timerEl.innerText = ((Date.now() - startTime) / 1000).toFixed(1);
    }, 100);

    draw();
}

function getUnvisitedNeighbor(cell) {
    let neighbors = [];
    let r = cell.r;
    let c = cell.c;

    let top = grid[index(r - 1, c)];
    let right = grid[index(r, c + 1)];
    let bottom = grid[index(r + 1, c)];
    let left = grid[index(r, c - 1)];

    if (top && !top.visited) neighbors.push(top);
    if (right && !right.visited) neighbors.push(right);
    if (bottom && !bottom.visited) neighbors.push(bottom);
    if (left && !left.visited) neighbors.push(left);

    if (neighbors.length > 0) {
        return neighbors[Math.floor(Math.random() * neighbors.length)];
    }
    return undefined;
}

function index(r, c) {
    if (r < 0 || c < 0 || r > size - 1 || c > size - 1) return -1;
    return c + r * size;
}

function removeWalls(a, b) {
    let x = a.c - b.c;
    if (x === 1) { a.walls[3] = false; b.walls[1] = false; }
    else if (x === -1) { a.walls[1] = false; b.walls[3] = false; }
    let y = a.r - b.r;
    if (y === 1) { a.walls[0] = false; b.walls[2] = false; }
    else if (y === -1) { a.walls[2] = false; b.walls[0] = false; }
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    grid.forEach(cell => cell.draw());

    // Goal
    ctx.fillStyle = "#ff007a";
    ctx.fillRect(goal.x * cellSize + 5, goal.y * cellSize + 5, cellSize - 10, cellSize - 10);

    // Player
    ctx.fillStyle = "#00ff41";
    ctx.shadowBlur = 10;
    ctx.shadowColor = "#00ff41";
    ctx.fillRect(player.x * cellSize + 5, player.y * cellSize + 5, cellSize - 10, cellSize - 10);
    ctx.shadowBlur = 0;
}

window.addEventListener("keydown", (e) => {
    if (isGameOver) return;
    let current = grid[index(player.y, player.x)];
    if (e.key === "ArrowUp" && !current.walls[0]) player.y--;
    if (e.key === "ArrowRight" && !current.walls[1]) player.x++;
    if (e.key === "ArrowDown" && !current.walls[2]) player.y++;
    if (e.key === "ArrowLeft" && !current.walls[3]) player.x--;

    draw();
    if (player.x === goal.x && player.y === goal.y) {
        endGame();
    }
});

function endGame() {
    isGameOver = true;
    clearInterval(timerId);
    finalTimeEl.innerText = timerEl.innerText;
    modal.classList.remove("hide");
    saveScore('Maze Runner', 2000 - parseFloat(timerEl.innerText) * 10);
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

restartBtn.onclick = initMaze;
initMaze();
