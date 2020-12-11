const fs = require("fs");
let input = fs
  .readFileSync("day11/node/input.txt", "utf8")
  .split("\r\n")
  .map((el) => el.split(""));

let colLength = input.length;
let rowLength = input[0].length;
let unchanged = false;

while (!unchanged) {
  let copy = input.map(function (arr) {
    return arr.slice();
  });

  unchanged = true;

  for (let i = 0; i < colLength; i++) {
    for (let j = 0; j < rowLength; j++) {
      if (input[i][j] !== ".") {
        let count = countAdjacent(i, j, input);

        if (count === 0) {
          copy[i][j] = "#";
          if (input[i][j] !== "#") {
            unchanged = false;
          }
        } else if (count >= 5) {
          copy[i][j] = "L";
          if (input[i][j] !== "L") {
            unchanged = false;
          }
        }
      }
    }
  }

  input = copy;
}

let finalcount = 0;

for (let i = 0; i < colLength; i++) {
  for (let j = 0; j < rowLength; j++) {
    if (input[i][j] === "#") finalcount += 1;
  }
}

console.log("finalcount", finalcount);

function countAdjacent(i, j, input) {
  let count = 0;

  for (let k = -1; k <= +1; k++) {
    for (let l = -1; l <= 1; l++) {
      //skip center
      if (k === 0 && l === 0) {
        continue;
      }

      let [offsetX, offsetY] = [k, l];
      let next = ".";
      let [x, y] = [i, j];

      while (next === ".") {
        x += offsetX;
        y += offsetY;
        if (x < 0 || x >= colLength || y < 0 || y >= rowLength) {
          break;
        }
        next = input[x][y];
      }

      if (next === "#") {
        count += 1;
      }
    }
  }
  return count;
}
