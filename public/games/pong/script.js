const canvas = document.getElementById("pong");
const context = canvas.getContext("2d");

const player = { x: 0, y: canvas.height / 2 - 50, width: 10, height: 100, color: "WHITE", score: 0 };
const computer = { x: canvas.width - 10, y: canvas.height / 2 - 50, width: 10, height: 100, color: "WHITE", score: 0 };
const ball = { x: canvas.width / 2, y: canvas.height / 2, radius: 10, speed: 5, velocityX: 5, velocityY: 5, color: "WHITE" };

function drawRect(x, y, w, h, color) {
    context.fillStyle = color;
    context.fillRect(x, y, w, h);
}

function drawCircle(x, y, r, color) {
    context.fillStyle = color;
    context.beginPath();
    context.arc(x, y, r, 0, Math.PI * 2, false);
    context.closePath();
    context.fill();
}

function drawNet() {
    for (let i = 0; i <= canvas.height; i += 15) {
        drawRect(canvas.width / 2 - 1, i, 2, 10, "WHITE");
    }
}

canvas.addEventListener("mousemove", (evt) => {
    let rect = canvas.getBoundingClientRect();
    player.y = evt.clientY - rect.top - player.height / 2;
});

function resetBall() {
    ball.x = canvas.width / 2;
    ball.y = canvas.height / 2;
    ball.speed = 5;
    ball.velocityX = -ball.velocityX;
}

function collision(b, p) {
    p.top = p.y;
    p.bottom = p.y + p.height;
    p.left = p.x;
    p.right = p.x + p.width;

    b.top = b.y - b.radius;
    b.bottom = b.y + b.radius;
    b.left = b.x - b.radius;
    b.right = b.x + b.radius;

    return b.right > p.left && b.bottom > p.top && b.left < p.right && b.top < p.bottom;
}

function update() {
    ball.x += ball.velocityX;
    ball.y += ball.velocityY;

    // CPU movement
    let computerLevel = 0.1;
    computer.y += (ball.y - (computer.y + computer.height / 2)) * computerLevel;

    if (ball.y + ball.radius > canvas.height || ball.y - ball.radius < 0) {
        ball.velocityY = -ball.velocityY;
    }

    let user = (ball.x < canvas.width / 2) ? player : computer;

    if (collision(ball, user)) {
        let collidePoint = (ball.y - (user.y + user.height / 2));
        collidePoint = collidePoint / (user.height / 2);
        let angleRad = (Math.PI / 4) * collidePoint;
        let direction = (ball.x < canvas.width / 2) ? 1 : -1;
        ball.velocityX = direction * ball.speed * Math.cos(angleRad);
        ball.velocityY = ball.speed * Math.sin(angleRad);
        ball.speed += 0.5;
    }

    if (ball.x - ball.radius < 0) {
        computer.score++;
        document.getElementById("cpu-score").innerText = computer.score;
        resetBall();
    } else if (ball.x + ball.radius > canvas.width) {
        player.score++;
        document.getElementById("player-score").innerText = player.score;
        resetBall();
    }
}

function render() {
    drawRect(0, 0, canvas.width, canvas.height, "BLACK");
    drawNet();
    drawRect(player.x, player.y, player.width, player.height, player.color);
    drawRect(computer.x, computer.y, computer.width, computer.height, computer.color);
    drawCircle(ball.x, ball.y, ball.radius, ball.color);
}

function game() {
    update();
    render();
}

const framePerSecond = 50;
setInterval(game, 1000 / framePerSecond);
