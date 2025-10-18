//View Controls Module
//Handles zooming and panning of the viewport
import {
  Engine,
  Render,
  Events,
  Mouse,
  MouseConstraint,
  Composite,
  Bounds,
  Vector,
} from "matter-js";
import { engine, render } from "../main.js"; //imported from main.js

Vector = Matter.Vector;
Bounds = Matter.Bounds;
Composite = Matter.Composite;
Mouse = Matter.Mouse;
MouseConstraint = Matter.MouseConstraint;
Events = Matter.Events;
Engine = Matter.Engine;
Render = Matter.Render;

if (!engine) {
  throw new Error(
    "Engine is undefined. View controls module requires an engine to be defined."
  );
}
if (!engine.mouseConstraint) {
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
}

if (!render.canvas) {
  throw new Error(
    "Render.canvas is undefined. View controls module requires a render with a canvas to be defined."
  );
}

Events.on(render, "beforeRender", function () {
  let world = engine.world;
  let mouse = mouseConstraint.mouse;
  let translate = { x: 0, y: 0 };

  // mouse wheel controls zoom
  var scaleFactor = mouse.wheelDelta * -0.1;
  if (scaleFactor !== 0) {
    if (
      (scaleFactor < 0 && boundsScale.x >= 0.6) ||
      (scaleFactor > 0 && boundsScale.x <= 1.4)
    ) {
      boundsScaleTarget += scaleFactor;
    }
  }

  // if scale has changed
  if (Math.abs(boundsScale.x - boundsScaleTarget) > 0.01) {
    // smoothly tween scale factor
    scaleFactor = (boundsScaleTarget - boundsScale.x) * 0.2;
    boundsScale.x += scaleFactor;
    boundsScale.y += scaleFactor;

    // scale the render bounds
    render.bounds.max.x = render.bounds.min.x + render.options.width * boundsScale.x;
    render.bounds.max.y = render.bounds.min.y + render.options.height * boundsScale.y;

    // translate so zoom is from centre of view
    translate = {
      x: render.options.width * scaleFactor * -0.5,
      y: render.options.height * scaleFactor * -0.5,
    };

    Bounds.translate(render.bounds, translate);

    // update mouse
    Mouse.setScale(mouse, boundsScale);
    Mouse.setOffset(mouse, render.bounds.min);
  }

  // get vector from mouse relative to centre of viewport
  var deltaCentre = Vector.sub(mouse.absolute, viewportCentre),
    centreDist = Vector.magnitude(deltaCentre);

  // translate the view if mouse has moved over 50px from the centre of viewport
  if (centreDist > 50) {
    // create a vector to translate the view, allowing the user to control view speed
    var direction = Vector.normalise(deltaCentre),
      speed = Math.min(10, Math.pow(centreDist - 50, 2) * 0.0002);

    translate = Vector.mult(direction, speed);

    // prevent the view moving outside the extents
    if (render.bounds.min.x + translate.x < extents.min.x)
      translate.x = extents.min.x - render.bounds.min.x;

    if (render.bounds.max.x + translate.x > extents.max.x)
      translate.x = extents.max.x - render.bounds.max.x;

    if (render.bounds.min.y + translate.y < extents.min.y)
      translate.y = extents.min.y - render.bounds.min.y;

    if (render.bounds.max.y + translate.y > extents.max.y)
      translate.y = extents.max.y - render.bounds.max.y;

    // move the view
    Bounds.translate(render.bounds, translate);

    // we must update the mouse too
    Mouse.setOffset(mouse, render.bounds.min);
  }
});
