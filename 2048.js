//2048 game

var board;
var score = 0;


var rows = 4;
var columns = 4;


window.onload = function() {
    setGame();
}


function setGame() {
    
    board = [
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0]
    ];
    
    const gameBoard = document.querySelector(".board");


    // Create the 16 cells (divs) for the game board grid
    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < columns; c++) {
            let tile = document.createElement("div");            
            tile.id = r.toString() + "-" + c.toString();            
            let num = board[r][c];            
            updateTile(tile, num);           
            gameBoard.appendChild(tile);
        }
    }

   
    setTwo();
    setTwo();
}


function hasEmptyTile() {
    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < columns; c++) {
            if (board[r][c] == 0) {
                return true; 
            }
        }
    }
    return false; 
}


function setTwo() {
    if (!hasEmptyTile()) {
        
        return;
    }

    let found = false;
    while (!found) {      
        let r = Math.floor(Math.random() * rows);
        let c = Math.floor(Math.random() * columns);
      
        if (board[r][c] == 0) {
            board[r][c] = 2;
            let tile = document.getElementById(r.toString() + "-" + c.toString());
            tile.innerText = "2";
            tile.classList.add("tile-2");
            found = true;
        }
    }
}


function updateTile(tile, num) {
    tile.innerText = "";
    tile.className = ""; // Clear all classes
    
    if (num > 0) {
        tile.innerText = num.toString();
        tile.classList.add("tile-" + num.toString());
    }
}


document.addEventListener("keyup", (e) => {
    if (e.code == "ArrowLeft") {
        slideLeft();
        setTwo(); 
    } else if (e.code == "ArrowRight") {
        slideRight();
        setTwo();
    } else if (e.code == "ArrowUp") {
        slideUp();
        setTwo();
    } else if (e.code == "ArrowDown") {
        slideDown();
        setTwo();
    }
   
    document.getElementById("score").innerText = score;
});


function filterZero(row) {
    
    return row.filter(num => num != 0);
}


function slide(row) {    
    row = filterZero(row); 
    for (let i = 0; i < row.length - 1; i++) {
        if (row[i] == row[i + 1]) {
            row[i] *= 2; 
            row[i + 1] = 0; 
            score += row[i]; 
        }
    }

   
    row = filterZero(row); 
    while (row.length < columns) {
        row.push(0); 
    }

    return row;
}



function slideLeft() {
    // Iterate through each row
    for (let r = 0; r < rows; r++) {
        let row = board[r];
        // Apply the slide logic to the row
        row = slide(row);
        board[r] = row;

        // Update the HTML board after the logic is applied
        for (let c = 0; c < columns; c++) {
            let tile = document.getElementById(r.toString() + "-" + c.toString());
            let num = board[r][c];
            updateTile(tile, num);
        }
    }
}

function slideRight() {
    for (let r = 0; r < rows; r++) {
        let row = board[r];
        // Reverse the row to use the same slide logic
        row.reverse();
        row = slide(row);
        // Reverse it back to the original order
        row.reverse();
        board[r] = row;

        // Update the HTML board
        for (let c = 0; c < columns; c++) {
            let tile = document.getElementById(r.toString() + "-" + c.toString());
            let num = board[r][c];
            updateTile(tile, num);
        }
    }
}

function slideUp() {
    // Iterate through each column
    for (let c = 0; c < columns; c++) {
        // Create a temporary "row" from the column
        let row = [board[0][c], board[1][c], board[2][c], board[3][c]];
        row = slide(row);

        // Update the original board with the new column values
        for (let r = 0; r < rows; r++) {
            board[r][c] = row[r];
            let tile = document.getElementById(r.toString() + "-" + c.toString());
            let num = board[r][c];
            updateTile(tile, num);
        }
    }
}

function slideDown() {
    for (let c = 0; c < columns; c++) {
        // Create a temporary "row" from the column
        let row = [board[0][c], board[1][c], board[2][c], board[3][c]];
        // Reverse, slide, and reverse back
        row.reverse();
        row = slide(row);
        row.reverse();

        // Update the original board
        for (let r = 0; r < rows; r++) {
            board[r][c] = row[r];
            let tile = document.getElementById(r.toString() + "-" + c.toString());
            let num = board[r][c];
            updateTile(tile, num);
        }
    }
}
