const startingBoard = [null, null, null, null, null, null, null, null, null];
let sign = "X";
const message = document.getElementById("msg");

render(startingBoard); //render the inital empty board

function render(board) {
  let boardElement = document.createElement("div");
  boardElement.id = "container";
  const winner = isWon(board);

  const rootDiv = document.getElementById("root");

  if (winner) {
    message.innerHTML = "Winner: " + winner;
  } else if (board.every((square) => square !== null)) {
    message.innerHTML = "DRAW";
  } else {
    message.innerHTML = "Next player: " + sign;
  }

  board.forEach((square, index) => {
    const squareElement = document.createElement("div");
    squareElement.classList.add("p");
    squareElement.id = `p${index}`;
    squareElement.textContent = square;
    squareElement.addEventListener("click", () => {
      const newBoard = play(index, board);
      render(newBoard);
    });
    boardElement.append(squareElement);
  });

  rootDiv.replaceChildren(boardElement);
}

function isWon(board) {
  const winConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 4, 8],
    [2, 4, 6],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
  ];

  for (const combination of winConditions) {
    const [a, b, c] = combination;
    const posA = board[a];
    const posB = board[b];
    const posC = board[c];

    if (areMatching(posA, posB, posC)) {
      return posA;
    }
  }
  return null;
}

function play(index, board) {
  if (board[index] != null || isWon(board)) return board;

  const newBoardState = board.slice(); //.slice() with no arguments returns a shallow copy of the array, a .copy() in java

  newBoardState[index] = sign;
  sign = sign === "X" ? "O" : "X";
  return newBoardState;
}

function reset() {
  render(startingBoard);
  sign = "X";
  message.innerHTML = "Next player: " + sign;
}

function areMatching(a, b, c) {
  return a === b && b === c;
}
