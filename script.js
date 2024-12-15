// Variables globales
const COLS = 7;
const ROWS = 6;
const board = [];
let currentPlayer = 'red'; // El jugador 1 inicia
let gameOver = false;

// Referencias al DOM
const gameBoard = document.getElementById('game-board');
const status = document.getElementById('status');
const resetBtn = document.getElementById('reset-btn');

// Inicializar el tablero
function initializeBoard() {
    gameBoard.innerHTML = '';
    for (let row = 0; row < ROWS; row++) {
        board[row] = [];
        for (let col = 0; col < COLS; col++) {
            board[row][col] = null;
            const cell = document.createElement('div');
            cell.classList.add('cell');
            cell.setAttribute('data-col', col);
            cell.setAttribute('data-row', row);
            cell.addEventListener('click', handleCellClick);
            gameBoard.appendChild(cell);
        }
    }
}

// Cambiar turno
function switchPlayer() {
    currentPlayer = currentPlayer === 'red' ? 'yellow' : 'red';
    status.textContent = `Turno del Jugador ${currentPlayer === 'red' ? '1' : '2'}`;
}

// Manejar clic en una celda
function handleCellClick(event) {
    if (gameOver) return;

    const col = parseInt(event.target.getAttribute('data-col'));
    for (let row = ROWS - 1; row >= 0; row--) {
        if (!board[row][col]) {
            board[row][col] = currentPlayer;
            const cell = document.querySelector(`[data-row="${row}"][data-col="${col}"]`);
            cell.classList.add(currentPlayer);
            if (checkWinner(row, col)) {
                status.textContent = `¡Jugador ${currentPlayer === 'red' ? '1' : '2'} gana!`;
                gameOver = true;
                return;
            }
            switchPlayer();
            return;
        }
    }
}

// Comprobar si hay un ganador
function checkWinner(row, col) {
    return (
        checkDirection(row, col, 1, 0) || // Horizontal
        checkDirection(row, col, 0, 1) || // Vertical
        checkDirection(row, col, 1, 1) || // Diagonal ascendente
        checkDirection(row, col, 1, -1)   // Diagonal descendente
    );
}

// Verificar 4 fichas consecutivas en una dirección
function checkDirection(row, col, rowDir, colDir) {
    let count = 1;

    // Comprobar hacia una dirección
    for (let i = 1; i < 4; i++) {
        const r = row + i * rowDir;
        const c = col + i * colDir;
        if (r >= 0 && r < ROWS && c >= 0 && c < COLS && board[r][c] === currentPlayer) {
            count++;
        } else {
            break;
        }
    }

    // Comprobar hacia la otra dirección
    for (let i = 1; i < 4; i++) {
        const r = row - i * rowDir;
        const c = col - i * colDir;
        if (r >= 0 && r < ROWS && c >= 0 && c < COLS && board[r][c] === currentPlayer) {
            count++;
        } else {
            break;
        }
    }

    return count >= 4;
}

// Reiniciar el juego
resetBtn.addEventListener('click', () => {
    gameOver = false;
    currentPlayer = 'red';
    initializeBoard();
    status.textContent = 'Turno del Jugador 1';
});

// Inicializar el juego al cargar la página
initializeBoard();
