// scripts.js
document.addEventListener('DOMContentLoaded', () => {
    const board = document.querySelector('#board');
    const cells = document.querySelectorAll('.cell');
    const restartButton = document.querySelector('#restartButton');
    const toggleModeButton = document.querySelector('#toggleModeButton');
    const togglePlayerModeButton = document.querySelector('#togglePlayerModeButton');
    let currentPlayer = 'X';
    let gameActive = true;
    let singlePlayerMode = false;
    const gameState = Array(9).fill('');

    const winningConditions = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    function handleCellClick(e) {
        const cell = e.target;
        const cellIndex = parseInt(cell.getAttribute('data-index'));

        if (gameState[cellIndex] !== '' || !gameActive) {
            return;
        }

        gameState[cellIndex] = currentPlayer;
        cell.textContent = currentPlayer;
        checkResult();

        if (singlePlayerMode && gameActive) {
            currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
            setTimeout(aiMove, 500);  // Delay AI move for better UX
        } else {
            currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        }
    }

    function checkResult() {
        let roundWon = false;

        for (let i = 0; i < winningConditions.length; i++) {
            const [a, b, c] = winningConditions[i];
            if (gameState[a] === '' || gameState[b] === '' || gameState[c] === '') {
                continue;
            }
            if (gameState[a] === gameState[b] && gameState[b] === gameState[c]) {
                roundWon = true;
                break;
            }
        }

        if (roundWon) {
            gameActive = false;
            setTimeout(() => alert(`Player ${currentPlayer === 'X' ? 'O' : 'X'} has won!`), 10);
            return;
        }
        

        const roundDraw = !gameState.includes('');
        if (roundDraw) {
            gameActive = false;
            setTimeout(() => alert('Game is a draw!'), 10);
            return;
        }
    }

    function aiMove() {
        let availableCells = gameState
            .map((cell, index) => cell === '' ? index : null)
            .filter(index => index !== null);

        if (availableCells.length === 0) return;

        const randomIndex = availableCells[Math.floor(Math.random() * availableCells.length)];
        gameState[randomIndex] = currentPlayer;
        cells[randomIndex].textContent = currentPlayer;
        checkResult();
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    }

    function restartGame() {
        gameActive = true;
        currentPlayer = 'X';
        gameState.fill('');
        cells.forEach(cell => (cell.textContent = ''));
    }

    function toggleMode() {
        document.body.classList.toggle('dark-mode');
        document.body.classList.toggle('light-mode');
    }

    function togglePlayerMode() {
        singlePlayerMode = !singlePlayerMode;
        alert(`Single Player Mode: ${singlePlayerMode ? 'On' : 'Off'}`);
        restartGame();
    }

    cells.forEach(cell => cell.addEventListener('click', handleCellClick));
    restartButton.addEventListener('click', restartGame);
    toggleModeButton.addEventListener('click', toggleMode);
    togglePlayerModeButton.addEventListener('click', togglePlayerMode);
});
