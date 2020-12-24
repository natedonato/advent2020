const fs = require("fs");
let input = fs.readFileSync("day24/input.txt", "utf8").split("\r\n");

const map = {
  w: [-1, 0],
  e: [1, 0],
  nw: [-1, 1],
  ne: [0, 1],
  sw: [0, -1],
  se: [1, -1],
};

const flipped = {};
let count = 0;

for (const line of input) {
  let currentPos = [0, 0];

  for (let i = 0; i < line.length; i++) {
    let direction = line[i];
    if (direction === "s" || direction === "n") {
      i++;
      direction += line[i];
    }

    currentPos = [
      currentPos[0] + map[direction][0],
      currentPos[1] + map[direction][1],
    ];
  }

  let key = currentPos.join(",");
  if (!flipped[key]) {
    flipped[key] = true;
    ++count;
  } else {
    flipped[key] = false;
    --count;
    }
}

console.log(flipped);
