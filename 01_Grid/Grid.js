/**
 * TODO: 
 * - replace all p5.js references with HTML Canvas Primitives
 * - replace mode strings with symbols
 * - 
 */


class Grid {
  constructor(rows = 2, cols = 2, w = width, h = height, mode = "TOP_LEFT") {

    this.boarder = true;
    this.lines = true;
    this.stroke = 0;
    this.strokeWeight = 1;
    this.xOffset = 0;
    this.yOffset = 0;

    this.w = constrain(w, 4, width - this.xOffset - 2 * this.strokeWeight);
    this.h = constrain(h, 4, height - this.yOffset - 2 * this.strokeWeight);

    this.rows = rows;

    this.cols = cols;

    this.mode = mode // Grid alignment property
    this.size = constrain(this.h / this.rows, 2)
    this.cells = [] // create empty cells array

    this.align()
    this.build()
    this.display()
    // this.update()

  }; // end constructor

  align() {
    switch (this.mode) { // Defines the alignment of the grid
      case "TOP_LEFT":
        this.x = this.xOffset + 0;
        this.y = this.yOffset + 0;
        break;
      case "TOP_MIDDLE":
        this.x = this.xOffset + width / 2 - this.w / 2 - this.strokeWeight / 2;
        this.y = this.yOffset + 0;
        break;
      case "TOP_RIGHT":
        this.x = this.xOffset + width - this.w - 2 * this.strokeWeight;
        this.y = this.yOffset + 0
        break;
      case "CENTER_LEFT":
        this.x = this.xOffset + 0
        this.y = this.yOffset + height / 2 - this.h / 2
        break;
      case "CENTER_MIDDLE":
        this.x = this.xOffset + width / 2 - this.w / 2 - this.strokeWeight / 2;
        this.y = this.yOffset + height / 2 - this.h / 2 - this.strokeWeight / 2;
        break;
      case "CENTER_RIGHT":
        this.x = this.xOffset + width - this.w - this.strokeWeight;
        this.y = this.yOffset + height / 2 - this.h / 2 - this.strokeWeight / 2
        break;
      case "BOTTOM_LEFT":
        this.x = this.xOffset + 0,
          this.y = this.yOffset + height - this.h;
        break;
      case "BOTTOM_MIDDLE":
        this.x = this.xOffset + width / 2 - this.w / 2 - this.strokeWeight / 2;
        this.y = this.yOffset + height - this.h - this.strokeWeight;
        break;
      case "BOTTOM_RIGHT":
        this.x = this.xOffset + width - this.w - this.strokeWeight;
        this.y = this.yOffset + height - this.h - this.strokeWeight;
        break;

    } // end switch
  } //end align()

  build() { // grid factory

    switch (this.rows != this.cols) { // select grid & cell size 

      case (this.rows > this.cols): // uses hight if more rows than cols
        this.size = this.h / this.rows
        this.w = this.size * this.cols
        break;

      case (this.rows < this.cols): // uses width if more cols than rows
        this.size = this.w / this.cols
        this.h = this.size * this.rows;
        break;
    } // end grid sizing

    for (let r = 0; r < this.rows; r++) { // iterate over number of rows

      this.cells[r] = []                    // create array in for each row

      for (let c = 0; c < this.cols; c++) { // iterate over number cols  

        this.cells[r][c] = {  // creates cell object in each row/col pair
          pos: createVector( // create position vector at top left bounds
            this.x + (c * this.size) + 2 * this.strokeWeight,
            this.y + (r * this.size) + 2 * this.strokeWeight
          ),
          cen: createVector( // create vector at cell center
            this.x + (c * this.size) + 2 * this.strokeWeight + this.size / 2,
            this.y + (r * this.size) + 2 * this.strokeWeight + this.size / 2),
          open: -1, // cell's state -1 uncheck, 0 checked && closed, 1 checked && open 
          bounds: -1 // TOP_LEFT, LOWER_LEFT, TOP_RIGHT, LOWER_RIGHT
        };
        // REMEMBER: myArray[index] = {object} will reassign the row/col pair each time its called
      }
    } console.log(this.cells)

  } // end build()

  display() {
    stroke(this.stroke); // convert to canvas context calls
    strokeWeight(this.strokeWeight); // convert to canvas context calls
    noFill(); // convert to canvas context calls

    if (this.boarder) { // Resizes grid if there this boarder is shown
      rect(
        this.x + this.strokeWeight / 2, // convert to canvas context calls
        this.y + this.strokeWeight / 2, // convert to canvas context calls
        this.w,
        this.h
      );
    }; // end resize

      if (this.lines) { // draws the grid lines 

      for (let r = 0; r < this.rows - 1; r++) { //draws rows
        line(           // convert to canvas context calls
          (this.x + this.strokeWeight / 2),
          (r + 1) * this.size + this.strokeWeight / 2 + this.y,

          this.w + this.x + this.strokeWeight / 2,
          (r + 1) * this.size + this.strokeWeight / 2 + this.y
        );
      }; // end draw rows

      for (let c = 0; c < this.cols - 1; c++) { //draws cols
        line(           // convert to canvas context calls
          (c + 1) * this.size + this.strokeWeight / 2 + this.x,
          this.y + this.strokeWeight / 2,

          (c + 1) * this.size + this.strokeWeight / 2 + this.x,
          this.h + this.y + this.strokeWeight / 2
        );
      }; // end draw cols

    }; // end grid lines

  }; // end display()

  // update() {
  //   this.align
  //   this.build
  // };

}