class LightsOut {
    constructor(gameId) {
        this.gameId = gameId;
        this.numRows = 4;
        this.numCols = 4;
        this.randomize();
        this.registerClicks();
    }

    randomize() {
        for(let row = 0; row < this.numRows; row++) {
            for(let col = 0; col < this.numCols; col++) {
                if(Math.random() < 0.5) {
                    document.querySelector(`#${this.gameId} [data-row="${row}"][data-col="${col}"]`)
                    .classList.toggle("on");
                }
            }
        }
    }

    getNeighbors(row, col) {
        const neighborArray = [];
        
        if(row < this.numRows - 1) {
            if(row > 0) {
                neighborArray.push([row + 1, col]);
                neighborArray.push([row - 1, col]);
            } else {
                neighborArray.push([row + 1, col]);
                neighborArray.push([this.numRows - 1, col]);
            }
        } else {
            neighborArray.push([0, col]);
            neighborArray.push([row - 1, col]);
        }
        if(col < this.numCols - 1) {
            if(col > 0) {
                neighborArray.push([row, col + 1]);
                neighborArray.push([row, col - 1]);
            } else {
                neighborArray.push([row, col + 1]);
                neighborArray.push([row, this.numCols - 1]);     
            }
        } else {
            neighborArray.push([row, 0]);
            neighborArray.push([row, col - 1]);
        }

        console.log(neighborArray);
        return neighborArray;
    }

    registerClicks() {
        for(let row = 0; row < this.numRows; row++) {
            for(let col = 0; col < this.numCols; col++) {
                const button = document.querySelector(`#${this.gameId} [data-row="${row}"][data-col="${col}"]`);
                button.addEventListener('click', () => {
                    button.classList.toggle("on");
                    const neighbors = this.getNeighbors(row, col);
                    
                    neighbors.forEach(neighbor => document.querySelector(`#${this.gameId} [data-row="${neighbor[0]}"][data-col="${neighbor[1]}"]`)
                    .classList.toggle("on"));
                });
            }
        }
    }
}