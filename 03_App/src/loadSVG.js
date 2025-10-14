// only run if fetch is available (not in node.js)
/**
 * Loads an SVG from a URL and converts its paths to matter-js vectors
 * @param {string} url - The URL of the SVG to load
 * @return {Promise} A promise that resolves to an array of matter-js vectors
 * @example
 * Composite.add( world,
 *   Bodies.fromVertices( 400, 80, loadSVG("./img/path.svg")
 * );
 */

import { decomp, quickDecomp, isSimple, makeCCW } from "poly-decomp-es";
import { Common, Svg, Vertices } from "matter-js";

const loadSVG = async function (url) {
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
        
        const scaleFactor = 4;
        // scale SVG to matter.js units mm to px
        const vectorSetsScaled = vectorSets.map((vectorSet) => {
          return vectorSet.map((vector) => {
            return {
              x: vector.x * scaleFactor,
              y: vector.y * scaleFactor,
            };
          });
        })
        
        console.log("vectorSetsScaled", vectorSetsScaled);
        
        return vectorSetsScaled;
      }


  } catch (error) {
    console.error("Error loading SVG:", error);
    return null;
  }
};

const select = function (root, selector) {
  return Array.prototype.slice.call(root.querySelectorAll(selector));
};


const loadSvg = function(url) {
            return fetch(url)
                .then(function(response) { return response.text(); })
                .then(function(raw) { return (new window.DOMParser()).parseFromString(raw, 'image/svg+xml'); });
            
            };




export { loadSVG, loadSvg, select};
