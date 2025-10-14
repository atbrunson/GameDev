
// Matter.js and Poly-decomp Requirements
import { decomp, quickDecomp, isSimple, makeCCW } from "poly-decomp";
import { Common, Svg, Vertices, Composite, Bodies } from "matter-js";

// Main Belt Game Requirements
import {engine, render} from "./main.js"

//--- Matter.js element selector function ---//
const select = function (root, selector) {
  return Array.prototype.slice.call(root.querySelectorAll(selector));
};

//--- Matter.js SVG loader loader function ---//
const loadSvg = function (url) {
  return fetch(url)
    .then(function (response) {
      return response.text();
    })
    .then(function (raw) {
      return new window.DOMParser().parseFromString(raw, "image/svg+xml");
    });
};

/**
 *
 * @param {url} url or path to svg
 * @param {number} scale scale factor of actual svg dimentions
 * @returns
 */

class svgBody {
  constructor(url, scale = 1, x, y) {
    this.url = url;
    this.scaleFac = scale * 3.7795275590551; // TODO: determine necessary pricision
    this.poisition = { x: x, y: y };

    // Load an SVG from a URL
    this.svg = loadSvg(this.url);
    // Select a path elements from the SVG
    this.path = select(this.svg, "path");
    // Map path elements to vertices (use map() to convert each path or it causes an error)
    this.vertices = shipPath.map((path) => {
      return Svg.pathToVertices(path, 50);
    });

    console.log("SVG body created at", this.x, this.y, this); //"Ship created at", x, y,
    
    
    
    // Handle multiple SVG paths (composite of comnposites)
    this.multiPath = this.path.length > 1;
    
    // Create Composite for each path and assign the path id and lable as the composite has id and label
    this.path.forEach(path => { buildComposite(path)
      
    });
    // Handle collision layers and filters

    // Handle handle SVG layers and groups to specify inside and outside shapes

}

// mapSVG(){
//   this.svg.map((element) => {
//     case "path": //label path, decompose and map into vertices, label decomposed vertices "path"+index, incriment z index at end
//     case "g": // create collision filter (and/or set category), label filter "group"
//               // use set to push filters to each path (multiple filters maintains z order)
//     case "layer": // create (and/or set category), lagel filter "layer", incriment z index at end
//   })

// }




buildStructure() {
  // Path->Group->Layer (bottom to top search)
  return this.vertices
};
  

  // create Composite structure mimicking SVG structure (docomposed polygon composited together)
  // groups of paths share the same collision filter & category (group name is collision filter name)
  // layers of paths share the same composite determine z order



};


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

async function loadSVG(url) {
  try {
    const response = await fetch(url);
    const svgContent = await response.text();
    const parser = new DOMParser();
    const parsedSVG = parser.parseFromString(svgContent, "image/svg+xml");
    console.log("parsedSVG", parsedSVG);

    // pull each of the path out of the parsedSVG
    const pathElements = select(parsedSVG, "path");
    console.log("pathElements", pathElements);

    //console.log("pathElements", pathElements.length);
    if (pathElements.length > 1) {
      throw new Error("Multiple paths not supported yet");

      // TODO: convert the paths to matter.js vertices
      const svgVertices = pathElements.map((path) => {
        return Svg.pathToVertices(path, 50);
      });
    } else {
      const svgVertices = Svg.pathToVertices(pathElements[0]);
      console.log("svgVertices", svgVertices);

      // sort the vertices counter-clockwise
      makeCCW(svgVertices);

      // build a flat array of all the vertices from all the paths
      const vertMap = svgVertices.map((v) => [v.x, v.y]);

      // decompose the vertices into convex shapes
      const decompVertSets = decomp(vertMap);
      console.log("decompVerts", decompVertSets);

      // map decomposed vertices into x y pairs
      const vectorSets = [];
      for (const decompVertSet of decompVertSets) {
        const vectorSet = decompVertSet.map((v) => {
          return { x: v[0], y: v[1] };
        });
        vectorSets.push(vectorSet);
      }

      console.log("vectorSets", vectorSets);

      console.log("vectorSetsScaled", vectorSetsScaled);

      return vectorSetsScaled;
    }
  } catch (error) {
    console.error("Error loading SVG:", error);
    return null;
  }
}

export { svgBody,loadSVG, loadSvg, select };
