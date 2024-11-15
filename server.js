const express = require("express");
const cors = require("cors");
const { exec } = require("child_process");
const app = express();
app.use(cors());
app.use(express.json());

app.post("/roll_dice", (req, res) => {
    const { player, position, diceRoll } = req.body;
    // Run Verilog simulation with diceRoll and current position
    exec(`vvp snake_ladder.vvp +position=${position} +diceRoll=${diceRoll}`, (error, stdout, stderr) => {
        if (error) {
            console.error(`xError: ${error.message}`);
            return res.status(500).json({ error: "Simulation error" });
        }
        if (stderr){
            console.error(`yError: ${stderr}`);
        }
        // Parse the new position from the Verilog output (e.g., stdout)
        const output = stdout.trim();
        //const newPosition = parseInt(stdout.trim(), 10); // Assuming stdout returns the position directly
        // result.innerText = `np, ${newPosition}`;

        // Send the new position back to the frontend
        res.json({ output });
    });
});

app.listen(3000, () => {
    console.log("Server is running on http://localhost:3000");
});
