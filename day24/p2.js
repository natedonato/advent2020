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

let maxDist = 0;
let flipped = {};
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

  maxDist = Math.max(maxDist, ...currentPos);

  let key = currentPos.join(",");
  if (!flipped[key]) {
    flipped[key] = true;
    ++count;
  } else {
    flipped[key] = false;
    --count;
  }
}

maxDist += 1;

//flipped: true is black

for (let day = 0; day < 100; day++) {
  let nextFlipped = Object.assign({}, flipped);

  for (let i = -maxDist; i <= maxDist; i++) {
    for (let j = -maxDist; j <= maxDist; j++) {
      let neighbors = neighborCount(i, j);

      let coord = i + "," + j;

      if (flipped[coord] && (neighbors === 0 || neighbors > 2)){
        nextFlipped[coord] = false;
        --count;
      } else if (!flipped[coord] && neighbors === 2) {
        nextFlipped[coord] = true;
        ++count;
      }
    }
  }
  maxDist += 1;
  flipped = nextFlipped
}

console.log(count);


function neighborCount(x, y) {
  let neighbors = [];

  Object.values(map).forEach((offset) => {
    neighbors.push([x + offset[0], y + offset[1]].join(","));
  });

  let neighborCount = 0;

  for (const neighbor of neighbors) {
    if (flipped[neighbor] === true) {
      neighborCount += 1;
    }
  }
  return neighborCount;
}