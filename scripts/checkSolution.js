document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("checkButton").addEventListener("click", () => {
        if (checkSolution(grid)) {
            alert("The solution is correct!");
        } else {
            alert("The solution is incorrect.");
        }
    });

    function checkSolution(grid) {
        // Check each row
        for (let row = 0; row < 9; row++) {
            let rowSet = new Set();
            for (let col = 0; col < 9; col++) {
                let num = grid[row][col];
                if (num === 0 || rowSet.has(num)) {
                    return false;
                }
                rowSet.add(num);
            }
        }

        // Check each column
        for (let col = 0; col < 9; col++) {
            let colSet = new Set();
            for (let row = 0; row < 9; row++) {
                let num = grid[row][col];
                if (num === 0 || colSet.has(num)) {
                    return false;
                }
                colSet.add(num);
            }
        }

        // Check each 3x3 box
        for (let boxRow = 0; boxRow < 9; boxRow += 3) {
            for (let boxCol = 0; boxCol < 9; boxCol += 3) {
                let boxSet = new Set();
                for (let row = 0; row < 3; row++) {
                    for (let col = 0; col < 3; col++) {
                        let num = grid[boxRow + row][boxCol + col];
                        if (num === 0 || boxSet.has(num)) {
                            return false;
                        }
                        boxSet.add(num);
                    }
                }
            }
        }

        return true;
    }
});
