let player1 = document.getElementById("player-1");
let player2 = document.getElementById("player-2");
let h1 = document.createElement("h1");
let currentPlayer = "X"; 
let gameState = Array(9).fill(null); 

function tictactoe(event) {
  if (event) event.preventDefault();
  document.body.innerHTML = "";

  h1.className = "message";
  h1.style.textAlign = "center";
  h1.style.color = "green";
  h1.innerText = `${player1.value}, you're up!`;
  document.body.appendChild(h1);

  let table = document.createElement("table");
  table.style.width = "80vw";
  table.style.margin = "0 auto";
  table.style.height = "80vh";
  table.id = "tic-tac-toe";

  let count = 1;
  for (let i = 0; i < 3; i++) {
    let tr = document.createElement("tr");
    for (let j = 0; j < 3; j++) {
      let td = document.createElement("td");
      td.style.border = "1px solid black";
      td.style.textAlign = "center";
      td.style.width = "3rem";
      td.style.height = "3rem";
      td.style.fontSize = "2rem";
      td.style.cursor = "pointer";
      td.id = count;
      count++;
      tr.appendChild(td);
    }
    table.appendChild(tr);
  }

  document.body.appendChild(table);

  table.addEventListener("click", insertData);
}

function updateTurn() {
  if (currentPlayer === "X") {
    h1.innerText = `${player1.value}, you're up!`;
  } else {
    h1.innerText = `${player2.value}, you're up!`;
  }
}
function CheckDraw(){
 return( gameState.every((index)=>index!==null));
}

function insertData(event) {
  const cell = event.target;
  if (cell.tagName === "TD" && !cell.textContent) {
    const cellId = parseInt(cell.id) - 1;

    cell.textContent = currentPlayer;
    gameState[cellId] = currentPlayer;

    // Set background color based on current player
    if (currentPlayer === "X") {
      cell.style.backgroundColor = "#66B2FF";
    } else {
      cell.style.backgroundColor = "#FF9999";
    }

    if (checkWinner()) {
      h1.innerText = `${currentPlayer === "X" ? player1.value : player2.value}, congratulations you won!`;
      document.querySelector("#tic-tac-toe").removeEventListener("click", insertData);

      // Remove the table after the winner is decided
      document.body.removeChild(document.querySelector("#tic-tac-toe"));

      // h1 element is centered in the middle of the page
      h1.style.height = "30vh";
      h1.style.display = "flex";
      h1.style.alignItems = "flex-end";
      h1.style.justifyContent = "center";
      document.body.appendChild(h1);

      let btn = document.createElement("button");
      btn.id = "restart-gameState";
      btn.style.backgroundColor = currentPlayer === "X" ? "#66B2FF" : "#FF9999";
      btn.style.color = "white";
      btn.innerText = "Restart Game";
      btn.style.display = "block";
      btn.style.margin = "1rem auto";
      btn.style.padding = "1rem 2rem"; 
      btn.style.fontSize = "1.5rem";
      btn.style.cursor = "pointer";
      document.body.appendChild(btn);

      btn.addEventListener("click", () => {
        location.reload(); // Re-read the JS code from the start hehe
      });

      let btn1 = document.createElement("button");
      btn1.id = "restart-table";
      btn1.style.backgroundColor = "#FF9999"
      btn1.style.color = "white";
      btn1.innerText = "Restart Table";
      btn1.style.display = "block";
      btn1.style.margin = "1rem auto";
      btn1.style.padding = "1rem 2rem"; 
      btn1.style.fontSize = "1.5rem";
      btn1.style.cursor = "pointer";
      document.body.appendChild(btn1);

      btn1.addEventListener("click", () => {
        currentPlayer = "X";
        gameState = Array(9).fill(null);

        // Remove existing elements and set up the game board again
        document.body.innerHTML = "";
        tictactoe();
        updateTurn();
      });

      return;
    }
    if(CheckDraw()){
     setTimeout(() => {
      alert("It's a Draw");
      currentPlayer = "X";
      gameState = Array(9).fill(null);

      // Remove existing elements and set up the game board again
      document.body.appendChild(h1);
      tictactoe();
      updateTurn();
     }, 500);
    }

    currentPlayer = currentPlayer === "O" ? "X" : "O";
    updateTurn();
  }
}

function checkWinner() {
  const winningCombinations = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],
    [0, 3, 6], [1, 4, 7], [2, 5, 8],
    [0, 4, 8], [2, 4, 6]
  ];

  return winningCombinations.some((combination) =>   
    combination.every((index) => gameState[index] === currentPlayer)
  );
}

document.querySelector("form").addEventListener("submit", tictactoe);
