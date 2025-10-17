// Matter.js and Poly-decomp Requirements
import { decomp, quickDecomp, isSimple, makeCCW } from "poly-decomp";
import { Common, Svg, Vertices, Composite, Bodies } from "matter-js";
Common.setDecomp(decomp);
// Main Belt Game Requirements
import { engine, render } from "./main.js";


/**
 *
 */

class SVGcomposite {
  constructor( SVGpaths , scale = 1, x, y) {
    this.vertices = Common.map(SVGpaths,((path) => Svg.pathToVertices(path, 50)));
   
    this.scaleFactor = scale;
    this.poisition = { x: x, y: y };
    // convert the path to matter.js vertices
    
    console.log("this", this);
    console.log("this.vertices", this.vertices);

    // An offset deep copy of the vertices for the SVG body correcting offset for pixel to pixel accuracy
    this.offset = Array.from(
    Common.map(this.vertices, (vertex) => {
        return Array.from(vertex).map((point) => {
        return { x: point.x - 0.14999874000000005, y: point.y - 0.53231924 };
        });
    })
    );
    console.log("this.offset", this.offset);

    // A scaled deep copy of the vertices for the SVG body (cannot use Vertices.scale as it causes an error)

    this.scaledVertices = Array.from(
    Common.map(this.offset, (vertex) => {
        return Array.from(vertex).map((point) => {
        return { x: point.x * this.scaleFactor, y: point.y * this.scaleFactor };
        });
    })
    );
    console.log("this.scaledVertices", this.scaledVertices);

    // Create SVG Composite

    this.body = Composite.create({ id: "mysvgBody", label: "mysvgBody" , stroke: "black", strokeWidth: 2, fill: "white"});

    console.log("this.body", this.body);
    Composite.add(this.body, Bodies.fromVertices(this.poisition.x, this.poisition.y, this.scaledVertices));
    Composite.add(engine.world, this.body);
    Common.info(this.body);
    

  }// end constructor

  
}

export { SVGcomposite };