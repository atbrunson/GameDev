/**
 * Drill matter.js bodies
 * Features:
 *
 *  Click to use drill
 *  Control size of drill area
 *  Break soft bodies
 *
 *
 *
 */

import Matter from "matter-js";
import { engine } from "./main.js";
import { render } from "./main.js";

class Drill {
  /**
   * Creates a new Drill object.
   * @param {number} x - The x position of the drill
   * @param {number} y - The y position of the drill
   * @param {number} radius - The radius of the drill area
   */

  constructor(x, y, radius) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.isDrilling = false;
    this.label = "drill";
  }
  createDrillArea() {
    const drillArea = Matter.Bodies.circle(this.x, this.y, this.radius, {
      isSensor: true,
      isStatic: true,
      label: "drillArea",
      render: {
        fillStyle: "rgba(255, 0, 0, 0.5)", // Semi-transparent red
      },
    });
    Matter.Composite.add(engine.world, drillArea);
    return drillArea;
  }

  startDrilling() {
    this.isDrilling = true;
    this.drillArea = this.createDrillArea();
    Matter.Events.on(engine, "beforeUpdate", this.drill.bind(this));
  }
  drill() {
    if (!this.isDrilling) return;
      console.log("drilling...");
    // Update drill area position to follow mouse
    const mousePosition = render.mouse.position;
    Matter.Body.setPosition(this.drillArea, mousePosition);
    // Get bodies in the drill area
    const bodies = Matter.Composite.allBodies(engine.world);
    // Remove portions of bodies within the drill area
    for (const body of bodies) {
      if (Matter.Bounds.overlaps(body.bounds, this.drillArea.bounds)) {
        const collision = Matter.Collision.collides(body, this.drillArea); //not working as expected
        if (collision.collided && body.label !== 'drillArea') {
          // find potortion of body inside drill area
          const verticesInside = body.vertices.filter((vertex) => {
            return Matter.Vertices.contains(this.drillArea.vertices, vertex);
          });
          console.log("collided with", body.id,"verticesInside", verticesInside);
          // if (verticesInside.length > 0) {
          //   // remove the vertices from the body
          //   body.vertices = body.vertices.filter((vertex) => {
          //     return !Matter.Vertices.contains(this.drillArea.vertices, vertex);
          //   });
          //   // crete new body with interior vertices
          //   const interiorBody = Matter.Body.create({
          //     parts: [Matter.Vertices.create(verticesInside, body)],
          //     isStatic: false,
          //     render: {
          //       fillStyle: "rgba(0, 0, 255, 0.5)", // Semi-transparent blue
          //     },
          //   });
          //   Matter.Composite.add(engine.world, interiorBody);
          // }
        }
      }
    }
  }
  stopDrilling() {
    this.isDrilling = false;
    Matter.Composite.remove(engine.world, this.drillArea);
    Matter.Events.off(engine, "beforeUpdate", this.drill.bind(this));
  }
}

export { Drill };
