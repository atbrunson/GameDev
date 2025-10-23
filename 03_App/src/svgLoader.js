// function that will supply a vector set of points from an svg file

import { Svg, Common, Vector, Vertices } from "matter-js";
import { decomp } from "poly-decomp";

Common.setDecomp(decomp);

/**
 * Fetches an SVG from a given URL and parses it into a DOM object.
 * 
 * @param {string} url - The URL of the SVG file to fetch.
 * @returns {Promise<Document>} - A parsed SVG document.
 * @throws {Error} - If there is an error fetching or parsing the SVG.
 */
// async function fetchSvg(url) {
//   try {
//     await fetch(url).then((response) => response.text());
//   } catch (error) {
//     "Error: Failed to fetch SVG - " + error;
// .then((svg) => {
//   svg = new DOMParser()
//   .parseFromString(response.text(), "image/svg+xml")
//   .documentElement;
// });
  
//   return svg
// }

// retrieve svg and parse into string
const loadSvg = async (url) => {
  try {
    const response = await fetch(url);
    const svgText = await response.text();
    const parsedSVG = await new window.DOMParser(svgText)
      .parseFromString(svgText, "image/svg+xml").documentElement.querySelectorAll("path")
      .then((value) => { console.log(value)});
        
      // }).forEach(path => {
      //  path.getAttribute("d")});
      

    return parsedSVG;
  }
    catch (error) { console.error(error);}

  } 
    



/**
 * Selects an element from the given element using the given selector.
 * 
 * @param {Element} element - The element to search for the selector.
 * @param {string} selector - The CSS tag selector to search for.
 * @returns {Promise(Element)} - A promise that resolves with the selected element.
 * @throws {Error} - If there is an error selecting the element.
 */



function getAttribute(element, attribute) {
  try { new Promise((resolve) => element.getAttribute(attribute))
    
    return
  } catch (error) {
    "Error: " + element + " failed to get" + attribute + error;
  }
  return null;
}




export {  loadSvg, getAttribute };
