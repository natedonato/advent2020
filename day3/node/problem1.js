const fs = require("fs");
const input = fs
  .readFileSync("day3/node/input.txt", "utf8")
  .split("\r\n")
  .map((el) => el.split(""));

let horizontalLength = input[0].length;
let current = [0, 0];
let treeCount = 0;

while (current[0] < input.length) {
  let [row, column] = current;

  if (input[row][column] === "#") {
    treeCount += 1;
  }
  current = [current[0] + 1, (current[1] + 3) % horizontalLength];
}

console.log(treeCount);
