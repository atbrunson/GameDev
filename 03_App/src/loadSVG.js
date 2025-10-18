

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

// Select style attributes of path
// const 


export { loadSvgPaths, loadSvg, select };
