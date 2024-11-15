const rollDiceBtn = document.getElementById("rollDiceBtn");
const playerPiece = document.getElementById("playerPiece");
const result = document.getElementById("result");

// Initial player position
let position = 0;

rollDiceBtn.addEventListener("click", async () => {
    // Generate a random dice roll between 1 and 6
    const diceRoll = Math.floor(Math.random() * 6) + 1;
    result.innerText = `Player rolled a ${diceRoll}`;
    try {
        // Send the current position and dice roll to the backend
        const response = await fetch("http://localhost:3000/roll_dice", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                player: "Player1",   // Example player identifier
                position: position,  // Current player position
                diceRoll: diceRoll   // Rolled dice value
            })
        });

        if (!response.ok) {
            throw new Error("Failed to reach the server");
        }

        // Parse the new position from the response
        const data = await response.json();
        output = data.output;
        const { newPosition, x, y, status } = getelements(output);
        position = newPosition;
        // Move the player piece to the new position
        playerPiece.style.left = `${x}px`;
        playerPiece.style.top = `${y}px`;
        if (status == 1){
            result.innerText = `Player 1 won the last match`;   
            playerPiece.style.left = `-25px`;
            playerPiece.style.top = `475px`;
        }
    } catch (error) {
        console.error("Error:", error);
    }
});

// Convert board position to x and y coordinates (example logic)
function getelements(output) {
    const match = output.match(/newposition=\s*(\d+),x=\s*(\d+),y=\s*(\d+),status=\s*(\d+)/);
    if (match) {
        const newPosition = parseInt(match[1], 10);
        const x = parseInt(match[2], 10);
        const y = parseInt(match[3], 10);
        const status = parseInt(match[4], 10);

        console.log("Parsed Output:");
        console.log("newposition:", newPosition);
        console.log("x:", x);
        console.log("y:", y);
        console.log("status:", status);
        return {newPosition, x, y, status};
    } else {
        console.error("Output format did not match expected pattern.");
    }
}
