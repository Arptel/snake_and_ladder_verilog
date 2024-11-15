const rollDiceBtn = document.getElementById("rollDiceBtn");
const player1Piece = document.getElementById("player1");
const player2Piece = document.getElementById("player2");
const result = document.getElementById("result");

let positions = [0, 0]; // Positions for Player 1 and Player 2
let currentPlayer = 0; // 0 for Player 1, 1 for Player 2

rollDiceBtn.addEventListener("click", async () => {
    const diceRoll = Math.floor(Math.random() * 6) + 1;
    result.innerText = `Player ${currentPlayer + 1} rolled a ${diceRoll}`;

    try {
        const response = await fetch("http://localhost:3000/roll_dice", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                position1: positions[0],
                position2: positions[1],
                diceRoll,
                playerTurn: currentPlayer,
            }),
        });

        if (!response.ok) throw new Error("Server error");

        const { newPosition1, newPosition2, x1, y1, x2, y2, status } = await response.json();

        // Update positions
        if (newPosition1 != 0) positions[0] = newPosition1;
        if (newPosition2 != 0) positions[1] = newPosition2;

        // Update player positions on the board
        if (x1 != 0) player1Piece.style.left = `${x1}px`;
        if (y1 != 0) player1Piece.style.top = `${y1}px`;
        if (x2 != 0) player2Piece.style.left = `${x2}px`;
        if (y2 != 0) player2Piece.style.top = `${y2}px`;

        // Check for winner
        if (status === 1) {
            result.innerText = "Player 1 wins!";
            resetGame();
        } else if (status === 2) {
            result.innerText = "Player 2 wins!";
            resetGame();
        } else {
            // Switch to the other player's turn
            currentPlayer = 1 - currentPlayer;
        }
    } catch (error) {
        console.error("Error:", error);
        result.innerText = "Error communicating with server.";
    }
});

function resetGame() {
    positions = [0, 0];
    player1Piece.style.left = "-25px";
    player1Piece.style.top = "475px";
    player2Piece.style.left = "-30px";
    player2Piece.style.top = "475px";
    currentPlayer = 0;
}
