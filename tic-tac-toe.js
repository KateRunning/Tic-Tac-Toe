const playerX = 'x'
const playerO = 'circle'
const winningCombos = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

const cellElements = document.querySelectorAll('[data-cell]')
const board = document.getElementById('board')
const winningMessageElement = document.getElementById('winningMessage')
const winningMessageText = document.querySelector('[data-winning-message-text]')
const replayButton = document.getElementById('replayButton')
const restartButton = document.getElementById('restartButton')
let alert = document.getElementById('turnMessage');
let circleTurn

startGame()

replayButton.addEventListener('click', startGame)
restartButton.addEventListener('click', startGame)

function startGame() {
    
    circleTurn = false
    cellElements.forEach(cell => {
        cell.classList.remove(playerX)
        cell.classList.remove(playerO)
        cell.removeEventListener('click', handleClick)
        cell.addEventListener('click', handleClick, { once: true })
        alert.innerHTML = 'Play!'
    })
    setBoardHoverClass()
    winningMessageElement.classList.remove('show')
};

//place mark
function handleClick(e) {
    const cell = e.target
    let currentClass = circleTurn ? playerO : playerX
    
    placeMark(cell, currentClass)
    
    //check for win
    if (checkWin(currentClass)) {
        endGame(false)
    } else if (isDraw()) { //check for draw
        endGame(true)
    } else {
        switchTurns() //switch turns
        console.log(currentClass);
        alert.innerText = `${circleTurn ? "O's" : "X's"} Turn`
        setBoardHoverClass()
    }
}

function endGame(draw) {
    if (draw) {
        winningMessageText.innerText = 'Draw!'
    } else {
        winningMessageText.innerText = `${circleTurn ? "O" : "X"} Wins!`
    }
    winningMessageElement.classList.add('show')
}

function isDraw() {
    return [...cellElements].every(cell => { //destructuring cell elements into an array
        return cell.classList.contains(playerX) ||
        cell.classList.contains(playerO)
    })
}

function placeMark(cell, currentClass) {
    cell.classList.add(currentClass)
}
console.log('test' + cellElements)

function switchTurns() {
    circleTurn = !circleTurn
}


function setBoardHoverClass() {
    board.classList.remove(playerX)
    board.classList.remove(playerO)
    if (circleTurn) {
        board.classList.add(playerO)
    } else {
        board.classList.add(playerX)
    }
}

//function to check winner
function checkWin(currentClass) {
    return winningCombos.some(combination => {
        return combination.every(index => {
            return cellElements[index].classList.contains(currentClass)
        })
    })
}