document.addEventListener("DOMContentLoaded", () => {
    const sudokuBoard = document.getElementById("sudokuBoard");
    window.grid = Array.from({length: 9}, () => Array(9).fill(0)); // Make grid global

    for (let i = 0; i < 9; i++) {
        const row = sudokuBoard.insertRow();
        for (let j = 0; j < 9; j++) {
            const cell = row.insertCell();
            cell.className = "sudoku-cell";
            cell.contentEditable = true;
            cell.addEventListener("input", (event) => handleCellInput(event, i, j));
        }
    }

    function handleCellInput(event, row, col) {
        const value = event.target.textContent.trim();
        if (!/^[1-9]$/.test(value)) {
            event.target.textContent = "";
            grid[row][col] = 0;
        } else {
            grid[row][col] = parseInt(value);
        }
    }

    document.getElementById("randomButton").addEventListener("click", () => {
        generateRandom(grid);
    });

    document.getElementById("solveButton").addEventListener("click", () => {
        if (solveSudoku(grid)) {
            fillBoard(grid);
        } else {
            alert("No solution exists!");
        }
    });

    document.getElementById("clearButton").addEventListener("click", () => {
        clearBoard();
    });

    function generateRandom(grid) {
        clearBoard();
        for (let i = 0; i < 9; i++) {
            for (let j = 0; j < 9; j++) {
                if (Math.random() < 0.2) {
                    const num = Math.floor(Math.random() * 9) + 1;
                    if (isSafe(grid, i, j, num)) {
                        grid[i][j] = num;
                        sudokuBoard.rows[i].cells[j].textContent = num;
                    }
                }
            }
        }
    }

    function clearBoard() {
        for (let i = 0; i < 9; i++) {
            for (let j = 0; j < 9; j++) {
                grid[i][j] = 0;
                sudokuBoard.rows[i].cells[j].textContent = "";
            }
        }
    }

    function fillBoard(grid) {
        for (let i = 0; i < 9; i++) {
            for (let j = 0; j < 9; j++) {
                sudokuBoard.rows[i].cells[j].textContent = grid[i][j];
            }
        }
    }

    function solveSudoku(grid) {
        let empty = findEmptyLocation(grid);
        if (!empty) {
            return true; // Solved
        }
        let [row, col] = empty;

        for (let num = 1; num <= 9; num++) {
            if (isSafe(grid, row, col, num)) {
                grid[row][col] = num;
                if (solveSudoku(grid)) {
                    return true;
                }
                grid[row][col] = 0; // Unmake & try again
            }
        }
        return false; // Trigger backtracking
    }

    function findEmptyLocation(grid) {
        for (let row = 0; row < 9; row++) {
            for (let col = 0; col < 9; col++) {
                if (grid[row][col] === 0) {
                    return [row, col];
                }
            }
        }
        return null;
    }

    function isSafe(grid, row, col, num) {
        // Check if 'num' is not already placed in current row
        for (let x = 0; x < 9; x++) {
            if (grid[row][x] === num) {
                return false;
            }
        }
        // Check if 'num' is not already placed in current column
        for (let x = 0; x < 9; x++) {
            if (grid[x][col] === num) {
                return false;
            }
        }
        // Check if 'num' is not already placed in current 3x3 sub-box
        if (!isInBox(grid, row, col, num)) {
            return false;
        }
        return true;
    }

    function isInBox(grid, startRow, startCol, num) {
        let boxStartRow = startRow - startRow % 3;
        let boxStartCol = startCol - startCol % 3;
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                if (grid[boxStartRow + i][boxStartCol + j] === num) {
                    return false;
                }
            }
        }
        return true;
    }
});
