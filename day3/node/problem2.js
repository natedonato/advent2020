const fs = require("fs");
const input = fs
  .readFileSync("day3/node/input.txt", "utf8")
  .split("\r\n")
  .map((el) => el.split(""));

let horizontalLength = input[0].length;

let offsets = [
  [1, 1],
  [1, 3],
  [1, 5],
  [1, 7],
  [2, 1],
];

let treeQuotient = 1;

for (offset of offsets) {
  let [offsetRow, offsetCol] = offset;
  let current = [0, 0];
  let treeCount = 0;

  while (current[0] < input.length) {
    let [row, column] = current;

    if (input[row][column] === "#") {
      treeCount += 1;
    }

    current = [row + offsetRow, (column + offsetCol) % horizontalLength];
  }
  treeQuotient *= treeCount;
}

console.log("total quotient:", treeQuotient);
