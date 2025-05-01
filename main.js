// IIFE's needed so that variables are declared for use in non-IFFE functions below.
const gameBoard = (() => {
  const cells = document.querySelectorAll(".cell");
  const _winConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  let options = ["", "", "", "", "", "", "", "", ""];

  return { cells, _winConditions, options };
})();

const gameStatus = (() => {
  let currentPlayer = "X";
  let running = false;

  return { currentPlayer, running };
})();

const statusText = document.querySelector("#statusText");
const restartBtn = document.querySelector("#restartBtn");

initializeGame();

function initializeGame() {
  gameStatus.running = true;
  gameBoard.cells.forEach((cell) =>
    cell.addEventListener("click", cellClicked)
  );
  restartBtn.addEventListener("click", restartGame);
  statusText.textContent = `Player ${gameStatus.currentPlayer}'s move!`;
}

function cellClicked() {
  // v1 had block.dataset.array
  const cellIndex = this.getAttribute("cellIndex");

  // to avoid needing to turn off event listeners. if cell is taken OR game is over, do nothing on click.
  if (gameBoard.options[cellIndex] != "" || gameStatus.running == false) {
    return;
  }

  // if cell is empty (yes you can add AND running == true)
  if (gameBoard.options[cellIndex] === "") {
    updateCell(this, cellIndex);
    checkWinner();
  }
}

function updateCell(cell, index) {
  cell.textContent = gameStatus.currentPlayer;
  gameBoard.options[index] = gameStatus.currentPlayer;
}

function checkWinner() {
  let roundWon = false;
  const winCheck = gameBoard._winConditions;

  winCheck.forEach((combo) => {
    const [a, b, c] = combo;

    //tutorial used forloop. Not using this AT ALL. No need to comment out. for loop better for performance with 'continue' or 'break'
    for (let i = 0; i < winCheck.length; i++) {
      const condition = winCheck[i]; // for each loop, declare condition as the inner array
      const cellA = gameBoard.options[condition[0]];
      const cellB = gameBoard.options[condition[1]];
      const cellC = gameBoard.options[condition[2]];
    }

    // if there are any spaces, break out of winCondition check.
    if (
      gameBoard.options[a] == "" ||
      gameBoard.options[b] == "" ||
      gameBoard.options[c] == ""
    ) {
      return; // can't use break in forEach. return has same effect.
    }

    if (
      gameBoard.options[a] == gameBoard.options[b] &&
      gameBoard.options[a] == gameBoard.options[c]
    ) {
      roundWon = true;
      winGraphics([a, b, c]);
    }
  });

  if (roundWon) {
    statusText.textContent = `Player ${gameStatus.currentPlayer}'s wins!`;
    gameStatus.running = false;
  } else if (!gameBoard.options.includes("")) {
    statusText.textContent = `DRAW`;
    gameStatus.running = false;
  } else {
    changePlayer();
  }
}

function winGraphics(arr) {
  arr.forEach((el) => {
    let cell = document.querySelector(`[data-array="${el}"]`);
    cell.style.backgroundColor = "#08D9D6";
    cell.style.color = "#000";
  });
}

function changePlayer() {
  if (gameStatus.running) {
    gameStatus.currentPlayer = gameStatus.currentPlayer == "X" ? "O" : "X";
    statusText.textContent = `Player ${gameStatus.currentPlayer}'s move!`;
  }
}

function restartGame() {
  gameStatus.running = true;
  gameStatus.currentPlayer = "X";
  gameBoard.options = ["", "", "", "", "", "", "", "", ""];
  // gameBoard.cells.forEach((cell) => (cell.textContent = ""));
  gameBoard.cells.forEach((cell) => {
    cell.textContent = "";
    cell.style.backgroundColor = "white";
  });
}

// function constructor
function Player(name) {
  this.name = name;
}

// function factory makes player and keeps player score
// After typing in name, and click Start, new player instance will be created:
function createPlayer(username = "Bob") {
  const name = username;

  // private variable stored in the instance
  let score = 0;

  const resetScore = () => {
    score = 0;
  };
  const addScore = () => score++;
  const getScore = () => score;

  const getScoreLong = function () {
    return score;
  };

  return { name, resetScore, addScore, getScore, getScoreLong };
}
