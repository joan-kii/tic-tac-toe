// Create Players

const playerFactory = (name, marker) => {
    return { name, marker };
};

// Create Gameboard

const createGameboard = (() => {
    const gameboard = [];
    let board = document.getElementById('gameboard').children;
    return { gameboard, board }
})();

// Create Display

const displayController = (() => {

    // Inputs

    for (let cell of createGameboard.board) {
        cell.addEventListener('click', function () {
            updateGameboard(cell.getAttribute('data-index'));
        })
    };
    document.getElementById('restartButton').addEventListener("click", restartPlay);

    // Variables

    let move = 1;
    let player1 = playerFactory("Jugador 1", "O");
    let player2 = playerFactory("Jugador 2", "X");

    // Functions

    const render = () => {
        for (let tile in createGameboard.board) {
            createGameboard.board[tile].innerText = createGameboard.gameboard[tile] || "";
    }};

    const updateGameboard = (cellIndex) => {
        createGameboard.gameboard[cellIndex] = toggleTurn(move);
        move++;
        render(createGameboard.gameboard);
    };

    const toggleTurn = (move) => {
        return move % 2 != 0 ? player1.marker : player2.marker;
        };

    function restartPlay() {
        createGameboard.gameboard = [];
        move = 1;
        render()
    };
})();