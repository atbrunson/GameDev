
let row;
let col;


// Noise Parameters

let freq = 0.95;   // Frequency of noise
let amp = 25;    // Amplitude of noise
let phase = 0;  // Starting angle of shape

let xOff = 0;
let yOff = 0;
let rad = 100;
let cen = {};
let myNoise = []
let rando = 0

let nVert = 80; // number of vertices

function setup() {
  createCanvas(800, 600);
  background(100);
  noLoop();
  //stroke(255);
  noStroke();
  fill("#514211");

  cen = createVector(width / 2 + xOff, height / 2 + yOff);

  sFreq = createSlider(1/(rad*10), rad/10, 1, 0.01);
  sFreq.position(10, 500);
  sFreq.size(75);
  sFreq.value(freq);

  sAmp = createSlider(0, rad*2, 1, 0.1);
  sAmp.position(10, 515);
  sAmp.size(75);
  sAmp.value(amp);


  //   let i = 0; for (let a = TWO_PI; a > 0; a -= TWO_PI / nVert) {

  //     //Calculate noise values
  //     let nOffx = map(cos(freq * a), -1, 1, 0, amp)
  //     let nOffy = map(sin(freq * a+199), -1, 1, 0, amp)
  //     myNoise[i] = map(noise(nOffx, nOffy), 0, 1, 0, rad)
  //     i++

  //   }; delete i
rando = random()
}

function draw() {
  background(100);
  freq = sFreq.value();

  let myShape = beginShape();
  //vertex(cen.x, cen.y);


  let i = 0; for (let a = 0; a < TWO_PI; a += TWO_PI/nVert) {  // loop through angles 


    let nOffx = map(cos(freq * a), -1, 1, 0, amp);
    let nOffy = map(sin(freq * a), -1, 1, 0, amp);
    let r = map(noise(nOffx, nOffy), -1, 1, -amp, amp);
    let x = cen.x + (r + rad) * cos(a);   //x_portion
    let y = cen.y + (r + rad) * sin(a);   //y_portion
   

    //close shape
    vertex(x, y);

    //console.log(` f(P): ${fP} Vertex ${x}, ${y} `);

    i++;
  }; delete i;

  // let nOffx = map(cos(freq * TWO_PI), -1, 1, 0, amp);
  // let nOffy = map(sin(freq * TWO_PI), -1, 1, 0, amp);
  // r = map(noise(nOffx, nOffy), 0, 1, 0, rad);
  // let x = cen.x + r * cos(TWO_PI);   //x_portion
  // let y = cen.y + r * sin(TWO_PI);   //y_portion
  // vertex(x, y)

  
  //smooth last two vertices
  
  
  
  endShape(CLOSE);
  push();
  stroke(255);
  ellipse(cen.x, cen.y, 5);
  fill(255)
  text(`Frequency: ${freq}`, 100, 515)
  text(`Amplitude: ${amp}`, 100, 530)
  pop();

  freq = sFreq.value();
  amp = sAmp.value();
}