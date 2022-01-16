 class Tetrimino {
    constructor(name = random(["Z", "S", "J", "L", "T", "O", "I"] )) {
      this.name = name;
      let base = tetriminosBase[name];
      this.color = base.color;
      this.mapa = [];
      for (const pmino of base.mapa) {
        this.mapa.push(pmino.copy());
      }
      this.position = createVector(int(board.columns / 2), 0);
    }

    moveRight() {
      this.position.x++;
      if(this.wrongMove){
        this.moveLeft()
      }
    }
    moveLeft() {
      this.position.x--;
      if(this.wrongMove){
        this.moveRight()
      }
    }
    moveDown() {
      this.position.y++;
      if(this.wrongMove){
        this.moveUp()
        if (tetrimino == this){
          board.almazenarTetris = this;
          tetrimino = new Tetrimino();
        }
        return false
      }
      return true
    }
    moveUp() {
      this.position.y--
    }

    putTheFund(){
      this.position = this.espectro.position
      this.moveDown()
    }

    spin(){
        for (const pmino of this.mapa){
            pmino.set(pmino.y,-pmino.x)
        }
        if(this.wrongMove){
        this.untap()
    }
}

    untap(){
        for (const pmino of this.mapa) {
            pmino.set(-pmino.y, pmino.x)
        }
    }

    get wrongMove(){
        let exitOfBoard = !this.insideTheBoard;
        return exitOfBoard || this.collisionwithSorageTetris
    }

    get collisionwithSorageTetris(){
        for (const pmino of this.mapaBoard) {
          if (board.storeTetrimino[pmino.x][pmino.y]){
            return true
          }
        }        
      return false
    }

    get insideTheBoard(){
      for(const pmino of this.mapaBoard){
          if (pmino.x < 0) {
              return false
          }
          if (pmino.x >= board.columns){
              return false
          }
          if (pmino.y >= board.rows){
              return false
          }

      }
      return true
  }

    get mapaBoard() {
      let retorno = [];
      for (const pmino of this.mapa) {
        let copy = pmino.copy().add(this.position);
        retorno.push(copy);
      }
      return retorno;
    }

    get mapaCanvas() {
      let retorno = [];
      for (const pmino of this.mapa) {
        let copy = pmino.copy().add(this.position);
        retorno.push(board.coordinates(copy.x, copy.y));
      }
      return retorno;
    }

    positionsBoard() {
      push();
      fill(this.color);
      for (const pmino of this.mapaCanvas) {
        Tetrimino.downTetris(pmino)       
      }
      pop();
      if (tetrimino == this) {
        this.downEspectro()
      }
    }

    downEspectro(){
      this.espectro = new Tetrimino(this.name);
      this.espectro.position = this.position.copy();
      for (let i = 0; i < this.mapa.length; i++) {
        this.espectro.mapa[i] = this.mapa[i].copy();
      }
      while ( this.espectro.moveDown())
      push()
      drawingContext.globalAlpha = 0.3
      this.espectro.positionsBoard()
      pop()
    }

    static downTetris(pmino) {
        rect(pmino.x, pmino.y, board.side); 
        push();
        noStroke();
        fill(255, 255, 255, 80);
        beginShape();
        vertex(pmino.x, pmino.y);
        vertex(pmino.x + board.side, pmino.y );
        vertex(pmino.x + board.side, pmino.y + board.side);
        endShape(CLOSE);
        beginShape();
        fill(0, 0, 0, 80);
        vertex(pmino.x, pmino.y);
        vertex(pmino.x, pmino.y + board.side);
        vertex(pmino.x + board.side, pmino.y + board.side);
        endShape(CLOSE);
        pop();
    }
  }