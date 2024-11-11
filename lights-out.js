class LightsOut {
    constructor(gameId) {
        this.gameId = gameId;
        this.numRows = 4;
        this.numCols = 4;
        this.randomize();
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
}