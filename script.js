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

    const getPlayer1 = document.getElementById("namePlayer1");
    const getPlayer2 = document.getElementById("namePlayer2");

    // Functions

    let player1 = playerFactory(getPlayer1.value || "Jugador 1", "O");
    let player2 = playerFactory(getPlayer2.value || "Jugador 2", "X");
    console.log(player1.name)
    console.log(player2.marker)
    const render = () => {
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