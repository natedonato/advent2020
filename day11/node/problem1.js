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
        } else if (count >= 4) {
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
  for (let k = i - 1; k <= i + 1; k++) {
    for (let l = j - 1; l <= j + 1; l++) {
      if (
        k >= 0 &&
        k < colLength &&
        l >= 0 &&
        l <= rowLength &&
        !(k === i && l === j)
      ) {
        if (input[k][l] === "#") {
          count += 1;
        }
      }
    }
  }
  return count;
}
