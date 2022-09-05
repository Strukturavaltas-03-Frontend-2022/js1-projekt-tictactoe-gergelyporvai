"use strict";

const player_X_class = "x";
const player_O_class = "circle";

const winning_combinations = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

const cells = document.querySelectorAll("[data-cell]");
const board = document.getElementById("board");
const winningMessage = document.getElementById("winningMessage");
const restartButton = document.getElementById("restartButton");
const winningMessageText = document.getElementById("winningMessageText");
let isPlayer_O_Turn = false;
let isEnded = false;

const initGame = () => {
  winningMessageText.innerText = "";
  isPlayer_O_Turn = false;
  isEnded = false;
  cells.forEach((cell) => {
    cell.classList.remove(player_X_class);
    cell.classList.remove(player_O_class);
    cell.removeEventListener("click", handleCellClick);
    cell.addEventListener("click", handleCellClick, { once: true });
    cell.innerHTML = "";
  });
  setBoardHoverClass();
  winningMessage.classList.remove("show");
};

restartButton.addEventListener("click", initGame);

const handleCellClick = (element) => {
  const cell = element.target;
  const currentClass = isPlayer_O_Turn ? player_O_class : player_X_class;
  placeMark(cell, currentClass);
  if (checkWin(currentClass)) {
    endGame(false);
    if (isPlayer_O_Turn === true) {
      cell.innerHTML = "<i class='fa fa-solid fa-circle-thin'></i>";
    } else {
      cell.innerHTML = "<i class='fa fa-solid fa-times'></i>";
    }
    isEnded = true;
  } else if (isDraw()) {
    endGame(true);
    if (isPlayer_O_Turn === true) {
      cell.innerHTML = "<i class='fa fa-solid fa-circle-thin'></i>";
    } else {
      cell.innerHTML = "<i class='fa fa-solid fa-times'></i>";
    }
  } else {
    swapTurns();
    setBoardHoverClass(cell);
  }
};

const endGame = (draw) => {
  if (draw) {
    winningMessageText.innerText = "Az eredmény döntetlen.";
  } else {
    winningMessageText.innerText = `A${
      isPlayer_O_Turn ? " kör " : "z X "
    }játékos nyert! Gratulálok!`;
  }
  winningMessage.classList.add("show");
  cells.forEach((cell) => cell.removeEventListener("click", handleCellClick));
  board.classList.remove(player_X_class);
  board.classList.remove(player_O_class);
};

const isDraw = () => {
  return [...cells].every((cell) => {
    return (
      cell.classList.contains(player_X_class) ||
      cell.classList.contains(player_O_class)
    );
  });
};

const placeMark = (cell, currentClass) => {
  if (isEnded === false) {
    cell.classList.add(currentClass);
  }
};

const swapTurns = () => {
  if (isEnded === false) {
    isPlayer_O_Turn = !isPlayer_O_Turn;
  }
};

const setBoardHoverClass = (cell) => {
  if (isEnded === false) {
    board.classList.remove(player_X_class);
    board.classList.remove(player_O_class);

    if (isPlayer_O_Turn === true) {
      board.classList.add(player_O_class);
      cell.innerHTML = "<i class='fa fa-solid fa-times'></i>";
    } else {
      board.classList.add(player_X_class);
      cell.innerHTML = "<i class='fa fa-solid fa-circle-thin'></i>";
    }
  } else {
    cell.classList.add(grey);
  }
};

const checkWin = (currentClass) => {
  return winning_combinations.some((combination) => {
    return combination.every((index) => {
      return cells[index].classList.contains(currentClass);
    });
  });
};

initGame();
