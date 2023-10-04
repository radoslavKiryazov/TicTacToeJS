const createBoard = () => {
  const createSquare = () => {
    return { sign: "" };
  };
  let squares;
  // Checking if the argument is provided. functuion 
  squares = Array.from({ length: 9 }, createSquare);
  
  return { grid: squares };
};

//const startingBoard = [null, null, null, null, null, null, null, null, null]; //Should be replaced with an object Board
const initalBoard = createBoard();
let sign = "X";
const message = document.getElementById("msg");

render(initalBoard); //render the inital empty board

function render(board) {
  let boardElement = document.createElement("div");
  boardElement.id = "container";
  const winner = isWon(board);

  const rootDiv = document.getElementById("root");

  if (winner) {
    message.innerHTML = "Winner: " + winner;
  } else if (board.grid.every((square) => square.sign !== "")) {
    message.innerHTML = "DRAW";
  } else {
    message.innerHTML = "Next player: " + sign;
  }

  board.grid.forEach((square, index) => {
    const squareElement = document.createElement("div");
    squareElement.classList.add("p");
    squareElement.id = `p${index}`;
    squareElement.textContent = square.sign;
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
    const posA = board.grid[a].sign;
    const posB = board.grid[b].sign;
    const posC = board.grid[c].sign;

    if (areMatching(posA, posB, posC)) {
      return posA;
    }
  }
  return null;
}

function play(index, board) {
  const newBoardState = board;

  newBoardState.grid[index].sign = sign;
  
  sign = sign === "X" ? "O" : "X";

  return newBoardState;
}

function reset() {
  render(createBoard());
  sign = "X";
  message.innerHTML = "Next player: " + sign;
}

function areMatching(a, b, c) {
  return a === b && b === c;
}
