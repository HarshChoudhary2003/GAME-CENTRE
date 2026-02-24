let scene, camera, renderer;
let stack = [];
let overhangingBox;
let boxHeight = 1;
let boxWidth = 3;
let speed = 0.05;
let score = 0;
let gameStarted = false;
let gameOver = false;

const scoreEl = document.getElementById("score");
const modal = document.getElementById("game-modal");
const finalScoreEl = document.getElementById("final-score");
const restartBtn = document.getElementById("restart-btn");

function init() {
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(75, 400 / 500, 0.1, 1000);
    renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(400, 500);
    document.querySelector(".canvas-container").appendChild(renderer.domElement);

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
    scene.add(ambientLight);

    const pointLight = new THREE.PointLight(0xffffff, 0.5);
    pointLight.position.set(10, 20, 10);
    scene.add(pointLight);

    camera.position.set(4, 4, 4);
    camera.lookAt(0, 0, 0);

    addLayer(0, 0, boxWidth, boxWidth);
    nextLayer();
    animate();
}

function addLayer(x, z, width, depth) {
    const y = boxHeight * stack.length;
    const geometry = new THREE.BoxGeometry(width, boxHeight, depth);
    const material = new THREE.MeshPhongMaterial({ color: new THREE.Color(`hsl(${stack.length * 20}, 70%, 50%)`) });
    const mesh = new THREE.Mesh(geometry, material);
    mesh.position.set(x, y, z);
    scene.add(mesh);
    stack.push({ mesh, width, depth });
}

function nextLayer() {
    scoreEl.innerText = score;
    const y = boxHeight * stack.length;
    const width = stack[stack.length - 1].width;
    const depth = stack[stack.length - 1].depth;
    const geometry = new THREE.BoxGeometry(width, boxHeight, depth);
    const material = new THREE.MeshPhongMaterial({ color: new THREE.Color(`hsl(${stack.length * 20}, 70%, 50%)`) });
    overhangingBox = new THREE.Mesh(geometry, material);

    // Alt movement directions
    if (stack.length % 2 === 0) {
        overhangingBox.position.set(-5, y, stack[stack.length - 1].mesh.position.z);
    } else {
        overhangingBox.position.set(stack[stack.length - 1].mesh.position.x, y, -5);
    }

    scene.add(overhangingBox);
}

function stackBlock() {
    if (gameOver) return;

    const top = stack[stack.length - 1];
    const prev = stack[stack.length - 2] || top;

    const direction = stack.length % 2 === 0 ? 'x' : 'z';
    const delta = overhangingBox.position[direction] - prev.mesh.position[direction];
    const size = direction === 'x' ? top.width : top.depth;

    if (Math.abs(delta) >= size) {
        endGame();
        return;
    }

    const newSize = size - Math.abs(delta);
    const newPos = prev.mesh.position[direction] + delta / 2;

    scene.remove(overhangingBox);

    if (direction === 'x') {
        addLayer(newPos, top.mesh.position.z, newSize, top.depth);
    } else {
        addLayer(top.mesh.position.x, newPos, top.width, newSize);
    }

    score++;
    speed += 0.005;

    // Move camera up
    camera.position.y += boxHeight;
    camera.lookAt(0, camera.position.y - 4, 0);

    nextLayer();
}

function animate() {
    if (gameOver) return;

    if (overhangingBox) {
        const direction = stack.length % 2 === 0 ? 'x' : 'z';
        overhangingBox.position[direction] += speed;
        if (overhangingBox.position[direction] > 5) speed *= -1;
        if (overhangingBox.position[direction] < -5) speed *= -1;
    }

    renderer.render(scene, camera);
    requestAnimationFrame(animate);
}

function endGame() {
    gameOver = true;
    finalScoreEl.innerText = score;
    modal.classList.remove("hide");
    saveScore('Stacker Pro', score);
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

window.addEventListener("click", stackBlock);
window.addEventListener("keydown", (e) => { if (e.code === "Space") stackBlock(); });
restartBtn.onclick = () => location.reload();

init();
