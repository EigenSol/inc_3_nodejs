const readline = require("readline");

board = {
    L1: " ", C1: " ", R1: " ",
    L2: " ", C2: " ", R2: " ",
    L3: " ", C3: " ", R3: " "
}

function printBoard() {
    console.log(" " + board.L1 + " " + "|" + " " + board.C1 + " " + "|" + " " + board.R1);
    console.log("---+---+---");
    console.log(" " + board.L2 + " " + "|" + " " + board.C2 + " " + "|" + " " + board.R2);
    console.log("---+---+---");
    console.log(" " + board.L3 + " " + "|" + " " + board.C3 + " " + "|" + " " + board.R3);
}

function checkWin() {
    if (board.L1 == board.C1 && board.C1 == board.R1 && board.L1 != " ") return board.L1;
    if (board.L2 == board.C2 && board.C2 == board.R2 && board.L2 != " ") return board.L2;
    if (board.L3 == board.C3 && board.C3 == board.R3 && board.L3 != " ") return board.L3;
    if (board.L1 == board.L2 && board.L2 == board.L3 && board.L1 != " ") return board.L1;
    if (board.C1 == board.C2 && board.C2 == board.C3 && board.C1 != " ") return board.C1;
    if (board.R1 == board.R2 && board.R2 == board.R3 && board.R1 != " ") return board.R1;
    if (board.L1 == board.C2 && board.C2 == board.R3 && board.L1 != " ") return board.L1;
    if (board.L3 == board.C2 && board.C2 == board.R1 && board.L3 != " ") return board.L3;
    return NaN
}

// input util func
function input(text) {
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });
    return new Promise((resolve) => {
        rl.question(text, (answer) => {
            rl.close();
            resolve(answer);
        });
    });
}

async function main() {
    let turn = "X";
    let gameRunning = true;

    while (gameRunning) {
        process.stdout.write("\x1Bc");
        
        printBoard();
        console.log(`${turn}'s turn`);
        
        let validMove = false;
        let move;
        
        while (!validMove) {
            move = await input("Choose (L1, C1, R1, etc.): ");
            move = move.toUpperCase();
            
            if (board[move] === undefined) {
                process.stdout.write("\x1Bc");
                printBoard();
                console.log("Invalid position! Please choose L1, C1, R1, L2, C2, R2, L3, C3, or R3.");
            } else if (board[move] !== " ") {
                process.stdout.write("\x1Bc");
                printBoard();
                console.log("Position already taken! Choose another.");
            } else {
                validMove = true;
            }
        }
        
        board[move] = turn;
        
        const winner = checkWin();
        if (winner) {
            process.stdout.write("\x1Bc");
            printBoard();
            console.log(`${winner} wins!`);
            gameRunning = false;
        } else if (Object.values(board).every(cell => cell !== " ")) {
            process.stdout.write("\x1Bc");
            printBoard();
            console.log("It's a draw!");
            gameRunning = false;
        } else {
            turn = turn === "X" ? "O" : "X";
        }
    }
    
    process.exit(0);
}

main();