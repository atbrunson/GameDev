// Developing Extensions for Matter.js
// 04_ChainLoop/src/main.js

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
  Bodies = Matter.Bodies,
  Events = Matter.Events,
  Common = Matter.Common;

// create engine
let engine = Engine.create({ gravity: { x: 0, y: 0 } }),
  world = engine.world;

// set world properties

// create renderer
let render = Render.create({
  element: document.getElementById("app"),
  engine: engine,
  options: {
    width: 800,
    height: 600,
    showAngleIndicator: true,
    showCollisions: false,
    showVelocity: true,
    wireframes: false,
    showDebug: false,
    showIds: false,
  },
});
console.log(render);

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

Composite.add(box, [ground, leftWall, rightWall, ceiling]);
Composite.add(world, box);

// generates ring of bodies and chaining them together
// TODO:
// - separate loop chaining from ring creation
// - create ring function
// - create close_chain method

let xpos = 400;
let ypos = 300;
let nBodies = 25;
let linkDia = 25;
let linkMass = 1;
let cLength = linkDia / 16;
let cDamp = 1;
let cStiff = 0.001;
let displayBody = true;
let displayChain = true;
let displayLLink = true;
let displayXLink = true;
let noCollisions = true; // links don't collide
let bAxoffset = 0.45;
let bAyoffset = 0;
let bBxoffset = -0.45;
let bByoffset = 0;

// create composite where the bodies are arranged in a ring
let ringDia = (nBodies * linkDia + (nBodies - 1) * cLength) / Math.PI;
let ringAngle = (2 * Math.PI) / nBodies;
let ring = Composite.create({ label: "Ring" });

for (let i = 0; i < nBodies; i++) {
  let x = xpos + ringDia * Math.cos(ringAngle * i);
  let y = ypos + ringDia * Math.sin(ringAngle * i);

  let link = Bodies.circle(x, y, linkDia, {
    render: {
      fillStyle: "darkgrey",
      visible: displayBody,
    },
    label: "ring-body-" + i,
  });
  Composite.addBody(ring, link);
}

// standard use of chain
Composites.chain(ring, bAxoffset, bAyoffset, bBxoffset, bByoffset, {
  stiffness: cStiff,
  length: cLength,
  mass: linkMass,
  label: "chain-link",
  render: {
    type: "line",
    visible: displayChain,
  },
});

// TODO: loop chain
// in the composite, find the offset of the exsisting constraint on the last body (bodyA)  
// then find the offset of the exsisting constraint on the first body (bodyB)
// using same method as Composites.chain

// close chain into loop
Composite.addConstraint(
  ring,
  Constraint.create({
    bodyA: ring.bodies[ring.bodies.length - 1],
    pointA: { x: 0.9 * linkDia, y: 0 },
    bodyB: ring.bodies[0],
    pointB: { x: -0.9 * linkDia, y: 0 },
    stiffness: cStiff,
    length: cLength,
    mass: linkMass,
    label: "loop-link",
    render: {
      type: "line",
      visible: displayLLink,
    },
  }),
);

// rotate bodies of loop front to back
ring.bodies.forEach((b) => {
  Body.rotate(b, Math.PI / 2 + ringAngle * ring.bodies.indexOf(b));
  // console.log("body " + b.id, 45 + ringAngle * ring.bodies.indexOf(b));
});

// crosslink bodies in the composite
ring.bodies.forEach((b) => {
  Composite.addConstraint(
    ring,
    Constraint.create(
      Common.extend(
        {
          stiffness: cStiff / 1000,
          mass: linkMass,
          label: "chain-xlink",
          dampening: cDamp * 1000,
          render: {
            visible: displayXLink,
            type: "line",
          },
          bodyA: b,
          bodyB:
            ring.bodies[
              (ring.bodies.indexOf(b) + Math.floor(ring.bodies.length / 2)) %
                ring.bodies.length
            ],
        },
        Common.chainOptions,
      ),
    ),
  );
});

// // link specific bodies
// let n = 1,
//   m = 4;
// Composite.addConstraint(
//   ring,
//   Constraint.create(
//     Common.extend(
//       { bodyA: ring.bodies[n - 1], bodyB: ring.bodies[m - 1] },
//       Common.chainOptions,
//     ),
//   ),
// );

console.log(ring);
Composite.add(world, [ring]);
