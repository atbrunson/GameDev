/**
 * !!UNTESTED CODE!!
 *
 * PURPOSE: Integrate PressureSwich's Funtionality into Matter.js
 * TODO:
 * - Composites.ring method -->
 * - Composite.closeChain method --> close existing chain
 * - Test extensions
 *
 * Extensions to the 'Matter' namespace module.
 * @class Extensions
 */

/**
 * The 'Composites.ring' method adds factory to create composites inline within
 * a specified shape or closed path.
 */

module.exports = Composites;

let Composite = require("../body/Composite");
let Constraint = require("../constraint/Constraint");
let Common = require("../core/Common");
let Body = require("../body/Body");
let Bodies = require("./Bodies");

(function () {
  /**
   * Create a new composite containing bodies created in the callback along the parameter of a path.
   * This function uses the body's bounds to prevent overlaps.
   * @method ring
   * @param {number} x Center position in X.
   * @param {number} y Center position in Y.
   * @param {number} number Number of  bodies to in the ring
   * @param {number} diameter Diameter of the ring
   * @param {function} callback body creation function
   * @return {composite} A new composite containing objects created in the callback
   */
  Composites.ring = function (x, y, number, diameter, callback) {
    let ring = Composite.create({ label: "Ring" }),
      centerX = x,
      centerY = y,
      ringAngle = (2 * Math.PI) / number,
      ringDia = diameter,
      segLength = ringDia * Math.sin(ringAngle / 2),
      lastBody,
      i = 0;

    let body = callback(centerX, centerY, segLength, ringAngle);
    for (let i = 0; i < number; i++) {
      if (body) {
        // find body height and width
        let bodyHeight = body.bounds.max.y - body.bounds.min.y,
          bodyWidth = body.bounds.max.x - body.bounds.min.x;

        // ensure segLength is less than body normalized cross length
        if (segLength > Math.sqrt(Math.pow(bodyHeight, 2) + Math.pow(bodyWidth, 2))) {
          // place the next body
          body.position.x = centerX + ringDia * Math.cos(ringAngle * i);
          body.position.y = centerY + ringDia * Math.sin(ringAngle * i);
        } else {
          //update the diameter if bodies won't fit
          ringDia = null;
        }
      }
      return ring;
    }
  };
  
  function smin(a, b, k) {
    return (a + b - Math.abs(a - b) * k) / (1 + k);
  }
  
  // Example usage
  let result = smin(1.0, 3.0, 0.01);
  console.log(result); // Outputs a smoothly blended value
  
})();