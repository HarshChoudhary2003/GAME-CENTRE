document.addEventListener('DOMContentLoaded', () => {
    const nextBtn = document.getElementById('next');
    const prevBtn = document.getElementById('prev');
    const carouselItems = document.querySelectorAll('.carousel .list .item');
    const thumbnailContainer = document.querySelector('.thumbnail');
    let activeIndex = 0;

    // --- USER PROFILE ---
    const userBtn = document.getElementById('user-profile-btn');
    const settingsModal = document.getElementById('settings-modal');
    const closeSettings = document.getElementById('close-settings');
    const usernameInput = document.getElementById('username-input');
    const saveUsername = document.getElementById('save-username');
    const usernameDisplay = document.getElementById('username-display');

    let username = localStorage.getItem('arcade_username');
    if (!username) {
        username = 'Guest' + Math.floor(Math.random() * 1000);
        localStorage.setItem('arcade_username', username);
    }
    usernameDisplay.innerText = username;
    usernameInput.value = username;

    userBtn.onclick = () => settingsModal.classList.remove('hide');
    closeSettings.onclick = () => settingsModal.classList.add('hide');

    saveUsername.onclick = () => {
        const newName = usernameInput.value.trim();
        if (newName) {
            localStorage.setItem('arcade_username', newName);
            usernameDisplay.innerText = newName;
            settingsModal.classList.add('hide');
            // Refresh leaderboard to reflect new name
            loadLeaderboard();
        }
    };

    // --- CAROUSEL LOGIC ---
    function updateCarousel(newIndex) {
        carouselItems[activeIndex].classList.remove('active');

        if (newIndex >= carouselItems.length) activeIndex = 0;
        else if (newIndex < 0) activeIndex = carouselItems.length - 1;
        else activeIndex = newIndex;

        carouselItems[activeIndex].classList.add('active');
        updateThumbnails();
    }

    function updateThumbnails() {
        thumbnailContainer.innerHTML = '';
        carouselItems.forEach((item, index) => {
            if (index === activeIndex) return; // Don't show active in thumbnails

            const thumb = document.createElement('div');
            thumb.className = 'item';
            const bg = item.style.backgroundImage.split('url(')[1].split(')')[0].replace(/['"]/g, '');
            const title = item.querySelector('.title').innerText;

            thumb.innerHTML = `
                <img src="${bg}">
                <div class="content">
                    <div class="title">${title}</div>
                </div>
            `;
            thumb.onclick = () => updateCarousel(index);
            thumbnailContainer.appendChild(thumb);
        });
    }

    nextBtn.onclick = () => updateCarousel(activeIndex + 1);
    prevBtn.onclick = () => updateCarousel(activeIndex - 1);

    // Initial State
    carouselItems[0].classList.add('active');
    updateThumbnails();

    // Auto Advance
    let autoPlay = setInterval(() => updateCarousel(activeIndex + 1), 8000);

    // Stop auto-advance on user interaction
    const stopAuto = () => clearInterval(autoPlay);
    nextBtn.addEventListener('click', stopAuto);
    prevBtn.addEventListener('click', stopAuto);

    // --- LEADERBOARD ---
    function loadLeaderboard() {
        const container = document.getElementById('leaderboard-container');
        const scores = JSON.parse(localStorage.getItem('arcade_scores')) || [
            { name: 'CyberKnight', game: 'Candy Crush', score: 12500 },
            { name: 'PixelMage', game: 'Whack-a-Mole', score: 850 },
            { name: 'NeonVoid', game: 'Tic-Tac-Toe', score: 42 },
            { name: 'ShadowDrift', game: 'Rock Paper Scissors', score: 120 }
        ];

        container.innerHTML = scores.map((s, i) => `
            <div class="leader-card">
                <div class="rank">0${i + 1}</div>
                <div class="leader-info">
                    <h3>${s.name}</h3>
                    <p>${s.game}: ${s.score.toLocaleString()}</p>
                </div>
            </div>
        `).join('');
    }

    loadLeaderboard();

    // --- SEARCH & FILTER LOGIC ---
    const gameDatabase = [
        { id: 'tictactoe', title: 'Tic-Tac-Toe', category: 'Classic', desc: 'The ultimate strategy game.', path: 'games/tictactoe/index.html', img: 'games/tictactoe/toe.webp' },
        { id: 'rps', title: 'Rock Paper Scissors', category: 'Classic', desc: 'Will you choose Rock, Paper, or Scissors?', path: 'games/rps/index.html', img: 'assets/images/rock.jpg' },
        { id: 'mole', title: 'Whack-a-Mole', category: 'Arcade', desc: 'Test your reflexes!', path: 'games/mole/index.html', img: 'games/mole/assets/mario-bg.jpg' },
        { id: 'candy', title: 'Candy Crush', category: 'Puzzle', desc: 'Match sweet treats.', path: 'games/candy/index.html', img: 'assets/images/candy.jpg' },
        { id: 'connect4', title: 'Connect 4', category: 'Strategy', desc: 'Four in a row!', path: 'games/connect4/index.html', img: 'games/connect4/connect4.jpg' },
        { id: 'snake', title: 'Snake Neon', category: 'Classic', desc: 'Retro snake with a neon glow.', path: 'games/snake/index.html', img: 'assets/images/snake.jpg' },
        { id: 'tetris', title: 'Tetris Fusion', category: 'Classic', desc: 'Modern block-stacking action.', path: 'games/tetris/index.html', img: 'assets/images/tetris.jpg' },
        { id: '2048', title: '2048 Nexus', category: 'Puzzle', desc: 'Mathematical merge madness.', path: 'games/2048/index.html', img: 'assets/images/2048.jpg' },
        { id: 'memory', title: 'Memory Drift', category: 'Puzzle', desc: 'Test your visual memory.', path: 'games/memory/index.html', img: 'assets/images/memory.jpg' },
        { id: 'flappy', title: 'Cyber Bird', category: 'Arcade', desc: 'Navigate through cyber obstacles.', path: 'games/flappy/index.html', img: 'assets/images/flappy.jpg' },
        { id: 'breakout', title: 'Breakout Outrun', category: 'Arcade', desc: 'Smash bricks in retro style.', path: 'games/breakout/index.html', img: 'assets/images/breakout.jpg' },
        { id: 'space', title: 'Space Defenders', category: 'Arcade', desc: 'Defend the galaxy from invaders.', path: 'games/space/index.html', img: 'assets/images/space.jpg' },
        { id: 'minesweeper', title: 'Minesweeper Pro', category: 'Strategy', desc: 'Locate hidden mines.', path: 'games/minesweeper/index.html', img: 'assets/images/minesweeper.jpg' },
        { id: 'sudoku', title: 'Sudoku Zen', category: 'Strategy', desc: 'Logical number placement puzzle.', path: 'games/sudoku/index.html', img: 'assets/images/sudoku.jpg' },
        { id: 'hangman', title: 'Hangman Cyber', category: 'Classic', desc: 'Guess the word or hang!', path: 'games/hangman/index.html', img: 'assets/images/hangman.jpg' },
        { id: 'simon', title: 'Simon Glow', category: 'Classic', desc: 'Repeat the light sequence.', path: 'games/simon/index.html', img: 'assets/images/simon.jpg' },
        { id: 'pong', title: 'Pong Classic', category: 'Classic', desc: 'The original paddle game.', path: 'games/pong/index.html', img: 'assets/images/pong.jpg' },
        { id: 'stack', title: 'Stacker Pro', category: 'Arcade', desc: 'Stack blocks to the sky.', path: 'games/stack/index.html', img: 'assets/images/stack.jpg' },
        { id: 'maze', title: 'Maze Runner', category: 'Strategy', desc: 'Find the exit from the labyrinth.', path: 'games/maze/index.html', img: 'assets/images/maze.jpg' },
        { id: 'puzzle15', title: '15 Puzzle', category: 'Puzzle', desc: 'Slide tiles into order.', path: 'games/puzzle15/index.html', img: 'assets/images/puzzle15.jpg' },
        { id: 'wordguess', title: 'Word Guess', category: 'Puzzle', desc: 'Identify the 5-letter word.', path: 'games/wordguess/index.html', img: 'assets/images/wordle.jpg' },
        { id: 'dino', title: 'Dino Run', category: 'Arcade', desc: 'Jump over obstacles as a dino.', path: 'games/dino/index.html', img: 'assets/images/dino.jpg' },
        { id: 'racing', title: 'Racing Nitro', category: 'Arcade', desc: 'Fast-paced highway racing.', path: 'games/racing/index.html', img: 'assets/images/racing.jpg' },
        { id: 'colorblast', title: 'Color Blast', category: 'Arcade', desc: 'Tap the matching colors fast!', path: 'games/colorblast/index.html', img: 'assets/images/color.jpg' },
        { id: 'platformer', title: 'Cyber Platformer', category: 'Arcade', desc: 'Jump and run through cyber levels.', path: 'games/platformer/index.html', img: 'assets/images/platform.jpg' }
    ];

    const searchInput = document.getElementById('game-search');
    const searchResultsSection = document.getElementById('search-results-section');
    const gameGrid = document.getElementById('game-grid');
    const noResults = document.getElementById('no-results');
    const filterButtons = document.querySelectorAll('.filter-btn');

    function renderGames(filterTerm = '', category = 'all') {
        const results = gameDatabase.filter(game => {
            const matchesSearch = game.title.toLowerCase().includes(filterTerm.toLowerCase());
            const matchesCategory = category === 'all' || game.category === category || (category === 'Classic' && game.category === 'Legendary');
            return matchesSearch && matchesCategory;
        });

        gameGrid.innerHTML = '';

        if (results.length === 0) {
            noResults.classList.remove('hide');
        } else {
            noResults.classList.add('hide');
            results.forEach(game => {
                const card = document.createElement('div');
                card.className = 'game-card';
                card.innerHTML = `
                    <img src="${game.img}" alt="${game.title}">
                    <div class="card-content">
                        <h3>${game.title}</h3>
                        <p style="color: grey; font-size: 0.8rem; margin-bottom: 10px;">${game.category}</p>
                        <button class="play-mini" onclick="location.href='${game.path}'">PLAY</button>
                    </div>
                `;
                gameGrid.appendChild(card);
            });
        }

        if (filterTerm || category !== 'all') {
            searchResultsSection.classList.remove('hide');
        } else {
            searchResultsSection.classList.add('hide');
        }
    }

    searchInput.addEventListener('input', (e) => {
        const activeCategory = document.querySelector('.filter-btn.active').dataset.category;
        renderGames(e.target.value, activeCategory);
    });

    filterButtons.forEach(btn => {
        btn.onclick = () => {
            filterButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            renderGames(searchInput.value, btn.dataset.category);
        };
    });

    document.getElementById('close-search').onclick = () => {
        searchResultsSection.classList.add('hide');
        searchInput.value = '';
    };
});