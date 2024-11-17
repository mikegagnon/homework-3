class LightsOut {
    constructor(gameId, numRows, numCols) {
        this.gameId = gameId;
        this.numRows = numRows;
        this.numCols = numCols;
        this.doSolve = (this.numRows === 4 && this.numCols === 4);
        this.appendHtml();
        this.randomize();
        this.registerClicks();
        this.solve();
    }

    appendHtml() {
        for (let row = 0; row < this.numRows; row++) {
            let currentRow = document.createElement("div");
            currentRow.classList.add("row");
            for (let col = 0; col < this.numCols; col++) {
                let currentButton = document.createElement("div");
                currentButton.classList.add("button");
                currentButton.setAttribute("data-row", row);
                currentButton.setAttribute("data-col", col);
                currentRow.appendChild(currentButton);
            }
            document.getElementById(this.gameId).appendChild(currentRow);
        }        
    }

    randomize() {
        for (let row = 0; row < this.numRows; row++) {
            for (let col = 0; col < this.numCols; col++) {
                if (Math.random() < 0.5) {
                    document.querySelector(`#${this.gameId} [data-row="${row}"][data-col="${col}"]`)
                    .classList.toggle("on");
                }
            }
        }
    }

    getNeighbors(row, col) {
        const neighborArray = [];
        if (row < this.numRows - 1) {
            neighborArray.push([row + 1, col]);
            if (row > 0) {
                neighborArray.push([row - 1, col]);
            } else {
                neighborArray.push([this.numRows - 1, col]);
            }
        } else {
            neighborArray.push([0, col]), neighborArray.push([row - 1, col]);
        }
        if (col < this.numCols - 1) {
            neighborArray.push([row, col + 1]);
            if (col > 0) {
                neighborArray.push([row, col - 1]);
            } else {
                neighborArray.push([row, this.numCols - 1]);     
            }
        } else {
            neighborArray.push([row, 0]), neighborArray.push([row, col - 1]);
        }
        return neighborArray;
    }

    registerClicks() {
        for (let row = 0; row < this.numRows; row++) {
            for (let col = 0; col < this.numCols; col++) {
                const button = document.querySelector(`#${this.gameId} [data-row="${row}"][data-col="${col}"]`);
                button.addEventListener('click', () => {
                    button.classList.toggle("on");
                    const neighbors = this.getNeighbors(row, col);
                    for (const neighbor of neighbors) {
                        const [r, c] = neighbor;
                        document.querySelector(`#${this.gameId} [data-row="${r}"][data-col="${c}"]`)
                            .classList.toggle("on");
                    }
                    this.solve();
                });
            }
        }
    }

    solve() {
        if (!this.doSolve) {
            return;
        }
        for (let row = 0; row < this.numRows; row++) {
            for (let col = 0; col < this.numCols; col++) {
                document.querySelector(`#${this.gameId} [data-row="${row}"][data-col="${col}"]`).textContent = null;
            }
        }
        for (let row = 0; row < this.numRows; row++) {
            for (let col = 0; col < this.numCols; col++) {
                const button = document.querySelector(`#${this.gameId} [data-row="${row}"][data-col="${col}"]`);
                if (button.classList.contains("on")) { 
                    const neighbors = this.getNeighbors(row, col);
                    neighbors.push([row, col]);
                    for (const neighbor of neighbors) {
                        const [r, c] = neighbor;
                        if (document.querySelector(`#${this.gameId} [data-row="${r}"][data-col="${c}"]`).textContent) {
                            document.querySelector(`#${this.gameId} [data-row="${r}"][data-col="${c}"]`).textContent = null;
                        } else {
                            document.querySelector(`#${this.gameId} [data-row="${r}"][data-col="${c}"]`).textContent = "Click me!";
                        }
                    }
                }
            }
        }
    }
}