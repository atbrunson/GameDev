import Matter from "matter-js";
import { engine, render } from "./main.js";
import { KeyboardControl } from "./keyboard_control.js";

class SoftBody {
  /**
   * Creates a simple soft body like object.
   * @class SoftBody
   * @param {number} xx
   * @param {number} yy
   * @param {number} columns
   * @param {number} rows
   * @param {number} columnGap
   * @param {number} rowGap
   * @param {boolean} crossBrace
   * @param {number} particleRadius
   * @param {} particleOptions
   * @param {} constraintOptions
   */
  constructor(
    xx,
    yy,
    rows,
    columns,
    columnGap,
    rowGap,
    crossBrace,
    particleRadius,
    particleOptions,
    constraintOptions
  ) {
    this.xx = xx;
    this.yy = yy;
    this.rows = rows;
    this.columns = columns;
    this.particleRadius = particleRadius;
    this.columnGap = columnGap;
    this.rowGap = rowGap;
    this.crossBrace = crossBrace;
    this.label = "SoftBody";

    const Common = Matter.Common;
    const Composite = Matter.Composite;
    const Composites = Matter.Composites;
    const Bodies = Matter.Bodies;

    particleOptions = Common.extend({ inertia: Infinity }, particleOptions);
    constraintOptions = Common.extend(
      { stiffness: 0.2, render: { type: "line", anchors: false } },
      constraintOptions
    );

    this.matter = Composites.stack(
      this.xx,
      this.yy,
      this.columns,
      this.rows,
      this.columnGap,
      this.rowGap,
      function (x, y) {
        return Bodies.circle(x, y, this.particleRadius, particleOptions);
      }.bind(this)
    );
    Composites.mesh(
      this.matter,
      this.columns,
      this.rows,
      this.crossBrace,
      constraintOptions
    );
    Composite.add(engine.world, this.matter);
    console.log(`${this.label}`, this.matter);
  }
}

export { SoftBody };
