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
    const drillArea = Matter.Bodies.polygon(this.x, this.y, 3, this.radius, {
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
        if (collision !== null) {
          if (body.label !== "drillArea" && collision.collided) {
            console.log("collision", collision);

            // create a path of the intersected body
            const bodyPath = body.vertices;
            Matter.Vertices.clockwiseSort(bodyPath);
            console.log("body", body);
            // create a path of the drill area
            const drillAreaPath = Matter.Vertices.create(this.drillArea.vertices);

            // find vertices of drill area inside body
            const verticesInsideBody = drillAreaPath.filter((vertex) => {
              return Matter.Vertices.contains(body.vertices, vertex);
            });
            // find vertices of body inside drill area
            const verticesInsideDrillArea = body.vertices.filter((vertex) => {
              return Matter.Vertices.contains(this.drillArea.vertices, vertex);
            });
            console.log("verticesInsideBody", verticesInsideBody);
            console.log("verticesInsideDrillArea", verticesInsideDrillArea);

            // add veriticesInsideBody to the body path
            bodyPath.push(...verticesInsideBody);
            Matter.Body.update(body)
            Matter.Bounds.update(body.bounds, bodyPath);
            Matter.Vertices.clockwiseSort(bodyPath);
            
            // remove verticesInsideDrill from the body path
            for (const vertex of verticesInsideDrillArea) {
              const index = bodyPath.indexOf(vertex);
              if (index !== -1) {
                bodyPath.splice(index, 1);
              }
            }
            Matter.Vertices.clockwiseSort(bodyPath);
            Matter.Bounds.update(body.bounds, bodyPath);
            // remove body if less than 3 vertices
            if (bodyPath.length < 3) {
              Matter.Composite.remove(engine.world, body);
              continue;
            }

            // if (verticesInside.length > 0) {
            //   // remove the vertices from the body
            //   body.vertices = body.vertices.filter((vertex) => {
            //     return !Matter.Vertices.contains(this.drillArea.vertices, vertex);
            //   });
            //   // create new body with interior vertices
            //
            //            // }
            //
          }
        }
        // if body is part of a constraint, remove the constraint
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
