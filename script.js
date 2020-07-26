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
        if (arguments[0] != undefined) {
            if (arguments[0] === arguments[1] && arguments[1] === arguments[2]) {
                return true
            };
        } else {
            return false;
        };
    }; 

    const checkWinner = (gameboard) => {
        if (areEqual(gameboard[0], gameboard[1], gameboard[2]) || 
            areEqual(gameboard[3], gameboard[4], gameboard[5]) || 
            areEqual(gameboard[6], gameboard[7], gameboard[8]) ||
            areEqual(gameboard[0], gameboard[3], gameboard[6]) ||
            areEqual(gameboard[1], gameboard[4], gameboard[7]) ||
            areEqual(gameboard[2], gameboard[6], gameboard[8]) ||
            areEqual(gameboard[0], gameboard[4], gameboard[8]) ||
            areEqual(gameboard[2], gameboard[4], gameboard[6])) {
                displayController.isWinner();
            } else {
                return
            };
    };

    return { gameboard, board, checkWinner }
})();

// Create Display Controller

const displayController = (() => {

    // Variables

    let move = 1;
    let player1 = playerFactory("Jugador 1", "O");
    let player2 = playerFactory("Jugador 2", "X");
    let scorePlayer1 = 0;
    let scorePlayer2 = 0;
    let scoreTie = 0;

    // Inputs

    document.getElementById('restartButton').addEventListener("click", restartPlay);
    const renderScore1 = document.getElementById('player1scores');
    const renderScore2 = document.getElementById('player2scores');
    const renderScoreTie = document.getElementById('scoreTies');
    const playNow = document.getElementById('playNow').addEventListener("click", startPlay);

    // Functions

    const render = () => {
        for (let tile in createGameboard.board) {
            createGameboard.board[tile].innerText = createGameboard.gameboard[tile] || "";
        renderScore1.innerText = scorePlayer1;
        renderScore2.innerText = scorePlayer2;
        renderScoreTie.innerText = scoreTie;
    }};

    function startPlay() {
        for (let cell of createGameboard.board) {
            cell.addEventListener('click', function () {
            if (cell.textContent == "") {
                updateGameboard(cell.getAttribute('data-index'));
                };
            });
        };
    };

    const updateGameboard = (cellIndex) => {
        createGameboard.gameboard[cellIndex] = toggleTurn(move);
        move++;
        console.log(move)
        render();
        if (move > 5) {
            createGameboard.checkWinner(createGameboard.gameboard);
        };
        if (move === 10) {
            console.log('lol')
            createGameboard.gameboard = [];
            scoreTie++;
            move = 0;
            render();
        }
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
        render();
    };

    const isWinner = () => {
        const markerWinner = toggleTurn(move - 1);
        markerWinner == player1.marker ? gotWinner(player1) : gotWinner(player2);
    };

    const gotWinner = (winner) => {
        winner == player1 ? scorePlayer1++ : scorePlayer2++;
        createGameboard.gameboard = [];
        move = 1;
        render();
    }; 

    return { move, isWinner, updateGameboard }
})();