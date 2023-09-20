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
            render(newBoard); // i know i dont need to assign it to a const, but its easier on my small brain :x
          });
          boardElement.append(squareElement);
        });

        const rootDiv = document.getElementById("root");
        rootDiv.replaceChildren(boardElement); // board is only rendered in the "root" div as to not interfere with other html elements.
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

        for (const combination of winConditions){
          const [a, b, c] = combination;
          const posA = board[a];
          const posB = board[b];
          const posC = board[c];

          if(areMatching(posA,posB,posC) && notEmpty(posA,posB,posC)){
            console.log("WINNER WINNER") //for now
          }

        }
      }

      function play(square, board) {
        console.log(square)
        const newBoardState = board.slice(); //.slice() with no arguments returns a shallow copy of the array, a .copy() in java
        console.log(newBoardState);

        if (newBoardState[square] === null) {
          newBoardState[square] = sign;
          const divElement = document.getElementById(`p${square}`).innerHTML = sign;
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
      function notEmpty(a , b, c){
        return a != null && b != null && c != null
      }


      function areMatching(a, b, c){
        return a === b && b === c
      }

