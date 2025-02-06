class Board {
  constructor(rows = 2, cols = 2, w = width , h = height , mode = "TOP_LEFT") {
        
    this.rows = rows; // Default grid with 2 rows
    // Needs: max rows rows = width / this.rows >= 10? => this.cols = 1
    
    this.cols = cols; // Default grid with 2 cols
    // Needs: max cols = height / this.cols >= 10? => this.cols = 1
    
    this.w = w
    this.h = h


    // Defines the alignment of the grid:
    // TOP_LEFT , TOP_MIDDLE , TOP_RIGHT
    // CENTER_LEFT , MIDDLE, CENTER_RIGHT
    // BOTTOM_LEFT , BOTTOM_MIDDLE , BOTTOM_RIGHT
    this.mode = mode

    switch (this.mode) {
      case "TOP_LEFT":
        this.x = 0, 
        this.y = 0
        break;
      
        case "TOP_MIDDLE":
        this.x = width/2 - this.w/2 
        this.y = 0
        break;
      
      case "TOP_RIGHT":
        this.x = width - this.w
        this.y = 0
        break;

      case "CENTER_LEFT":
        this.x = 0
        this.y = height/2 - this.h/2
        break;

      case "MIDDLE":
        this.x = width / 2 - this.w / 2 
        this.y = height / 2 - this.h / 2
        break;

      case "CENTER_RIGHT":
        this.x = width - this.w
        this.y = height / 2 - this.h / 2
        break;
    
      case "BOTTOM_LEFT":
        this.x = 0,
        this.y = height - this.h/2
        break;  
    
      case "BOTTOM_LEFT":
        this.x = 0,
          this.y = height - this.h / 2
        break;

      case "BOTTOM_MIDDLE":
        this.x = width / 2 - this.w / 2 
        this.y = height - this.h / 2
        break;        

      case "BOTTOM_RIGHT":
        this.x = width - this.w / 2
        this.y = height - this.h / 2
        break;     

     }

  
 

    this.boarder = true;
    this.stroke = 150;
    this.strokeWeight = 2;
    
    this.sizeX = (this.w + this.strokeWeight) / this.rows;
    //if sizeX < 10 => reduce #rows
    this.sizeY = (this.h + this.strokeWeight) / this.cols;
    //if sizeY < 10 => reduce #cols


    this.cells = {}
    // Needs naming structure (A,1) -> (AAA,134083)
    // Needs the (x,y) pairs of the center pixel of each cell
      for (let r = 0; r < this.rows - 1; r++)
        //assign row

        for (let c = 0; c < this.cols - 1; c++){
          //assign col
          
          //cells[r,c]{snapPoint: calculated center }
          //point(cells.snapPoint[0],cells.snapPoint[1])

        };

      };
        
    
  display() {
    stroke(this.stroke);
    strokeWeight(this.strokeWeight);
    noFill();
    
    // Resizes grid if there this boarder is shown
    if (this.boarder) {
      rect(this.strokeWeight / 2, this.strokeWeight / 2, this.w - this.strokeWeight, this.h - this.strokeWeight);
    }

    // Builds the grid rows 
    for (let r = 0; r < this.rows - 1; r++) {
      line(0, (r + 1) * this.sizeX, this.w, (r + 1) * this.sizeX); //line(x1,y1,x2,y)
    }
    
    // Builds the grid cols
    for (let c = 0; c < this.cols - 1; c++) {
      line((c + 1) * this.sizeY, 0, (c + 1) * this.sizeY, this.h); //line(x1,y1,x2,y)
    }
  }
}
