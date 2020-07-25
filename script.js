// Create Players

const playerFactory = (name, marker) => {
    return { name, marker };
};

// Create Gameboard

const createGameboard = (() => {

    // Variables
    const gameboard = [];
    let board = document.getElementById('gameboard').children;

    // Functions 

    function areEqual() {
        const len = arguments.length;
        for (let i = 0; i < len; i++){
            if (arguments[i] != arguments[i+1] || arguments[i] != arguments[i+2]) {
                return false
            }
            return true;
        };
    }; 

    const checkWinner = () => {
        if (areEqual(gameboard[0], gameboard[1], gameboard[2]) || 
            areEqual(gameboard[3], gameboard[4], gameboard[5]) || 
            areEqual(gameboard[6], gameboard[7], gameboard[8]) ||
            areEqual(gameboard[0], gameboard[3], gameboard[6]) ||
            areEqual(gameboard[1], gameboard[4], gameboard[7]) ||
            areEqual(gameboard[2], gameboard[6], gameboard[8]) ||
            areEqual(gameboard[0], gameboard[4], gameboard[8]) ||
            areEqual(gameboard[2], gameboard[4], gameboard[6])) {
                displayController.isWinner();
            };
    };

    return { gameboard, board, checkWinner }
})();

// Create Display

const displayController = (() => {

    // Inputs

    for (let cell of createGameboard.board) {
        cell.addEventListener('click', function () {
            if (cell.textContent == "") {
                updateGameboard(cell.getAttribute('data-index'));
            };
        })
    };
    document.getElementById('restartButton').addEventListener("click", restartPlay);

    // Variables

    let move = 1;
    let player1 = playerFactory("Jugador 1", "O");
    let player2 = playerFactory("Jugador 2", "X");
    let scorePlayer1 = 0;
    let scorePlayer2 = 0;
    let scoreTie = 0;

    // Functions

    const render = () => {
        for (let tile in createGameboard.board) {
            createGameboard.board[tile].innerText = createGameboard.gameboard[tile] || "";
    }};

    const updateGameboard = (cellIndex) => {
        createGameboard.gameboard[cellIndex] = toggleTurn(move);
        move++;
        render(createGameboard.gameboard);
        if (move > 5) {
            createGameboard.checkWinner();
        };
    };

    const toggleTurn = (move) => {
        return move % 2 != 0 ? player1.marker : player2.marker;
        };

    function restartPlay() {
        createGameboard.gameboard = [];
        move = 1;
        scorePlayer1 = 0;
        scorePlayer2 = 0;
        scoreTie = 0;
        render()
    };

    const isWinner = () => {
        const markerWinner = toggleTurn(move);
        markerWinner == player1.marker ? gotWinner(player1) : gotWinner(player2);
    };

    const gotWinner = (winner) => {
        
    }
    return { move, isWinner }
})();