let row;
let col;

let scl = 4;
let zm = 0.034

let shift = 0

let fills = []

function setup() {
  createCanvas(800, 620);
  background(100);
  noStroke();

  row = Math.floor(width / scl);
  col = Math.floor(height / scl);

  // for (let r = 0; r < row; r++) {
  //   fills[r] = []
  //   for (let c = 0; c < col; c++) {

  //     fills[r].push((Math.floor(128*(1 + perlin.get(zm * r, zm * c)))))

  //   };  


};



console.log(fills)


function draw() {
  // let t = 1
  let t = (frameCount * 0.5)

  for (let r = 0; r < row; r++) {

    for (let c = 0; c < col; c++) {

      fill(Math.floor(128 * (1 + perlin.get(zm * (t+r), zm * (t-c)))));
      rect(r * scl, c * scl, scl);

    };

  };

  //perlin.seed()

};
