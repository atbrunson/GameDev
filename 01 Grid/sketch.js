let side = 50;
let fillColor = "black";
let dragged = false;

let scenes = {}



function preload() {
  //Load save state
  //loadJSON(path, [callback], [errorCallback], [datatype])
}

function setup() {
  createCanvas(500, 500);

  grid = new Grid(4, 5, 300, 300, "TOP_LEFT");
  grid.xOffset = 0
  grid.yOffset = 0
  grid.stroke = 150
  grid.strokeWeight = 2
  grid.snaps = false
  myBlock = new Block(0, 55, grid.size - grid.strokeWeight, grid.size - grid.strokeWeight);


}

function draw() {
  background(210);
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
    dragged = true
  }

  if (dragged) {
    myBlock.highlight = "green"
    myBlock.update(
      constrain(mouseX - myBlock.w / 2, 0, width - myBlock.w),
      constrain(mouseY - myBlock.h / 2, 0, height - myBlock.h)
    )
    if (0 < myBlock.xPos > width) { myBlock.update(0, 0) }
    if (0 < myBlock.yPos > height) { myBlock.update(0, 0) }
    if (!mouseIsPressed) {
      dragged = false
      myBlock.highlight = "red"
    }
  }



  // Display the texts for debugging 
  fill(fillColor);
  strokeWeight(2);
  textSize(12);
  text(`mouseX: ${mouseX} mouseY: ${mouseY}` ,
    5, 15 + grid.h + grid.yOffset + grid.strokeWeight
  );
  text(`xPos: ${myBlock.xPos} yPos: ${myBlock.yPos}`,
    5, 30 + grid.h + grid.yOffset + grid.strokeWeight
  );
  text(`Rows: ${grid.rows} Cols: ${grid.cols}`,
    5, 45 + grid.h + grid.yOffset + grid.strokeWeight
  );
  text(`grid.w: ${grid.w} grid.h: ${grid.h}`,
    5, 60 + grid.h + grid.yOffset + grid.strokeWeight
  );
}
