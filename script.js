// Create Players

const playerFactory = (name, marker) => {
    return { name, marker };
};

// Create Gameboard

const createGameboard = (() => {

    // Variables
    const gameboard = [];
    let board = document.getElementById('gameboard').children;
    let winner = null;

    // Functions 

    function areEqual(a, b, c) {
        if (a === b && b == c && a != undefined) {
            winner = a;
            return true
        };
    }; 

    const checkWinner = (gameboard, test) => {
        if (areEqual(gameboard[0], gameboard[1], gameboard[2]) || 
            areEqual(gameboard[3], gameboard[4], gameboard[5]) || 
            areEqual(gameboard[6], gameboard[7], gameboard[8]) ||
            areEqual(gameboard[0], gameboard[3], gameboard[6]) ||
            areEqual(gameboard[1], gameboard[4], gameboard[7]) ||
            areEqual(gameboard[2], gameboard[5], gameboard[8]) ||
            areEqual(gameboard[0], gameboard[4], gameboard[8]) ||
            areEqual(gameboard[2], gameboard[4], gameboard[6])) {
                if (!test) {
                    displayController.gotWinner(winner);
                } else if (test) {
                    return winner
                };
        } else if (gameboard.length === 9 && !gameboard.includes(undefined)) {
            winner = 'tie';
            if (!test) {
                displayController.gotWinner(winner);
            } else {
                return winner
            };
        } else {
            return false
        };
    };
    return { gameboard, board, checkWinner }
})();

// Create Display Controller

const displayController = (() => {

    // Inputs

    document.getElementById('restartButton').addEventListener("click", restartPlay);
    const scoresDisplay = document.getElementById('scores');
    const renderScore1 = document.getElementById('player1scores');
    const renderScore2 = document.getElementById('player2scores');
    const renderScoreTie = document.getElementById('scoreTies');
    const displayName1 = document.getElementById('displayName1');
    const displayName2 = document.getElementById('displayName2');
    const homeLayout = document.getElementById('home');
    const gameLayout = document.getElementById('game');
    const homeButton = document.getElementById('homeButton').addEventListener("click", goHome);
    const playMode = document.querySelectorAll('.mode');
    const difficultyAI = document.getElementById('difficultyAI');
    const namePlayer1 = document.getElementById('namePlayer1');
    const namePlayer2 = document.getElementById('namePlayer2');
    const inputPlayer2 = document.getElementById('player2');
    const kiibotLevel = document.querySelectorAll('.kiiBOT');
    const playNow = document.getElementById('playNow').addEventListener("click", startPlay);
    const message = document.getElementById('winner');

    // Variables

    let move = 1;
    let scorePlayer1 = 0;
    let scorePlayer2 = 0;
    let scoreTie = 0;
    let player1;
    let player2;
    let modeAI;
    let kiibot = 'noob';
    let minimaxScores = {
        X: 10,
        O: -10,
        tie: 0
    };

    // Functions

    playMode.forEach(mode =>
        mode.addEventListener("click", () => {
            playMode.forEach(mode => mode.toggleAttribute("selected"));
            difficultyAI.toggleAttribute('hidden');
            inputPlayer2.toggleAttribute('hidden');
        })
    );

    kiibotLevel.forEach(level => 
        level.addEventListener("click", () => {
            kiibotLevel.forEach(level => level.toggleAttribute('selected'));
            if (kiibotLevel[1].attributes.selected) {
                kiibot = 'pro';
            } else {
                kiibot = 'noob';
            };
        }));

    const render = () => {
        message.style.display = 'none';
        for (let tile in createGameboard.board) {
            createGameboard.board[tile].innerText = createGameboard.gameboard[tile] || "";
        renderScore1.innerText = scorePlayer1;
        renderScore2.innerText = scorePlayer2;
        renderScoreTie.innerText = scoreTie;
    }};

    function startPlay() {
        player1 = playerFactory(namePlayer1.value || "Jugador 1", "O");
        if (playMode[0].attributes.selected) {
            player2 = playerFactory('kiiBOT', 'X');
            modeAI = true;
        } else {
            player2 = playerFactory(namePlayer2.value || "Jugador 2", "X");
            modeAI = false;
        };
        displayName1.innerText = player1.name;
        displayName2.innerText = player2.name;
        gameLayout.toggleAttribute('hidden');
        homeLayout.toggleAttribute('hidden');
        createGameboard.gameboard = [];
        if (modeAI === false) {
            for (let cell of createGameboard.board) {
                cell.addEventListener('click', function () {
                        if (cell.textContent == "") {
                            updateGameboard(cell.getAttribute('data-index'));
                        };
                    });
                };
        } else if (modeAI === true) {
            kiibotMode(); 
        };
    };
            
    const updateGameboard = (cellIndex) => {
        createGameboard.gameboard[cellIndex] = toggleTurn(move);
        render();
        move++;
        if (move > 5) {
            createGameboard.checkWinner(createGameboard.gameboard, false);
        };
        if (modeAI) {
            setTimeout(kiibotMode, 500);
        };
    };

    const toggleTurn = (move) => {
        return move % 2 != 0 ? player1.marker : player2.marker;
        };

    const kiibotMode = () => {
        if (toggleTurn(move) === 'X' && kiibot === 'noob') {
            let noobChoice = Math.floor(Math.random() * 9);
            while (createGameboard.gameboard[noobChoice] != undefined && move < 10) {
                noobChoice = Math.floor(Math.random() * 9);
            };
            setTimeout(updateGameboard, 1000, noobChoice);
        } else if (toggleTurn(move) === 'X' && kiibot === 'pro') {
            console.log(toggleTurn(move))
            let bestScore = -Infinity;
            let nextMove;
            for (let i = 0; i < 9; i++) {
                if (createGameboard.gameboard[i] === undefined) {
                    createGameboard.gameboard[i] = 'X';
                    let score = minimax(createGameboard.gameboard, false);
                    createGameboard.gameboard[i] = undefined;
                    if (score > bestScore) {
                        bestScore = score;
                        nextMove = i;
                    };
                };
            };
            updateGameboard(nextMove);
        } else if (toggleTurn(move) === 'O') {
            for (let cell of createGameboard.board) {
                cell.addEventListener('click', function () {
                    if (cell.textContent == "") {
                        updateGameboard(cell.getAttribute('data-index'));
                    };
                });
            };
        };
    };

    function minimax(gameboard, isMaximizing) {
        let result = createGameboard.checkWinner(gameboard, true);
        if (result !== false) {
            return minimaxScores[result];
        } else {
            if (isMaximizing) {
                let bestScore = -Infinity;
                for (let i = 0; i < 9; i++) {
                    if (gameboard[i] === undefined) {
                        gameboard[i] = 'X';
                        let score = minimax(gameboard, false);
                        gameboard[i] = undefined;
                        bestScore = Math.max(score, bestScore);
                    };
                };
                return bestScore 
            } else {
                let bestScore = Infinity;
                for (let i = 0; i < 9; i++) {
                    if (gameboard[i] === undefined) {
                        gameboard[i] = 'O';
                        let score = minimax(gameboard, true);
                        gameboard[i] = undefined;
                        bestScore = Math.min(score, bestScore);
                    };
                };
                return bestScore
            };
        };
    };

    function restartPlay() {
        createGameboard.gameboard = [];
        move = 1;
        scorePlayer1 = 0;
        scorePlayer2 = 0;
        scoreTie = 0;
        render();
    };

    function goHome() {
        homeLayout.toggleAttribute('hidden');
        gameLayout.toggleAttribute('hidden');
        kiibot = 'noob';
        restartPlay();
    };

    const gotWinner = (winner) => {
        if (winner == 'O') {
            scorePlayer1++;
            message.innerText = `¡${player1.name} gana!`
        } else if (winner == 'X') {
            scorePlayer2++;
            message.innerText = `¡${player2.name} gana!`
        } else {
            scoreTie++;
            message.innerText = `¡Empate!`;
        };
        createGameboard.gameboard = [];
        move = 1;
        message.style.padding = "70px 31%";
        message.style.display = 'block';
        setTimeout(render, 2000);
    }; 
    return { gotWinner, updateGameboard }
})();