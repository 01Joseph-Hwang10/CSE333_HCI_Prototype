// From: https://codepen.io/falldowngoboone/pen/PwzPYv

/**
 * @type {Array} of @type {Dot} objects
 */
let dots = [];

/**
 * Object used to track the X and Y position
 * of the mouse, set with a mousemove event listener below
 */
let mouse = {
  x: 0,
  y: 0,
};

const MAX_SIZE = 20;
const MIN_SIZE = 10;

/**
 * The Dot object used to scaffold the dots
 */
class Dot {
  constructor() {
    this.x = 0;
    this.y = 0;
    this.size = MIN_SIZE;
    this.node = Dot.createNode();
  }

  /**
   * @returns {HTMLDivElement}
   */
  static createNode() {
    const node = document.createElement("div");
    node.className = "trail";
    node.style.position = "absolute";
    node.style.background = "red";
    node.style.zIndex = 100000;
    node.style.opacity = 0.4;
    const body = document.querySelector("body");
    body.appendChild(node);
    return node;
  }

  static calculateSize(velocity) {
    return Math.max((1 / (velocity + 1)) * MAX_SIZE, MIN_SIZE);
  }

  /**
   * Sets the position of the object's <div> node
   * @returns {void}
   */
  draw() {
    this.node.style.width = this.size + "px";
    this.node.style.height = this.size + "px";
    this.node.style.borderRadius = this.size / 2 + "px";
    this.node.style.left = this.x + "px";
    this.node.style.top = this.y + "px";
  }
}

/**
 * Between 0 and 1
 * The closer to 1, the longer the trail will be
 */
const DELAY_RATE = 0.8;
const N_DOTS = 24;

/**
 * Creates the Dot objects, populates the dots array
 */
function populateDots() {
  for (let i = 0; i < N_DOTS; i++) {
    const dot = new Dot();
    dots.push(dot);
  }
}

/**
 * Calculates the velocity between two points
 * @param {number} x1
 * @param {number} y1
 * @param {number} x2
 * @param {number} y2
 * @returns {number}
 */
function velocity(x1, y1, x2, y2) {
  return Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
}

// This is the screen redraw function
function draw() {
  // Make sure the mouse position is set everytime
  // draw() is called.
  let x = mouse.x;
  let y = mouse.y;
  let size = MIN_SIZE;

  // This loop is where all the 90s magic happens
  dots.forEach(function (dot, index, dots) {
    let nextDot = dots[index + 1] || dots[0];

    dot.x = x;
    dot.y = y;
    dot.size = size;
    dot.draw();
    x += (nextDot.x - dot.x) * DELAY_RATE;
    y += (nextDot.y - dot.y) * DELAY_RATE;
    size = Dot.calculateSize(velocity(x, y, nextDot.x, nextDot.y));
  });
}

// animate() calls draw() then recursively calls itself
// everytime the screen repaints via requestAnimationFrame().
function animate() {
  draw();
  requestAnimationFrame(animate);
}

function updateCursor(x, y) {
  mouse.x = x;
  mouse.y = y;
}

function attachMousemoveListener() {
  window.addEventListener("mousemove", (event) => {
    const pageX = event.pageX;
    const pageY = event.pageY;
    updateCursor(pageX, pageY);
  });
}
