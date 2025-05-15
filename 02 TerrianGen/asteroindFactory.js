
let row;
let col;


// Noise Parameters

let freq = 0.95;   // Frequency of noise
let amp = 5;    // Amplitude of noise
let phase = 0;  // Starting angle of shape

let xOff = 0;
let yOff = 0;
let rad = 200;
let cen = {};
let myNoise = []
let rando = 0

let nVert = 12; // number of vertices

function setup() {
  createCanvas(800, 600);
  background(100);
  //noLoop();
  //stroke(255);
  noStroke();
  fill("#514211");

  cen = createVector(width / 2 + xOff, height / 2 + yOff);

  sFreq = createSlider(0, 2, 1, 0.01);
  sFreq.position(10, 500);
  sFreq.size(75);
  sFreq.value(freq);

  sAmp = createSlider(0, rad*2, 1, 0.1);
  sAmp.position(10, 515);
  sAmp.size(75);
  sAmp.value(amp);

  sRad = createSlider(rad/2 , rad * 2, rad, 1);
  sRad.position(10, 530);
  sRad.size(75);
  sRad.value(rad);

  sVert = createSlider(rad / 10, rad, nVert, 1);
  sVert.position(10, 545);
  sVert.size(75);
  sVert.value(nVert);

} // end setup()

function draw() {
  background(100);
  freq = sFreq.value();

  let myShape = beginShape();

  let i = 0; for (let a = 0; a < TWO_PI; a += TWO_PI/nVert) {  // loop through angles 


    let nOffx = map(cos(freq * a+1000), -1, 1, 0, amp);
    let nOffy = map(sin(freq * a-1000), -1, 1, 0, amp);
    let r = map(noise(nOffx, nOffy), -1, 1, 0, rad);
    let x = cen.x + (r ) * cos(a);   //x_portion
    let y = cen.y + (r ) * sin(a);   //y_portion
   

    //close shape
    vertex(x, y);

    //console.log(` f(P): ${fP} Vertex ${x}, ${y} `);

    i++;
  }; delete i;


  
  //smooth
  
  
  
  endShape(CLOSE);
  push();
  stroke(255);
  ellipse(cen.x, cen.y, 5);
  fill(255)
  text(`FRQ: ${freq}`, 100, 514)
  text(`AMP: ${amp}`, 100, 529)
  text(`RAD: ${rad}`, 100, 544)
  text(`VER: ${nVert}`, 100, 559)
  pop();

  freq = sFreq.value();
  amp = sAmp.value();
  rad = sRad.value();
  nVert = sVert.value()

} // end draw()