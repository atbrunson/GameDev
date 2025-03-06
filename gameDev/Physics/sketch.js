

function setup() {
  createCanvas(400, 400);

  let A = createVector(1,0)
  let B = createVector(0, 1)

// TriangleFan
// POint object -> vertices around point
//

}

function draw() {
  background(220);
}


class Polygon{
  constructor(nSides, xCenteroid, yCenteroid){
    
    this.croid.x = xCenteroid
    this.croid.y = yCenteroid
    this.sides = nSides

    vert = new Map()
    for (let v = 0; v < this.sides; v++){
       vert.set('V'+v, [x,y])
    } 


  }
}
