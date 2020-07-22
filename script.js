// Functions

// Create Players

const playerFactory = (name, marker) => {
    return { name, marker };
};

// Create Gameboard

const createGameboard = (() => {
    const gameboard = [];
    let board = document.getElementById('gameboard').children;
    for (let cell in board) {
        board[cell].innerText = gameboard[cell] || "";
    };
})();

// Create Display

const displayController = (() => {

})