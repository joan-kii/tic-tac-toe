// Functions

// Create Players

const playerFactory = (name, figure) => {
    return { name, figure };
};

// Create Gameboard

const createGameboard = (() => {
    const gameboard =  [[A1, A2, A3],
                        [B1, B2, B3],
                        [C1, C2, C3]];
    return { gameboard };
})();

// Create Display

const displayController = (() => {

})