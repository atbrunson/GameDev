let side = 50;
let fillColor = "black";
let dragged = false;

let scenes = {};



function preload() {
  //Load save state
  //loadJSON(path, [callback], [errorCallback], [datatype])


}

function setup() {
  createCanvas(500, 500);
  randomSeed(10)

  grid = new Grid(2, 3, 200, 200, "TOP_RIGHT");
  grid.xOffset = 0;
  grid.yOffset = 0;
  grid.stroke = 150;
  grid.strokeWeight = 1;
  grid.snaps = false;
  // grid.update()
  myBlock = new Block(grid.cells[0][0].cen.x, grid.cells[0][0].cen.y, grid.size - grid.strokeWeight, grid.size - grid.strokeWeight);

  console.log(`
    cells.cen (0,0): ${grid.cells[0][0].cen.x},${grid.cells[0][0].cen.y}
    block (x,y): ${myBlock.xPos},${myBlock.yPos}
    grid  (x,y): ${grid.x},${grid.y}
    `)

  sRows = createSlider(0, 500, grid.rows);
  sCols = createSlider(0, 500, grid.cols);

  //console.log(grid.cells);
}

function draw() {
  //noLoop()

  background(210);
  xOffset = mouseX - width / 2;
  yOffset = mouseY - height / 2;

  grid.rows = sRows.value()
  grid.cols = sCols.value()

  grid.display();
  myBlock.display();


  if ( //Change color if the mouse is inside the block
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
    dragged = true;
  }

  if (dragged) {
    myBlock.highlight = "green";
    myBlock.update(
      constrain(mouseX - myBlock.w / 2, 0, width - myBlock.w),
      constrain(mouseY - myBlock.h / 2, 0, height - myBlock.h)
    );
    if (0 < myBlock.xPos > width) { myBlock.update(0, 0); }
    if (0 < myBlock.yPos > height) { myBlock.update(0, 0); }
    if (!mouseIsPressed) {
      dragged = false;
      myBlock.highlight = "red";
    }
  }



  // Display the texts for debugging 
  fill(fillColor);
  strokeWeight(2);
  textSize(12);
  text(`mouseX: ${mouseX.toFixed(1)} mouseY: ${mouseY.toFixed(1)}`,
    5, 15 + grid.h + grid.y + grid.strokeWeight
  );
  text(`xPos: ${myBlock.xPos.toFixed(1)} yPos: ${myBlock.yPos.toFixed(1)}`,
    5, 30 + grid.h + grid.y + grid.strokeWeight
  );
  text(`Rows: ${grid.rows.toFixed(1)} Cols: ${grid.cols.toFixed(1)}`,
    5, 45 + grid.h + grid.y + grid.strokeWeight
  );
  text(`grid.w: ${grid.w.toFixed(1)} grid.h: ${grid.h.toFixed(1)}`,
    5, 60 + grid.h + grid.y + grid.strokeWeight
  );
  stroke(fillColor)
  // for (let r = 0; r < grid.rows; r++) {
  //   for (let c = 0; c < grid.cols; c++) {
  //     ellipse(grid.cells[r][c].pos.x, grid.cells[r][c].pos.y, 1.5);

  //     line(
  //       grid.cells[r][c].pos.x,
  //       grid.cells[r][c].pos.y,
  //       grid.cells[r][c].pos.x + noise(frameCount / 1000 + 20398450) * grid.size / 2,
  //       grid.cells[r][c].pos.y + noise(frameCount / 1000 - 239487259) * grid.size / 2,
  //     )
  //   };
  // };

}
