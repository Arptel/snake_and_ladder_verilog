// JavaScript to render the board and handle moves
const board = document.getElementById("board");
const result = document.getElementById("result");
let player1Pos = 1;
let player2Pos = 1;
let currentPlayer = 1;

// Initialize a 10x10 board
function drawBoard() {
    board.innerHTML = '';
    for (let i = 100; i > 0; i--) {
        const cell = document.createElement("div");
        cell.classList.add("cell");
        cell.id = `cell-${i}`;
        cell.innerText = i;
        board.appendChild(cell);
    }
}
drawBoard();

// Display players on the board
function updateBoard() {
    document.querySelectorAll(".player").forEach(e => e.remove());
    const p1 = document.createElement("div");
    p1.classList.add("player", "player1");
    document.getElementById(`cell-${player1Pos}`).appendChild(p1);

    const p2 = document.createElement("div");
    p2.classList.add("player", "player2");
    document.getElementById(`cell-${player2Pos}`).appendChild(p2);
}

// Handle dice roll
document.getElementById("rollDice").addEventListener("click", async () => {
    const diceRoll = Math.floor(Math.random() * 6) + 1;
    result.innerText = `Player ${currentPlayer} rolled a ${diceRoll}`;

    try {
        // Send the dice roll to the backend to calculate new position
        const response = await fetch("http://localhost:3000/roll_dice", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ player: currentPlayer, position: currentPlayer === 1 ? player1Pos : player2Pos, diceRoll })
        });
        // result.innerText = `data, ${response}`;

        const data = await response.json();
        if (currentPlayer === 1) {
            player1Pos = data.newPosition;
        } else {
            player2Pos = data.newPosition;
        }

        // Update the board with new positions
        updateBoard();

        // Switch players
        currentPlayer = currentPlayer === 1 ? 2 : 1;
    } catch (error) {
        // result.innerText = `Error, ${error}`;
        console.error("Error:", error);
    }
});
