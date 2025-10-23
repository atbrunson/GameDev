import Matter, { Body } from "matter-js";
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
    const World = Matter.World;
    const Body = Matter.Body;

    particleOptions = Common.extend({ inertia: Infinity }, particleOptions);
    constraintOptions = Common.extend(
      {
        stiffness: 0.2,
        render: { strokeStyle: "#999999", type: "line", anchors: false },
      },
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

class SoftBag {
  /**
   * Creates a soft body with a 60° pitch pattern connected to each other.
   * @class SoftBody
   * @param {number} xx position
   * @param {number} yy position
   * @param {number} columns
   * @param {number} rows
   * @param {number} gap
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
    gap,
    crossBrace,
    particleRadius,
    particleOptions,
    constraintOptions
  ) {
    this.xx = xx;
    this.yy = yy;
    this.rows = rows;
    this.columns = columns * 2 - 1;
    this.particleRadius = particleRadius;
    this.gap = gap;
    this.crossBrace = crossBrace;
    this.label = "SoftBag";
    this.stiffness = 0.125;
    this.cOffet = 0;

    const Common = Matter.Common;
    const Composite = Matter.Composite;
    const Composites = Matter.Composites;
    const Bodies = Matter.Bodies;

    particleOptions = Common.extend({ inertia: Infinity }, particleOptions);
    constraintOptions = Common.extend(
      {
        length: 42,
        stiffness: this.stiffness * 2,
        render: { type: "line", anchors: false },
      },
      constraintOptions
    );

    this.matter = Composites.stack(
      this.xx,
      this.yy,
      this.columns,
      this.rows,
      this.gap,
      this.gap,
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

    this.matter.constraints = this.matter.constraints.filter(
      // keeps if retuns true
      (constraint) =>
        constraint.bodyB.id !== this.columns + constraint.bodyA.id && // keep if bodyB.id is not equal to columns + bodyA.id
        constraint.bodyB.id !== 1 + constraint.bodyA.id && // keep if bodyB.id is not equal to 1 + bodyA.id
        constraint.bodyB.id % 2 === 0 && // keep if bodyB.id is even
        (constraint.bodyA.id !== this.matter.bodies[0] || // keep if bodyA.id isn't a courner odd
          constraint.bodyB.id !== this.matter.bodies[0]) // keep if bodyB.id isn't a courner odd
    );

    this.matter.bodies = this.matter.bodies.filter((body, index) => index % 2 === 0);

    console.log(this.matter);

    // Add the 60° pitch pattern
    const lastBody = this.matter.bodies[this.matter.bodies.length - 1];
    console.log("lastBody", lastBody);

    const lastConstraint =
      this.matter.constraints[this.matter.constraints.length - 1];
    console.log("lastConstraint", lastConstraint);

    const rightbodies = Composite.create({ label: "rightbodies" });
    Composite.add(
      rightbodies,
      this.matter.bodies.filter(
        (body, index) => index % this.columns === (this.columns + 1) / 2 - 1 // reserses the calculation to get the correct number of columns
      )
    );
    Composites.chain(rightbodies, 0, this.cOffet, 0, -this.cOffet, {
      //length: 42, // calculate later or place bodies in a 60deg pitch
      stiffness: this.stiffness,
      render: { visable: true, type: "line", anchors: false },
    });

    //Composite.add(this.matter, rightbodies);
    console.log("rightbodies", rightbodies);

    const leftbodies = Composite.create({ label: "leftbodies" });
    Composite.add(
      leftbodies,
      this.matter.bodies.filter((body, index) => index % this.columns === 0)
    );
    Composites.chain(leftbodies, 0, this.cOffet, 0, -this.cOffet, {
      //length: 42, // calculate later or place bodies in a 60deg pitch
      stiffness: this.stiffness,
      render: { visable: true, type: "line", anchors: false },
    });

    //Composite.add(this.matter, leftbodies);
    console.log("leftbodies", leftbodies);

    const topbodies = Composite.create({ label: "topbodies" });
    Composite.add(
      topbodies,
      this.matter.bodies.filter((body, index) => index < (this.columns + 1) / 2)
    );
    Composites.chain(topbodies, this.cOffet, 0, -this.cOffet, 0, {
      //length: 42, // calculate later or place bodies in a 60deg pitch
      stiffness: this.stiffness,
      render: { visable: true, type: "line", anchors: false },
    });

    //Composite.add(this.matter, topbodies);
    console.log("topbodies", topbodies);

    const middlebodies = Composite.create({ label: "middlebodies" });
    Composite.add(
      middlebodies,
      this.matter.bodies.filter(
        (body, index) =>
          index >= this.rows / 2 + (this.columns + 1) / 2 &&
          index <= this.matter.bodies.length - (this.columns + 1) / 2
      )
    );
    Composites.chain(middlebodies, this.cOffet, 0, -this.cOffet, 0, {
      //length: 42, // calculate later or place bodies in a 60deg pitch
      stiffness: this.stiffness,
      render: { visable: true, type: "line", anchors: false },
    });

    //Composite.add(this.matter, middlebodies);
    console.log("middlebodies", middlebodies);

    const bottombodies = Composite.create({ label: "bottombodies" });
    Composite.add(
      bottombodies,
      this.matter.bodies.filter(
        (body, index) => index >= this.matter.bodies.length - (this.columns + 1) / 2
      )
    );
    Composites.chain(bottombodies, this.cOffet, 0, -this.cOffet, 0, {
      //length: 42, // calculate later or place bodies in a 60deg pitch
      stiffness: this.stiffness,
      render: { visable: true, type: "line", anchors: false },
    });

    //Composite.add(this.matter, bottombodies);
    console.log("bottombodies", bottombodies);

    // add contraints for the remaining bodies

    Composite.add(engine.world, this.matter);
    console.log(`${this.label}`, this.matter);
  }
}

export { SoftBody, SoftBag };
