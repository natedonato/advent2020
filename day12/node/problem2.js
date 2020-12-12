const fs = require("fs");
let input = fs.readFileSync("day12/node/input.txt", "utf8").split("\r\n");

const EAST = [1, 0];
const NORTH = [0, 1];
const SOUTH = [0, -1];
const WEST = [-1, 0];

let currDirection = EAST;

let coord = [0, 0];
let waypoint = [10, 1];

let map = { N: NORTH, S: SOUTH, E: EAST, W: WEST };

for (line of input) {
  let dir = line[0];
  let dist = line.substr(1);

  if ("NSEW".includes(dir)) {
    direction = map[dir];
    let [x, y] = direction;
    x *= dist;
    y *= dist;
    waypoint = [waypoint[0] + x, waypoint[1] + y];
  } else if (dir === "R") {
    for (let i = 0; i < (dist / 90) % 4; i++) {
      waypoint = [waypoint[1], -waypoint[0]];
    }
  } else if (dir === "L") {
    for (let i = 0; i < (dist / 90) % 4; i++) {
      waypoint = [-waypoint[1], waypoint[0]];
    }
  } else if (dir === "F") {
    for (let i = 0; i < dist; i++) {
      coord = [coord[0] + waypoint[0], coord[1] + waypoint[1]];
    }
  }
}

let total = Math.abs(coord[0]) + Math.abs(coord[1]);

console.log(total);
