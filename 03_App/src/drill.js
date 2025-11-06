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

import Matter, { Common } from "matter-js";
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
    const drillArea = Matter.Bodies.polygon(this.x, this.y, 5, this.radius, {
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
    Matter.Events.on(engine, "beforeUpdate", this.drill.bind(this));
    this.isDrilling = true;
    this.drillArea = this.createDrillArea();
  }
  drill() {
    if (!this.isDrilling) return;
    //console.log("drilling...");
    // Update drill area position to follow mouse
    const mousePosition = render.mouse.position;
    Matter.Body.setPosition(this.drillArea, mousePosition);
    // Get bodies in the drill area
    const bodies = Matter.Composite.allBodies(engine.world);
    // Remove portions of bodies within the drill area
    for (const body of bodies) {
      if (Matter.Bounds.overlaps(body.bounds, this.drillArea.bounds)) {
        const collision = Matter.Collision.collides(body, this.drillArea);

        if (collision !== null) {
          if (
            body.label !== "drillArea" &&
            collision.collided &&
            collision.bodyA.id !== collision.bodyB.id
          ) {
            //Common.info("COLLISION!", collision);
            //console.log("collision", collision);
            const drillAreaPath = Matter.Vertices.create(this.drillArea.vertices);

            // check if the body.parts.length > 1
            if (body.parts.length > 1) {
              // if so transverse body.parts and find the body that is intersected by the drill area
              for (const part in body.parts) {
                if (
                  body.parts[part].id !== body.parent.id &&
                  Matter.Bounds.overlaps(
                    body.parts[part].bounds,
                    this.drillArea.bounds
                  )
                ) {
                  //console.log("part", body.parts[part]);

                  // if part is less area than the drill area remove it
                  //Matter.Common.info("part.area", Matter.Vertices.area(body.parts[part].vertices), "drillArea.area", this.drillArea.area);

                  // find vertices of drill area inside body part
                  const verticesInsideBody = drillAreaPath.filter((vertex) => {
                    return Matter.Vertices.contains(
                      body.parts[part].vertices,
                      vertex
                    );
                  });

                  // find vertices of body part inside drill area
                  const verticesInsideDrillArea = body.parts[part].vertices.filter(
                    (vertex) => {
                      return Matter.Vertices.contains(
                        this.drillArea.vertices,
                        vertex
                      );
                    }
                  );

                  // add veriticesInsideBody to the body path
                  for (const vertex of verticesInsideBody) {
                    Matter.Common.extend(body.parts[part].vertices, vertex);
                    body.parts[part].vertices.push(vertex);
                  }
                  Matter.Vertices.clockwiseSort(body.parts[part].vertices);

                  // create axes from the wertices inside drill area
                  Matter.Common.extend(
                    body.parts[part].axes,
                    Matter.Axes.fromVertices(verticesInsideDrillArea)
                  );

                  // remove verticesInsideDrill from the body path
                  for (const vertex of verticesInsideDrillArea) {
                    const index = body.parts[part].vertices.indexOf(vertex);
                    if (index !== -1) {
                      body.parts[part].vertices.splice(index, 1);
                    }
                  }

                  if (
                    Matter.Vertices.area(body.parts[part].vertices) <=
                    this.drillArea.area
                  ) {
                    Matter.Body.update(body.parts[part], 0);
                    Matter.Composite.remove(engine.world, body.parts[part]);
                  }

                  // // does this part overlap with any other part?
                  // for (const otherPart in body.parts) {
                  //   if (otherPart !== part) {
                  //     if (!Matter.Bounds.overlaps(body.parts[otherPart].bounds, body.parts[part].bounds)) {
                  //       // remove the part from parts or change part's parent to itself
                  //     }
                  //   }
                  // }
                }
              }
            }

            Matter.Vertices.clockwiseSort(body.vertices);
            Matter.Body.update(body);
            // // create a path of the intersected body
            // const bodyPath = body.vertices;
            // Matter.Vertices.clockwiseSort(bodyPath);
            // //Matter.Common.info("body", body.id, body);

            // // find axes that intersect the drill area
            // // find vertices of drill area inside body
            // const verticesInsideBody = drillAreaPath.filter((vertex) => {
            //   return Matter.Vertices.contains(body.vertices, vertex);
            // });
            // //verticesInsideBody.length >= 0 ? console.log("drill verticesInsideBody", verticesInsideBody) : null;

            // // find vertices of body inside drill area
            // const verticesInsideDrillArea = body.vertices.filter((vertex) => {
            //   return Matter.Vertices.contains(this.drillArea.vertices, vertex);
            // });
            // verticesInsideDrillArea.length >= 0 ? console.log("body verticesInsideDrillArea", verticesInsideDrillArea) : null;

            // add veriticesInsideBody to the body path
            // bodyPath.push(...verticesInsideBody);
            // Matter.Body.update(body)
            // Matter.Bounds.update(body.bounds, bodyPath);
            // Matter.Vertices.clockwiseSort(bodyPath);

            // // remove verticesInsideDrill from the body path
            // for (const vertex of verticesInsideDrillArea) {
            //   const index = bodyPath.indexOf(vertex);
            //   if (index !== -1) {
            //     bodyPath.splice(index, 1);
            //   }
            // }
            // Matter.Vertices.clockwiseSort(bodyPath);
            // Matter.Bounds.update(body.bounds, bodyPath);
            // // remove body if less than 3 vertices
            // if (bodyPath.length < 3) {
            //   Matter.Composite.remove(engine.world, body);
            //   continue;
            // }

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
    Matter.Events.off(engine, "beforeUpdate", this.drill.bind(this));
    Matter.Composite.remove(engine.world, this.drillArea);
    this.isDrilling = false;
  }
}

export { Drill };
