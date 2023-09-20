      const startingBoard = [null, null, null, null, null, null, null, null, null];
      let sign = "X";

      render(startingBoard); //render the inital empty board

      function render(board) {
        let boardElement = document.createElement("div");
        boardElement.id = "container";

        board.forEach((square, index) => {
          const squareElement = document.createElement("div");
          squareElement.classList.add("p");
          squareElement.id = `p${index}`;
          squareElement.textContent = square;
          squareElement.addEventListener("click", () => {
            const newBoard = play(index, board);
            render(newBoard); // i know this is dumb, but its easy on my small brain :x
          });
          boardElement.append(squareElement);
        });

        const rootDiv = document.getElementById("root");
        rootDiv.replaceChildren(boardElement);
      }

      function isWon(board) {
        const winStreaks = [
          [0, 1, 2],
          [3, 4, 5],
          [6, 7, 8],
          [0, 4, 8],
          [2, 4, 6],
          [0, 3, 6],
          [1, 4, 7],
          [2, 5, 8],
        ];
      }

      function play(square, board) {
        console.log(square)
        const newBoardState = board.slice(); 
        console.log(newBoardState);

        if (newBoardState[square] === null) {
          newBoardState[square] = sign;
          const divElement = document.getElementById(`p${square}`).innerHTML = sign;
          console.log(divElement);
          sign = sign === "X" ? "O" : "X";
          return newBoardState;
        }
      }

      function reset() {
        render(startingBoard);
      }