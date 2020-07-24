// Functions

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

    // Functions

    let player1 = playerFactory("Jugador 1", "O");
    let player2 = playerFactory("Jugador 2", "X");
   
        for (let tile in createGameboard.board) {
            createGameboard.board[tile].innerText = createGameboard.gameboard[tile] || "";
    }};

    const updateGameboard = (cellIndex) => {
        createGameboard.gameboard[cellIndex] = "O";
        render(createGameboard.gameboard);
    };

    for (let cell of createGameboard.board) {
        cell.addEventListener('click', function () {
            updateGameboard(cell.getAttribute('data-index'));
        })
    };
})();