module SnakeLadder(
    output reg [6:0] newPosition,
    output reg [15:0] x_coord,    
    output reg [15:0] y_coord
);
    // Define snake and ladder positions
    reg [6:0] snakes [100:0];
    reg [6:0] ladders [100:0];

    integer i;
    integer position;
    integer diceRoll;
    integer row,col;
    integer status = 0;
    parameter boardSize = 10;
    parameter gridSize = 50;

    initial begin
        // Initialize all snake and ladder positions to 0
        for (i = 0; i <= 100; i = i + 1) begin
            snakes[i] = 0;
            ladders[i] = 0;
        end

        // Get the values passed from the terminal
        if (!$value$plusargs("position=%d", position)) begin
            $display("Error: No position argument provided.");
            // pos_val = 1;  // default value if not provided
        end
        if (!$value$plusargs("diceRoll=%d", diceRoll)) begin
            $display("Error: No diceRoll argument provided.");
            // dice_val = 1;  // default value if not provided
        end

        // Define specific snakes and ladders
        snakes[17] = 7;
        snakes[54] = 34;
        snakes[62] = 19;
        snakes[64] = 60;
        snakes[87] = 36;
        snakes[93] = 73;
        snakes[95] = 75;
        snakes[98] = 79;

        ladders[1] = 38;
        ladders[4] = 14;
        ladders[9] = 31;
        ladders[4] = 14;
        ladders[21] = 42;
        ladders[28] = 84;
        ladders[51] = 67;
        ladders[72] = 91;
        ladders[80] = 99;
        // Add more snakes and ladders as needed
    end
    always @(position or diceRoll) begin
        newPosition = position + diceRoll;
        if (newPosition > 100) begin
            newPosition = position;
        end else if (newPosition < 100) begin
            if (snakes[newPosition] != 0) begin
                newPosition = snakes[newPosition]; // Move down on snake
            end else if (ladders[newPosition] != 0) begin
                newPosition = ladders[newPosition]; // Move up on ladder
            end
        end else begin
            status = 1;
        end

        //find x and y coordinates from position
        row = (newPosition - 1) / boardSize;
        col = (newPosition - 1) % boardSize;

        // Reverse the column for odd-numbered rows
        if (row % 2 == 1) begin
            col = boardSize - col - 1;
        end

        // Calculate x and y coordinates
        x_coord = col * gridSize + (gridSize / 2);
        y_coord = (boardSize - row - 1) * gridSize + (gridSize / 2);

        //output
        $display("newposition=%d,x=%d,y=%d,status=%d", newPosition, x_coord, y_coord,status);
    end
endmodule
