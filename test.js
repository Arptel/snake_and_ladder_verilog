const { exec } = require('child_process'); // Import exec from child_process

let position = 1;  // Example position
const diceRoll = 3;  // Example dice roll

for (i=0;i<5;i++){
exec(`vvp snake_ladder.vvp +position=${position} +diceRoll=${diceRoll}`, (error, stdout, stderr) => {
    if (error) {
        console.error(`Error: ${error.message}`);
        return; // Optionally handle the error appropriately
    }
    if (stderr) {
        console.error(`stderr: ${stderr}`);
    }

    console.log(`stdout: ${stdout}`); // Log the stdout for debugging
    output=stdout.trim();
    const { newPosition, x, y, status } = getelements(output)
    console.log(newPosition,x,y,status);
    position = newPosition;
});
}

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
