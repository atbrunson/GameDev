class Board {
  constructor(rows = 2, cols = 2, w = width, h = height, mode = "TOP_LEFT") {

    this.rows = rows; // Default grid with 2 rows
    // Needs: max rows rows = width / this.rows >= 10? => this.cols = 1

    this.cols = cols; // Default grid with 2 cols
    // Needs: max cols = height / this.cols >= 10? => this.cols = 1

    this.boarder = true;
    this.stroke = 150;
    this.strokeWeight = 2;
    this.xOffset = 0
    this.yOffset = 0


    // Needs: Grid Over specified
    // (if this.rows > this.cols){}
    this.w = w
    this.h = h

    switch (this.rows){
      case this.rows === this.cols:
        this.size = (this.h + this.strokeWeight) / this.rows
        this.w = this.h
        break
      case this.rows > this.cols:    
        //needs constraints width, hight
        this.size = (this.h + this.strokeWeight) / this.rows;
        this.w = this.size * this.cols
        console.log("grid sized for number of rows")
        break;
      case this.rows < this.cols:
        this.size = (this.w + this.strokeWeight) / this.cols;
        this.h = this.size * this.rows
        console.log("grid sized for number columns")
        break;
    
      }



    
    this.mode = mode //Grid alignment propertie
    switch (this.mode) { // Defines the alignment of the grid
      case "TOP_LEFT":
        this.x = 0,
        this.y = 0
        break;
      case "TOP_MIDDLE":
        this.x = width / 2 - this.w / 2
        this.y = 0
        break;
      case "TOP_RIGHT":
        this.x = width - this.w
        this.y = 0
        break;
      case "CENTER_LEFT":
        this.x = 0
        this.y = height / 2 - this.h / 2
        break;
      case "CENTER_MIDDLE":
        this.x = width / 2 - this.w / 2
        this.y = height / 2 - this.h / 2
        break;
      case "CENTER_RIGHT":
        this.x = width - this.w
        this.y = height / 2 - this.h / 2
        break;
      case "BOTTOM_LEFT":
        this.x = 0,
          this.y = height - this.h
        break;
      case "BOTTOM_MIDDLE":
        this.x = width / 2 - this.w / 2
        this.y = height - this.h
        break;
      case "BOTTOM_RIGHT":
        this.x = width - this.w
        this.y = height - this.h
        break;
    }


    this.cells = {}
    // 
    // Needs naming structure (A,1) -> (AAA,134083)
    // Needs the (x,y) pairs of the center pixel of each cell
    for (let r = 0; r < this.rows; r++) {

      this.cells[r] = []                          //assign row

      for (let c = 0; c < this.cols; c++) {

        this.cells[r][c] = [
          (this.x + this.size + this.xOffset) + (this.size * c),
          (this.y + this.size + this.yOffset) + (this.size * r)
        ]

      };
    }

  };


  display() {
    stroke(this.stroke);
    strokeWeight(this.strokeWeight);
    noFill();

    // Resizes grid if there this boarder is shown
    if (this.boarder) {
      rect
      rect(this.x + this.xOffset+ this.strokeWeight / 2, this.y +this.yOffset + this.strokeWeight / 2, this.w + this.strokeWeight / 2, this.h + this.strokeWeight / 2);
    }

    // Builds the grid rows 
    for (let r = 0; r < this.rows - 1; r++) {
      line(this.x + this.xOffset, this.y + this.yOffset + this.size * (r + 1), this.w + this.x + this.xOffset, (r + 1) * this.size + this.y + this.yOffset); //line(x1,y1,x2,y)
    }

    // Builds the grid cols
    for (let c = 0; c < this.cols - 1; c++) {
      line((c + 1) * this.size + this.x + this.xOffset, this.y + this.yOffset, (c + 1) * this.size + this.x + this.xOffset, this.h + this.y + this.yOffset); //line(x1,y1,x2,y)
    }
  }
}
