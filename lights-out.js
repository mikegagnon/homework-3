class LightsOut {
    constructor(gameId) {
        this.gameId = gameId;
        this.numRows = 4;
        this.numCols = 4;
        this.randomize();
        this.registerClicks();
        this.solve();
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
                    if (!button.textContent) {
                        this.solve();
                    } else {
                        button.textContent = null;
                    }
                });
            }
        }
    }

    solve() {
        for (let row = 0; row < this.numRows; row++) {
            for (let col = 0; col < this.numCols; col++) {
                document.querySelector(`#${this.gameId} [data-row="${row}"][data-col="${col}"]`).textContent = null;
            }
        }
        for (let row = 0; row < this.numRows; row++) {
            for (let col = 0; col < this.numCols; col++) {
                const button = document.querySelector(`#${this.gameId} [data-row="${row}"][data-col="${col}"]`);
                const neighbors = this.getNeighbors(row, col);
                if (button.classList.contains("on")) { 
                    if (button.textContent) {
                        button.textContent = null;
                    } else {
                        button.textContent = "Click me!";
                    }
                    const neighbors = this.getNeighbors(row, col);
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