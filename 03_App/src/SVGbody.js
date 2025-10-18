// Matter.js and Poly-decomp Requirements
import { decomp, quickDecomp, isSimple, makeCCW } from "poly-decomp";
import { Common, Svg, Vertices, Composite, Bodies } from "matter-js";

// Main Belt Game Requirements
import { engine, render } from "./main.js";
import { loadSvgPaths, loadSvg, select} from "./loadSVG.js";


const bodySVG = await loadSvgPaths("./hollow.svg");
console.log("bodySVG", bodySVG);

// convert the path to matter.js vertices
bodySVG.vertices = bodySVG.map((path) => Svg.pathToVertices(path, 50));
console.log("bodySVG.vertices", bodySVG.vertices);

// An offset deep copy of the vertices for the SVG body correcting offset for pixel to pixel accuracy
bodySVG.offset = Array.from(
  Common.map(bodySVG.vertices, (vertex) => {
    return Array.from(vertex).map((point) => {
      return { x: point.x - 0.14999874000000005, y: point.y - 0.53231924 };
    });
  })
);
console.log("bodySVG.offset", bodySVG.offset);

// A scaled deep copy of the vertices for the SVG body (cannot use Vertices.scale as it causes an error)

bodySVG.scaleFactor = 2.5;

bodySVG.scaledVertices = Array.from(
  Common.map(bodySVG.offset, (vertex) => {
    return Array.from(vertex).map((point) => {
      return { x: point.x * bodySVG.scaleFactor, y: point.y * bodySVG.scaleFactor };
    });
  })
);
console.log("bodySVG.scaledVertices", bodySVG.scaledVertices);

// Create SVG Composite

bodySVG.body = Composite.create({ id: "mysvgBody", label: "mysvgBody" });

console.log("bodySVG.body", bodySVG.body);
Composite.add(bodySVG.body, Bodies.fromVertices(200, 200, bodySVG.scaledVertices));
Composite.add(world, bodySVG.body);
Matter.Common.info(bodySVG.body);













/**
 *
 * @param {url} url or path to svg
 * @param {number} scale scale factor of actual svg dimentions
 * @returns
 */

class SVGbody {
  constructor(url, scale = 1, x, y) {
    this.url = url;

    this.poisition = { x: x, y: y };

    // Load an SVG from a URL
    Common.info("Loading SVG Paths from", this.url);
    
    // Load path elements from the SVG
    this.loaded = loadSvgPaths(this.url, "path")
      .then(result => this.paths = result)

      
      // .then(this.vertices = Common.map(this.paths, (path) => {return Vertices.scale(path, this.scaleFac, this.scaleFac)}))
      // .then(this.body = Composite.create({ id: "mysvgBody", label: "mysvgBody" }))
      // .then(Composite.add(this.body, Bodies.fromVertices(200, 200, this.vertices)))
      // .then(Composite.add(engine.world, this.body))
      // .then(Matter.Common.info(this.body))



    
   
    
    //this.vertices = Common.map(this.paths, (path) => {return Vertices.fromPath(path, 50);})

    
   // this.vertices = Svg.pathToVertices(this.paths,50)
    //   .then(paths => paths.map(path => Svg.pathToVertices(path, 50)))
    //   .then(paths => paths.map(path => Vertices.scale(path, this.scaleFac, this.scaleFac)))
    //   .finally(result => this.paths = result);

    // this.vertices = Common.values(this.paths);

    // console.log("SVGbody.vertices", this.vertices);

    // Map path elements to vertices (use map() to convert each path or it causes an error)
    
    // Scale the vertices (use map() to scale each set or scale causes an error)
    // this.vertices = Common.map(this.paths, (path) => {
    //   return Vertices.scale(path, this.scaleFac, this.scaleFac);
    // }); console.log("SVGbody.vertices", this.vertices);
    
    // Create Composite and adds decomposed parts from vector sets to the composite
    
   
 
   



    // Handle multiple SVG paths (composite of comnposites)
    ;

    // Create Composite for each path and assign the path id and lable as the composite has id and label
    // this.path.forEach(path => { buildComposite(path)

    // });
    // Handle collision layers and filters

    // Handle handle SVG layers and groups to specify inside and outside shapes
  }

  mapSVG() {
    //   this.svg.map((element) => {
    //     case "path": //label path, decompose and map into vertices, label decomposed vertices "path"+index, incriment z index at end
    //     case "g": // create collision filter (and/or set category), label filter "group"
    //               // use set to push filters to each path (multiple filters maintains z order)
    //     case "layer": // create (and/or set category), lagel filter "layer", incriment z index at end
    //   })
  }

  buildStructure() {
    // Path->Group->Layer (bottom to top search)
    return this.vertices;
  }

  // create Composite structure mimicking SVG structure (docomposed polygon composited together)
  // groups of paths share the same collision filter & category (group name is collision filter name)
  // layers of paths share the same composite determine z order
}

//--// Working Code Below
// Load an SVG from a URL
// const shipSVG = await loadSvg("./ship.svg");
// console.log("svgShip", shipSVG);
// // select a path from the SVG
// const shipPath = await select(shipSVG, "path");
// console.log("shipPath", shipPath);
// // convert the path to matter.js vertices (use map to convert each path or it causes an error)
// const shipVectorSets = shipPath.map((path) => {
//   return Svg.pathToVertices(path, 50);
// }); console.log("shipVectorSets", shipVectorSets);
// // scale the vertices (use map to scale each set or scale causes an error)
// const shipScaledSets = shipVectorSets.map((set) => {
//   return Vertices.scale(set, 4,4);
// }); console.log("shipScaledSets", shipScaledSets);
// // create Composite and adds bodies from vertor sets to the composite
// const svgShip = Composite.create({ id: "svgShip", label: "svgSHIP" });
// console.log("svgShip", svgShip);
// Composite.add(svgShip, Bodies.fromVertices(200, 200, shipScaledSets));
// Composite.add(world, svgShip);
// console.log("Bean", svgShip);
// Matter.Common.info(svgShip);



export { SVGbody }
