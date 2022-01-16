const MARGIN_BOARD = 10;
let regular_speed_keys = 0;
let regular_down = 0;
let lines_right = 0;


let angle_bottom = Math.random()*360
let background_angle = Math.random()*360;
setInterval(() =>{
    document.body.style.background = `linear-gradient(
      ${angle_bottom}deg,
      hsl(${background_angle}, 100%, 50%),
      hsl(${background_angle}, 100%, 5%)
    )`
    angle_bottom += Math.random();
    background_angle+= Math.random();
}, 20)

setInterval(() =>{
  if (millis() - regular_down > 500){
    return
  }
  regular_down = millis()
  tetrimino.moveDown();
}, 400)

function setup() {
  createCanvas(900, 600);
  board = new Board();
  createBaseTetriminos();
  tetrimino = new Tetrimino();

  resizeCanvas(
    board.ancho + 2 * MARGIN_BOARD,
    board.alto + 2 * MARGIN_BOARD + board.side
  );
}
function draw() {
  clear();
  downScore();
  board.positionsBoard();
  tetrimino.positionsBoard();
  keyEventsTetris();
}

function downScore(){
  push();
  textSize(20)
  strokeWeight(2)
  fill("white")
  text(
    "Lines: " + lines_right, 
    board.position.x, 
    board.position.y - board.side/2
    )
  pop();
}

let speed_regular_board = 100

function keyEventsTetris() {
  if (millis() - regular_speed_keys < speed_regular_board) {
    return;
  }
  speed_regular_board = 100;
  regular_speed_keys = millis();
  if (keyIsDown(RIGHT_ARROW)) {
    tetrimino.moveRight();
    regular_down = millis();
  }
  if (keyIsDown(LEFT_ARROW)) {
    tetrimino.moveLeft();
    regular_down = millis();
  }
  if (keyIsDown(DOWN_ARROW)) {
    tetrimino.moveDown();
    regular_down = millis();
  }
  if (keyIsDown(UP_ARROW)) {
    speed_regular_board = 150
    tetrimino.spin();
    regular_down = millis();
  }
  if(keyIsDown(32)){
    speed_regular_board = 200;
    tetrimino.putTheFund();
    regular_down = millis();
  }
}
