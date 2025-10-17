// Matter.js and Poly-decomp Requirements
import { decomp, quickDecomp, isSimple, makeCCW } from "poly-decomp";
import { Events,Common, Svg, Vertices, Composite, Bodies } from "matter-js";

// Main Belt Game Requirements
import { engine, render } from "./main.js";

//--- Matter.js element selector function ---//

// select all of element type in document
const select = function (root, selector) {
  return Array.prototype.slice.call(root.querySelectorAll(selector));
}
// const select = function (root, selector) {
//   document.addEventListener("DOMContentLoaded", () => {
//     return Array.prototype.slice.call(root.querySelectorAll(selector)); //error counld not read property of undifined: root.querySelectorAll
//   });
// };
// const selectAll = async function (root, selector) {
//   return await Array.prototype.slice.call(root.querySelectorAll(selector));
// };
// //--- Matter.js SVG loader loader function ---//
const loadSvg = function (url) {
  return fetch(url)
    .then(function (response) {
      return response.text();
    })
    .then(function (raw) {
      return new window.DOMParser().parseFromString(raw, "image/svg+xml");
    })};


const loadSvgPaths = async function (url) {
  return await fetch(url)
    .then(function (response) {
      return response.text();
    })
    .then(function (raw) {
      return new window.DOMParser().parseFromString(raw, "image/svg+xml");
    }).then(function (root) {
  return Array.prototype.slice.call(root.querySelectorAll("path")); 
    }
  )};


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

// async function loadSVG(url) {
//   try {
//     const response = await fetch(url);
//     const svgContent = await response.text();
//     const parser = new DOMParser();
//     const parsedSVG = parser.parseFromString(svgContent, "image/svg+xml");
//     console.log("parsedSVG", parsedSVG);

//     // pull each of the path out of the parsedSVG
//     const pathElements = select(parsedSVG, "path");
//     console.log("pathElements", pathElements);

//     //console.log("pathElements", pathElements.length);
//     if (pathElements.length > 1) {
//       throw new Error("Multiple paths not supported yet");

//       // TODO: convert the paths to matter.js vertices
//       const svgVertices = pathElements.map((path) => {
//         return Svg.pathToVertices(path, 50);
//       });
//     } else {
//       const svgVertices = Svg.pathToVertices(pathElements[0]);
//       console.log("svgVertices", svgVertices);

//       // sort the vertices counter-clockwise
//       makeCCW(svgVertices);

//       // build a flat array of all the vertices from all the paths
//       const vertMap = svgVertices.map((v) => [v.x, v.y]);

//       // decompose the vertices into convex shapes
//       const decompVertSets = decomp(vertMap);
//       console.log("decompVerts", decompVertSets);

//       // map decomposed vertices into x y pairs
//       const vectorSets = [];
//       for (const decompVertSet of decompVertSets) {
//         const vectorSet = decompVertSet.map((v) => {
//           return { x: v[0], y: v[1] };
//         });
//         vectorSets.push(vectorSet);
//       }

//       console.log("vectorSets", vectorSets);

//       console.log("vectorSetsScaled", vectorSetsScaled);

//       return vectorSetsScaled;
//     }
//   } catch (error) {
//     console.error("Error loading SVG:", error);
//     return null;
//   }
// }

export { loadSvgPaths, loadSvg, select };
