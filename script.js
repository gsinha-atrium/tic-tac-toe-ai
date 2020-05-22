const statusDisplay = document.querySelector('.game--status');

let gameActive = true;
let currentPlayer = "X";
let gameState = ["", "", "", "", "", "", "", "", ""];

let gameCounter = 0;
const winningMessage = () => `Player ${currentPlayer} has won!`;
const drawMessage = () => `Game ended in a draw!`;
const currentPlayerTurn = () => `It's ${currentPlayer}'s turn`;

statusDisplay.innerHTML = currentPlayerTurn();

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


function handleCellPlayed(clickedCell, clickedCellIndex) {
    gameState[clickedCellIndex] = currentPlayer;
    clickedCell.innerHTML = currentPlayer;
}

function handlePlayerChange() {
    currentPlayer = currentPlayer === "X" ? "O" : "X";
    statusDisplay.innerHTML = currentPlayerTurn();
}

function handleResultValidation() {
    let roundWon = false;
    let winCondition2 = null;
    for (let i = 0; i <= 7; i++) {

        const winCondition = winningConditions[i];
        let a = gameState[winCondition[0]];
        let b = gameState[winCondition[1]];
        let c = gameState[winCondition[2]];
        if (a === b || a === c || b === c) {
            if (a === '' && (b === 'O' && c === 'O'))
                winCondition2 = winCondition[0];
            else
            if (b === '' && (a === 'O' && c === 'O'))
                winCondition2 = winCondition[1];
            else
            if (c === '' && (b === 'O' && a === 'O'))
                winCondition2 = winCondition[2];
            
            if(winCondition2 == null ){
            if (a === '' && (b === 'X' && c === 'X'))
                winCondition2 = winCondition[0];
            else
            if (b === '' && (a === 'X' && c === 'X'))
                winCondition2 = winCondition[1];
            else
            if (c === '' && (b === 'X' && a === 'X'))
                winCondition2 = winCondition[2];
                }
        }
        if (a === '' || b === '' || c === '') {
            continue;
        }
        if (a === b && b === c) {
            roundWon = true;
            break
        }


    }

    if (roundWon) {
        statusDisplay.innerHTML = winningMessage();
        gameActive = false;
        return;
    }

    let roundDraw = !gameState.includes("");
    if (roundDraw) {
        statusDisplay.innerHTML = drawMessage();
        gameActive = false;
        return;
    }

    handlePlayerChange();
    if(winCondition2 === null){
        for(var i = 0;i<gameState.length;i++){
            if(gameState[i]=== ""){
                winCondition2 = i;
            break;
            }
        }
    }
        
    if (gameCounter >= 1 && currentPlayer === "O")
        embeddAI(null, winCondition2);

}

function embeddAI(userIndex, winCondition) {
    let nextEvent = 0;
    gameCounter = gameCounter + 1;
    if (winCondition === null) {
        //if (gameCounter === 1) {
        if (userIndex == 8)
            nextEvent = 0;
        else
            nextEvent = userIndex + 1;
        //}
    } else {
        nextEvent = winCondition;
    }
    let nodeList = document.querySelectorAll('.cell');
    let nodevalue = null;
    for (var i = 0; i < nodeList.length; i++) {
        if (nextEvent === parseInt(nodeList[i].getAttribute("data-cell-index"))) {
            nodevalue = nodeList[i];
            break;
        }
    }
    handleCellPlayed(nodevalue, nextEvent);
    handleResultValidation();

}

function handleCellClick(clickedCellEvent) {
    const clickedCell = clickedCellEvent.target;
    const clickedCellIndex = parseInt(clickedCell.getAttribute('data-cell-index'));

    if (gameState[clickedCellIndex] !== "" || !gameActive) {
        return;
    }

    handleCellPlayed(clickedCell, clickedCellIndex);
    handleResultValidation();
    if (gameCounter < 1){
        if(clickedCellIndex != 4)
            embeddAI(3, null);
        else if(clickedCellIndex === 4)
            embeddAI(1, null);
        else
            embeddAI(clickedCellIndex, null);
    }
}

function handleRestartGame() {
    gameActive = true;
    currentPlayer = "X";
    gameCounter = 0;
    gameState = ["", "", "", "", "", "", "", "", ""];
    statusDisplay.innerHTML = currentPlayerTurn();
    document.querySelectorAll('.cell').forEach(cell => cell.innerHTML = "");
}

document.querySelectorAll('.cell').forEach(cell => cell.addEventListener('click', handleCellClick));
document.querySelector('.game--restart').addEventListener('click', handleRestartGame);
