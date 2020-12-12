const fs = require("fs");
let input = fs.readFileSync("day12/node/input.txt", "utf8").split("\r\n");

const EAST = [1, 0];
const NORTH = [0, 1];
const SOUTH = [0, -1];
const WEST = [-1, 0];

const RIGHT = [EAST, SOUTH, WEST, NORTH];
const LEFT = [EAST, NORTH, WEST, SOUTH];

let currDirection = EAST;

let coord = [0, 0];

let map = {
  N: NORTH,
  S: SOUTH,
  E: EAST,
  W: WEST,
  R: RIGHT,
  L: LEFT,
};

for (line of input) {
  let dir = line[0];
  let dist = line.substr(1);
  if ("LR".includes(dir)) {
    const steps = dist / 90;
    const ARR = map[dir];
    const oldIdx = ARR.indexOf(currDirection);
    const newIdx = (oldIdx + steps) % 4;
    currDirection = ARR[newIdx];
  } else {
    let direction;
    if ("NSEW".includes(dir)) {
      direction = map[dir];
    } else {
      direction = currDirection;
    }

    let [x, y] = direction;
    x *= dist;
    y *= dist;
    coord = [coord[0] + x, coord[1] + y];
  }
}

let total = Math.abs(coord[0]) + Math.abs(coord[1]);

console.log(total);
