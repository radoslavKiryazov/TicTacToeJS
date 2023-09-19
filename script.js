      const board = ["x", null, null, null, null, null, null, null, null];
      let sign = "X";
      const button = document.getElementById("reset-btn");
      button.onclick = () => reset(board);

      render(board);

      function render(board) {
        const boardElement = document.createElement("div");
        boardElement.id = "container";
        let i = 0;
        board.forEach((position, index) => {
          const element = document.createElement("div");
          element.classList.add("p");
          element.id = `p${i}`;
          element.addEventListener("click", () => play(index, board));
          boardElement.appendChild(element);
          i++;
        });
        document.body.replaceChildren(boardElement);
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

      function play(position, board) {
        const newBoardState = board;
        if (newBoardState[position] === null) {
          newBoardState[position] = sign;
          board = newBoardState;
          document.getElementById(`p${position}`).innerText = sign;
          sign = sign === "X" ? "O" : "X";
          render(board);
        }
      }

      function reset(b) {
        console.log(board);
        let emptyBoard = b;
        emptyBoard.forEach((el)=> (el = null));
        console.log(emptyBoard[0]==null);
        board = emptyBoard
        console.log(board[0]==null);
        /* let arr = Array.from(document.getElementsByClassName("p"));
        console.log(arr.length);
        arr.forEach((element) => (element.innerText = "")); */
      }