let xOffset = 0;
let yOffset = 0;
let side = 50;
let fillColor = "black";

function setup() {
  createCanvas(800, 800);
 
  grid = new Board();
  
  grid.rows = 15;
  grid.cols = 15;

  myBlock = new Block(50, 50, 50, 50);

}

function draw() {
  background(225);
   xOffset = mouseX - width / 2;
  yOffset = mouseY - height / 2;
    
  grid.display();

  myBlock.display();
  
  //Change color if the mouse is inside the block
  if (
    mouseX > myBlock.xPos &&
    mouseX < myBlock.xPos + myBlock.w &&
    mouseY > myBlock.yPos &&
    mouseY < myBlock.yPos + myBlock.w
  ) {
    myBlock.selected = true;
    myBlock.highlighted();
    fill(fillColor);
  } else myBlock.selected = false;
    
  //Update position of the block if it's selected and it's dragged
  if (myBlock.selected && mouseIsPressed && mouseButton === LEFT) {
    myBlock.update(mouseX - myBlock.w /2 , mouseY - myBlock.h /2);
  }
  
  // Display the texts for debugging 
  fill(fillColor)
  strokeWeight(2);
  textSize(22);
  text(`mouseX: ${mouseX} mouseY: ${mouseY}`, 25, 25);
  text(`xPos: ${myBlock.xPos} yPos: ${myBlock.yPos}`, 25, 50);
  text(`xOffset: ${xOffset} yOffset: ${yOffset}`, 25, 75);
}
  