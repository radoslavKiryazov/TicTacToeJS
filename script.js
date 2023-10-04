const startingBoard = [null, null, null, null, null, null, null, null, null];
let sign = "X";

render(startingBoard); //render the inital empty board

function render(board) {
  let boardElement = document.createElement("div");
  boardElement.id = "container";

  const rootDiv = document.getElementById("root");

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

  rootDiv.replaceChildren(boardElement); // board is rendered in the "root" div as to not interfere with other html elements.
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

    if (areMatching(posA, posB, posC) && notEmpty(posA, posB, posC)) {
      console.log("WINNER WINNER"); //for now
      return true;
    }
  }
}

function play(index, board) {
  if (board[index] != null) return board;
  console.log(index);
  const newBoardState = board.slice(); //.slice() with no arguments returns a shallow copy of the array, a .copy() in java
  console.log(newBoardState);
  let xIsNext = true;

  if (board[index] != null) return;

  if (xIsNext) {
    newBoardState[index] = sign;
    const divElement = (document.getElementById(`p${index}`).innerHTML = sign);
    console.log(divElement);
    isWon(newBoardState);
    sign = sign === "X" ? "O" : "X";
    return newBoardState;
  }
}

function reset() {
  render(startingBoard);
}

//support functions
function notEmpty(a, b, c) {
  return a != null && b != null && c != null;
}

function areMatching(a, b, c) {
  return a === b && b === c;
}

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (areMatching(a, b, c)) {
      return squares[a];
    }
  }
  return null;
}
