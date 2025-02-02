class Block {
  constructor(x = 0, y = 0, w = 10, h = 10, c = "grey", highlight = "red") {
    this.h = h;
    this.w = w;
    this.xPos = x;
    this.yPos = y;
    this.c = c;
    this.highlight = highlight;
    this.selected = false
  
  }

  display() {
    fill(this.c);
    noStroke();
    rect(this.xPos, this.yPos, this.h, this.w);
  }

  highlighted() {
    fill(this.highlight);
    noStroke();
    rect(this.xPos, this.yPos, this.h, this.w);
  }

  update(xNew, yNew){
    this.xPos = xNew
    this.yPos = yNew
        
  }




}
