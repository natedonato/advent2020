const fs = require("fs");
const { parse } = require("path");
const input = fs
  .readFileSync("day9/node/input.txt", "utf8")
  .split("\n")
  .map((el) => parseInt(el));

for (let i = 0; i < input.length; i++) {
  const target = 105950735;
  let sum = 0;
  let min = input[i + 1];
  let max = input[i + 1];

  for (let j = i + 1; j < input.length; j++) {
    const next = input[j];
    sum += next;

    min = Math.min(min, next);
    max = Math.max(max, next);

    if (sum === target) {
      console.log(`min: ${min}, max:${max}, sum: ${min + max}`);
      break;
    }
  }

  if (sum === target) {
    break;
  }
}
