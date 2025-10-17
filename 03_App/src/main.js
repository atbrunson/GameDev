import Matter, { Svg } from "matter-js";

// Initialize poly-decomp with Matter.js
// it is required for poly-decomp to work with matter.js
import decomp from "poly-decomp";
Matter.Common.setDecomp(decomp);

// Matter.js Library Aliases
const Common = Matter.Common,
  Engine = Matter.Engine,
  Render = Matter.Render,
  Runner = Matter.Runner,
  Events = Matter.Events,
  Composite = Matter.Composite,
  Composites = Matter.Composites,
  Constraint = Matter.Constraint,
  Body = Matter.Body,
  Bodies = Matter.Bodies,
  Mouse = Matter.Mouse,
  MouseConstraint = Matter.MouseConstraint,
  Vector = Matter.Vector,
  Vertices = Matter.Vertices,
  Bounds = Matter.Bounds,
  Detector = Matter.Detector;

// Create ENGINE & top level COMPOSITE "world" (window.document.engine)
const engine = Engine.create();
const world = engine.world;
document.engine = engine; //---For Debugging Only---//
export { engine };

// Import User-Defined Modules
import { loadSvg, loadSvgPaths, select } from "./loadSVG.js";
import { Ship } from "./ship.js";
import { ProgressBar } from "./ui/progress_bar.js";
import { Drill } from "./drill.js";
import { SoftBody } from "./soft_body.js";
import { SVGcomposite } from "./SvgComposite.js";
// Set properties of the WORLD
engine.gravity.scale = 0.0;

// Create & start the RUNNER
var runner = Runner.create();
Runner.run(runner, engine);

// Create & start the RENDERER (window.document.render)
const render = Render.create({
  element: document.body,
  engine: engine,
  options: {
    pixelRatio: 1,
    width: 1020,
    height: 1020,
    hasBounds: true,
    showAngleIndicator: false,
    showCollisions: false,
    showVelocity: false,
    showDebug: false,
    showInternalEdges: true,
    showBounds: true,
    wireframes: false,
  },
});
Render.run(render);
console.log("render", render);
document.render = render; //---For Debugging Only---//
export { render };

// Create composite for our container
// const container = Composite.create({
//   bodies: [
//     // Specifies four rectangles for the walls floor & ceiling
//     Bodies.rectangle(400, -25, 850, 50, { isStatic: true, label: "Ceiling" }),
//     Bodies.rectangle(400, 625, 850, 50, { isStatic: true, label: "Floor" }),
//     Bodies.rectangle(825, 300, 50, 700, {
//       isStatic: true,
//       label: "Right Wall",
//     }),
//     Bodies.rectangle(-25, 300, 50, 700, { isStatic: true, label: "Left Wall" }),
//   ],
//   label: "Container",
// });
// Composite.add(world, container);

// // Create SVG Composite
// const bodySVG = await loadSvgPaths("./hollow.svg");
// console.log("bodySVG", bodySVG);

// // convert the path to matter.js vertices
// bodySVG.vertices = bodySVG.map((path) => Svg.pathToVertices(path, 50));
// console.log("bodySVG.vertices", bodySVG.vertices);

// // An offset deep copy of the vertices for the SVG body correcting offset for pixel to pixel accuracy
// bodySVG.offset = Array.from(
//   Common.map(bodySVG.vertices, (vertex) => {
//     return Array.from(vertex).map((point) => {
//       return { x: point.x - 0.14999874000000005, y: point.y - 0.53231924 };
//     });
//   })
// );
// console.log("bodySVG.offset", bodySVG.offset);

// // A scaled deep copy of the vertices for the SVG body (cannot use Vertices.scale as it causes an error)
// bodySVG.scaleFactor = 2.5;

// bodySVG.scaledVertices = Array.from(
//   Common.map(bodySVG.offset, (vertex) => {
//     return Array.from(vertex).map((point) => {
//       return { x: point.x * bodySVG.scaleFactor, y: point.y * bodySVG.scaleFactor };
//     });
//   })
// );
// console.log("bodySVG.scaledVertices", bodySVG.scaledVertices);

// bodySVG.body = Composite.create({ id: "mysvgBody", label: "mysvgBody" });

// console.log("bodySVG.body", bodySVG.body);
// Composite.add(bodySVG.body, Bodies.fromVertices(200, 200, bodySVG.scaledVertices));
// Composite.add(world, bodySVG.body);
// Matter.Common.info(bodySVG.body);
// load an SVG from a URL ---CAVE TERRIAN---
// const bodySVG= await loadSvgPaths("./hollow.svg");

/**
 * Create SVG Composite
 */
const mySVG = await loadSvgPaths("./hollow.svg");
console.log("mySVG", mySVG);
const MyCave = new SVGcomposite(mySVG, 4, 450, 500);
console.log("MyCave", MyCave);


//LOADED PATH STYLES
mySVG.styles = mySVG.map((path) => {return path.getAttribute("style")})
const newSVG = await loadSvg("./hollow.svg");
const paths = newSVG.querySelectorAll("path")
console.log("newSVG paths", paths);
const style = paths[0].getAttribute("style");
console.log("newSVG style", style);


// Create MOUSE Object and MouseConstraint
const mouse = Mouse.create(render.canvas),
  mouseConstraint = MouseConstraint.create(engine, {
    mouse: mouse,
    constraint: {
      stiffness: 0.2,
      render: {
        visible: false,
      },
    },
  });

Composite.add(world, mouseConstraint);
// keep the mouse in sync with rendering
render.mouse = mouse;

//---Create_PLAYER_object---//
// import { Player } from "./lib/player.js";
// var player0 = new Player(400, 300, 25);
// player0.body.label = 'player0';

//---Create_SHIP_object---//
const ship = new Ship(700, 450, 15);
ship.body.label = "ship";
ship.fuel = 0.75;
// debugging only
document.ship = ship;

//---Create_DRILL_object---//
const drill = new Drill(0, 0, 7.5);

// TODO:
// - Create Mouse Control Class in src/input_controls.js
// - Combine keyboard_controls.js and new input_controls.js file
// - Commbine view_controls.js with new input_controls.js file
// - Create view controls with every maouse or keyboard control

// mouse down right button starts drilling
render.canvas.addEventListener("mousedown", function (e) {
  e.button === 2 ? drill.startDrilling() : null;
});
// mouse up right button stops drilling
render.canvas.addEventListener("mouseup", function (e) {
  e.button === 2 ? drill.stopDrilling() : null;
});

//---Create_Progress_Bar---//
window.progbar1 = new ProgressBar(5, 300, ship, "ship.fuel", 0, 1);
console.log("progBar1", progbar1);

//---MAIN_GAME_LOOP---//
// Events.on(engine, "beforeUpdate", function () { //Everything below this will run before every engine update
// })

const ctx = render.canvas.getContext("2d");

// TODO: add this as method to the MOUSE object created above
// EXAMPLE Mouse.Tracking = true
// if (tracking) function() { INSERT CODE DIRECTLY BELOW }

// create an additional render property to track if the mouse is hovering over the canvas
render.canvas.hoverOver = false;

render.canvas.addEventListener("mouseover", function () {
  render.canvas.hoverOver = true;
  //console.log(`Hover over: ${render.canvas.hoverOver}`)
});

render.canvas.addEventListener("mouseout", function () {
  render.canvas.hoverOver = false;
  //console.log(`Hover over: ${render.canvas.hoverOver}`)
});

let wheelCounter = 0;
render.canvas.addEventListener(
  "wheel",
  function () {
    wheelCounter += mouse.wheelDelta;
    console.log(`wheelDelta: ${mouse.wheelDelta} | wheelCounter: ${wheelCounter}`);
  },
  { passive: true }
);

ctx.font = "12px sans-serif";

Events.on(render, "afterRender", function () {
  if (render.canvas.hoverOver) {
    ctx.fillStyle = "lightgrey";
    ctx.fillText(
      `x: ${Math.floor(mouse.absolute.x)}`,
      mouse.absolute.x + 20,
      mouse.absolute.y + 25
    );
    ctx.fillText(
      `y: ${Math.floor(mouse.absolute.y)}`,
      mouse.absolute.x + 20,
      mouse.absolute.y + 37
    );
  }
});
//---END_MAIN_GAME_LOOP---//

// Add html dom element with instructions & allign left with canvas
var instructions = document.createElement("div");
instructions.setAttribute("id", "instructions");
instructions.innerHTML = "<pre>Move: WASD<br>Rotate: QE</pre>";
instructions.style.position = "relative";
instructions.style.bottom = render.canvas.offsetTop + "px";
instructions.style.left = render.canvas.offsetLeft + "px";
document.body.appendChild(instructions);

// Align Instructions
window.onload = function () {
  instructions.style.left = render.canvas.offsetLeft + "px";
  instructions.style.bottom = render.canvas.offsetTop + "px";
};
// Realign left on window resize
window.addEventListener("resize", function () {
  instructions.style.left = render.canvas.offsetLeft + "px";
  instructions.style.bottom = render.canvas.offsetTop + "px";
});
