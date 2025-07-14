const board = document.querySelectorAll('.cell');
const statusText = document.getElementById('status');
const turnText = document.getElementById('playerTurn');

let playerXName = "Player ❌";
let playerOName = "Player ⭕";
let currentPlayer = "X";
let gameActive = false;
let gameState = ["", "", "", "", "", "", "", "", ""];

const winConditions = [
  [0, 1, 2], [3, 4, 5], [6, 7, 8],
  [0, 3, 6], [1, 4, 7], [2, 5, 8],
  [0, 4, 8], [2, 4, 6]
];

function startGame() {
  const xInput = document.getElementById("playerX").value.trim();
  const oInput = document.getElementById("playerO").value.trim();
  playerXName = xInput !== "" ? xInput : "Player ❌";
  playerOName = oInput !== "" ? oInput : "Player ⭕";
  currentPlayer = "X";
  gameState = ["", "", "", "", "", "", "", "", ""];
  gameActive = true;

  document.getElementById("gameSection").style.display = "block";
  document.querySelector(".players").style.display = "none";
  statusText.textContent = "Let's play!";
  turnText.textContent = `${playerXName}'s Turn`;
  board.forEach(cell => cell.textContent = "");
}

function handleClick(event) {
  const index = event.target.dataset.index;
  if (gameState[index] !== "" || !gameActive) return;

  gameState[index] = currentPlayer;
  event.target.textContent = currentPlayer === "X" ? "❌" : "⭕";

  if (checkWinner()) {
    statusText.textContent = `${currentPlayer === "X" ? playerXName : playerOName} Wins! 🎉`;
    gameActive = false;
  } else if (!gameState.includes("")) {
    statusText.textContent = "It's a Draw!";
    gameActive = false;
  } else {
    currentPlayer = currentPlayer === "X" ? "O" : "X";
    turnText.textContent = `${currentPlayer === "X" ? playerXName : playerOName}'s Turn`;
  }
}

function checkWinner() {
  return winConditions.some(combination => {
    const [a, b, c] = combination;
    return (
      gameState[a] &&
      gameState[a] === gameState[b] &&
      gameState[a] === gameState[c]
    );
  });
}

function resetGame() {
  currentPlayer = "X";
  gameState = ["", "", "", "", "", "", "", "", ""];
  gameActive = true;
  board.forEach(cell => cell.textContent = "");
  statusText.textContent = "Let's play!";
  turnText.textContent = `${playerXName}'s Turn`;
}

function startNewGame() {
  document.getElementById("playerX").value = "";
  document.getElementById("playerO").value = "";
  document.getElementById("gameSection").style.display = "none";
  document.querySelector(".players").style.display = "flex";
  gameState = ["", "", "", "", "", "", "", "", ""];
  board.forEach(cell => cell.textContent = "");
  statusText.textContent = "";
  turnText.textContent = "";
  gameActive = false;
}

// Auto-enter behavior
document.getElementById("playerX").addEventListener("keydown", function (e) {
  if (e.key === "Enter") {
    e.preventDefault();
    document.getElementById("playerO").focus();
  }
});

document.getElementById("playerO").addEventListener("keydown", function (e) {
  if (e.key === "Enter") {
    e.preventDefault();
    const x = document.getElementById("playerX").value.trim();
    const o = document.getElementById("playerO").value.trim();
    if (x && o) {
      document.getElementById("startBtn").click();
    }
  }
});

board.forEach(cell => cell.addEventListener('click', handleClick));
