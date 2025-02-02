class Board {
  constructor() {
    
    
    this.rows = 2; // Default grid with 2 rows
    // Needs max rows rows = height / this.rows >= 10? => this.cols = 1
    
    this.cols = 2; // Default grid with 2 cols
    // Needs max cols = height / this.cols >= 10? => this.cols = 1
 
    
    this.boarder = true;
    this.stroke = 255;
    this.strokeWeight = 2;
    
    this.cells = {}
    // Needs naming structure (A,1) -> (AAA,134083)
    // Needs the (x,Y) pairs of the center pixle of each cell
 
  
  
  }

  display() {
    stroke(this.stroke);
    strokeWeight(this.strokeWeight);
    noFill(), (this.sizeX = (width + this.strokeWeight) / this.rows);
    this.sizeY = (height + this.strokeWeight) / this.cols;

    if (this.boarder) {
      rect(0, 0, width, height);
    }

    for (let r = 0; r < this.rows - 1; r++) {
      line(0, (r + 1) * this.sizeX, width, (r + 1) * this.sizeX); //line(x1,y1,x2,y)
    }

    for (let c = 0; c < this.cols - 1; c++) {
      line((c + 1) * this.sizeY, 0, (c + 1) * this.sizeY, height); //line(x1,y1,x2,y)
    }
  }
}
