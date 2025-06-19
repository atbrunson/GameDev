// Sourced https://editor.p5js.org/BarneyCodes/sketches/H7M_tt4eK
// Author: BarneyCodes https://editor.p5js.org/BarneyCodes/sketches
// Descriptio: p5.js implementation of basic Click & Drag controls
//
 
const points = [];
let dragPoint = null;

const numPoints = 5;
const dragRadius = 20;

function setup() {
  createCanvas(600, 600);
  strokeWeight(5);
  textSize(30);
  
  for(let i = 0; i < numPoints; i ++) {
    // Points
    points.push(createVector(random(width), random(height)));
    // Text
    // points.push(new TextDragObject(random(width), random(height), "Text " + str(i)));
  }
}

function draw() {
  background(220);
  
  fill(255, 0, 0);
  for(let p of points) {
    // Points
    circle(p.x, p.y, dragRadius * 2);
    // Text
    // p.show();
  }
}

function mousePressed() {
  for(let i = points.length - 1; i >= 0; i --) {
    // Points
    const isPressed = mouseInCircle(points[i], dragRadius);
    // Text
    // const isPressed = points[i].mouseInside();
      
    if(isPressed) {
      dragPoint = points.splice(i, 1)[0];
      // bring the drag point to the front
      points.push(dragPoint);

      break;
    }    
  }
}

function mouseDragged() {
  if(dragPoint) {
    dragPoint.x = mouseX;
    dragPoint.y = mouseY;
  }
}

function mouseReleased() {
  dragPoint = null;
}

function mouseInCircle(pos, radius) {
  return dist(mouseX, mouseY, pos.x, pos.y) < radius
}


// TEXT AND IMAGE DRAG EXAMPLES

function mouseInBox(x, y, w, h) {
  return mouseX >= x && mouseX < x + w &&
          mouseY >= y && mouseY < y + h;
}

class TextDragObject {
  constructor(x, y, str) {
    this.x = x;
    this.y = y;
    this.str = str;
  }
  
  mouseInside() {
    const w = textWidth(this.str);
    const h = textSize();
    return mouseInBox(this.x, this.y - h, w, h);
  }
  
  show() {
    text(this.str, this.x, this.y);
  }
}

class ImageDragObject {
  constructor(x, y, img) {
    this.x = x;
    this.y = y;
    this.img = img;
  }
    
  mouseInside() {
    return mouseInBox(this.x, this.y, this.img.width, this.image.height);
  }
  
  show() {
    image(this.img, this.x, this.y);
  }
}