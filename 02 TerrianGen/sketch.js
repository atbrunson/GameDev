import {Grid} from './lib/Grid.js';


let rows = 48;
let cols = 60;

function setup() {
  createCanvas(800, 600);

  grid = new Grid(rows, cols, 800, 600, 'TOP_MIDDLE');
  grid.boarder = false;
  grid.lines = false;
  grid.stroke = 228;
  randomSeed("andrew");

  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      grid.cells[r][c].open = Math.round(random());
    }
  }

  //console.log(grid.size)
}

function draw() {

  background(56);
  grid.display();

  stroke(200);
  fill(200);

  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      if (grid.cells[r][c].open == 1) {
        //square(
        circle(
          grid.cells[r][c].cen.x - grid.strokeWeight,
          grid.cells[r][c].cen.y - grid.strokeWeight,
          grid.size - 2 * grid.strokeWeight - 1);
      }
  }
}
}
