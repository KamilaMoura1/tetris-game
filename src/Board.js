class Board{
    constructor(){
        this.columns = 10
        this.rows = 20
        this.side = 25
        this.ancho = this.columns*this.side
        this.alto = this.rows*this.side
        this.position = createVector(MARGIN_BOARD, MARGIN_BOARD + this.side);

        this.storeTetrimino = []
        for (let row = 0; row < this.rows; row++) {
            this.storeTetrimino[row] = []
            for (let column = 0; column < this.columns; column++){
                this.storeTetrimino[row].push("");
            }   
        }
    }

    set almazenarTetris(tetrimino){
        for (const pmino of tetrimino.mapaBoard) {
            if(pmino.y < 0){
                board = new Board();
                tetrimino = new Tetrimino();
                lines_right = 0;
            }
            this.storeTetrimino[pmino.x][pmino.y] = tetrimino.name
        }
        this.searchHorizontalLines();
    }

    searchHorizontalLines(){
        let lines = [];
        for (let row = this.rows; row >= 0; row--) {
            let addLines = true
            for (let column = 0; column < this.columns; column++) {
                if(!this.storeTetrimino[column][row]){
                    addLines = false
                    break;
                }                
            }
            if (addLines){
                lines.push(row)
            }
        }
        this.deleteHorizontalLines(lines)
    }

    deleteHorizontalLines(lines){
        lines_right += lines.length; 
        for (const line of lines) {
            for (let row = line; row >= 0; row--) {
                for (let column = 0; column < this.columns; column++) {
                    if (row == 0) {
                        this.storeTetrimino[column][row] = "";
                        continue
                    }
                    this.storeTetrimino[column][row] =
                        this.storeTetrimino[column][row-1]
                    
                }
                
            }
        }
    }

    coordinates(x,y){
        return createVector(x,y).mult(this.side).add(this.position)
    }


    positionsBoard(){
        push()
        noStroke()
        for(let column = 0; column < this.columns; column++){
            for (let row = 0; row < this.rows; row++){
                if((column+row)%2==0){
                    fill("black")
                }else{
                    fill("#003")
                }
                let c = this.coordinates(column, row)
                rect(c.x,c.y,this.side)
            }
        }
        pop()
        this.takeDownTetris();
    }

    takeDownTetris(){
        push();
        for (let column = 0; column < this.columns; column++) {
            for (let row = 0; row < this.rows; row++) {
                let nameMino = this.storeTetrimino[column][row]
                if(nameMino){
                fill(tetriminosBase[nameMino].color); 
                Tetrimino.downTetris(this.coordinates(column, row))
                }
            }
            
        }
        pop();
    }
}
