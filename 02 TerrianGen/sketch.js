
let row;
let col;


// Noise Parameters

let freq = 5;   // Frequency of noise
let amp = 45;    // Amplitude of noise
let phase = 0;  // Starting angle of shape

let xOff = -100;
let yOff = -100;
let rad = 100;
let cen = {};

let nVert = 70; // number of vertices

function setup() {
  createCanvas(800, 600);
  background(100);
  //noLoop();
  stroke(255);
  //noStroke();
  fill("#514211");

  cen = createVector(width / 2 + xOff, height / 2 + yOff);

  sFreq = createSlider(0,5,1,0.1);
  sFreq.position(10, 500);
  sFreq.size(75);
  sFreq.value(freq);
}




function draw() {
  background(100)
  freq = sFreq.value();

  beginShape();
  vertex(cen.x, cen.y);

  let i = 0;
  for (let a = TWO_PI; a >= 0; a -= TWO_PI/(nVert)) {  // loop through angles 
    //Calculate noise values
    let fP = map(
      noise(freq * sin(a), freq * cos(a+9999)), //map to scale perlin noise
      0, 1,
      -amp, amp
    );

    let x = cen.x + fP + rad * cos(a);   //x_portion
    let y = cen.y + fP + rad * sin(a);   //y_portion

    // let x = cen.x + (rad * cos(a));   //CIRCLE
    // let y = cen.y + (rad * sin(a));   //CIRCLE


    //close shape
    vertex(x, y);
  
    console.log(` f(P): ${fP} Vertex ${x}, ${y} `);

    i++;
  }

 
  
  console.log(`Vertices: ${i}`);
  endShape(CLOSE);

  push();
  stroke(255);
  ellipse(cen.x, cen.y, 5);
  pop();

  freq = sFreq.value();

}