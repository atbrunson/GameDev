//matter.js testing

console.log(app);

// module aliases
const Engine = Matter.Engine,
  Render = Matter.Render,
  Runner = Matter.Runner,
  Body = Matter.Body,
  Composite = Matter.Composite,
  Composites = Matter.Composites,
  Constraint = Matter.Constraint,
  MouseConstraint = Matter.MouseConstraint,
  Mouse = Matter.Mouse,
  Bodies = Matter.Bodies;
  Events = Matter.Events;
Common = Matter.Common;



// create engine
let engine = Engine.create(),
  world = engine.world;

// set world properties
world.gravity.scale = 0.0;

// create renderer
let render = Render.create({
  element: document.getElementById("app"),
  engine: engine,
  options: {
    width: 800,
    height: 600,
    wireframes: false,
    showAngleIndicator: true,
    showCollisions: false,
    showVelocity: true,
    showDebug: false,
    showIds: false,
  },
});
console.log(render);
// create svg container on top of the canvas
let draw = document.createElementNS("http://www.w3.org/2000/svg", "svg");
draw.setAttribute("id", "draw")
draw.setAttribute("width", render.options.width);
draw.setAttribute("height", render.options.height);
draw.setAttribute("viewBox", "0 0 " + render.options.width + " " + render.options.height);

document.getElementById("ui").appendChild(draw)

console.log(draw);
var meta= SVG().nested(draw)
var rect = SVG().rect(100, 100).fill('red')
draw.set

// fit the render viewport to the scene
Render.lookAt(render, {
  min: { x: 0, y: 0 },
  max: { x: render.options.width, y: render.options.height },
});

// run the renderer
Render.run(render);

// create runner
let runner = Runner.create();

// run the engine
Runner.run(runner, engine);

// add mouse control
let mouse = Mouse.create(render.canvas),
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

// create four boxes for walls floor & ceiling
let box = Composite.create();

let ground = Bodies.rectangle(400, 625, 1000, 60, {
  isStatic: true,
  restitution: 1,
});
let leftWall = Bodies.rectangle(-25, 300, 60, 1000, {
  isStatic: true,
  restitution: 1,
});

let rightWall = Bodies.rectangle(825, 300, 60, 1000, {
  isStatic: true,
  restitution: 1,
});

let ceiling = Bodies.rectangle(400, -25, 1000, 60, {
  isStatic: true,
  restitution: 1,
});

Composite.add(box, ground);
Composite.add(box, leftWall);
Composite.add(box, rightWall);
Composite.add(box, ceiling);

// generates ring of bodies and chaining them together
// TODO:
// - separate loop chaining from ring creation
// - create ring function
// - create close_chain function

let nBodies = 100;
let linkDia = 5;
let linkMass = 1;
let cLength = 0.5;
let cDamp = 1;
let cStiff = 0.00001;
let displayLink = false;

// create ring of bodies
let ringDia = (nBodies * linkDia + (nBodies - 1) * cLength) / Math.PI;
let ringAngle = (2 * Math.PI) / nBodies;
let ring = Composite.create({ label: "Ring" });
let ringEnds = Composite.create({ label: "RingEnds" });

for (let i = 0; i < nBodies; i++) {
  let x = 400 + ringDia * Math.cos(ringAngle * i);
  let y = 300 + ringDia * Math.sin(ringAngle * i);

  let link = Bodies.circle(x, y, linkDia, {
    render: { fillStyle: "darkgrey" },
    label: "link" + i,
  });
  Composite.addBody(ring, link);
}

Composites.chain(ring, 0.45, 0, -0.45, 0, {
  stiffness: cStiff,
  length: cLength,
  mass: linkMass,
  render: {
    type: "line",
    visible: displayLink,
  },
});

Composite.add(
  ring,
  Constraint.create({
    bodyA: ring.bodies[ring.bodies.length - 1],
    pointA: { x: 0.9 * linkDia, y: 0 },
    bodyB: ring.bodies[0],
    pointB: { x: -0.9 * linkDia, y: 0 },
    stiffness: cStiff,
    length: cLength,
    mass: linkMass,
    render: {
      type: "line",
      visible: displayLink,
    },
  }),
);

ring.bodies.forEach((b) => {
  Body.rotate(b, Math.PI / 2 + ringAngle * ring.bodies.indexOf(b));
  console.log("body " + b.id, 45 + ringAngle * ring.bodies.indexOf(b));
});

Composite.add(world, [box, ring]);






function smin(a, b, k) {
  let res = Math.exp(-k * a) + Math.exp(-k * b);
  return -Math.log(res) / k;
}


// add sliders for damping and stiffness
let dampingSlider = document.getElementById("dampingSlider");
let stiffnessSlider = document.getElementById("stiffnessSlider");
let displayLinkCheckbox = document.getElementById("displayLinkCheckbox");

dampingSlider.value = cDamp;
dampingSlider.min = 0;
dampingSlider.max = 1;
stiffnessSlider.value = cStiff;
stiffnessSlider.min = 0;
stiffnessSlider.max = 1;
displayLinkCheckbox.checked = displayLink;




dampingSlider.oninput = function () {
  cDamp = dampingSlider.value;
  ring.constraints.forEach((c) => {
    c.damping = cDamp;
    console.log(c.damping);
  });
};

stiffnessSlider.oninput = function () {
  cStiff = stiffnessSlider.value;
  ring.constraints.forEach((c) => {
    c.stiffness = cStiff;
    console.log(c.stiffness);
  });
};

displayLinkCheckbox.oninput = function () {
  displayLink = displayLinkCheckbox.checked;
  ring.constraints.forEach((c) => {
    c.render.visible = displayLink;
  });
}; 

//render sliders 