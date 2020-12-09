const fs = require("fs");
const { parse } = require("path");
const input = fs
  .readFileSync("day9/node/input.txt", "utf8")
  .split("\n")
  .map((el) => parseInt(el));

const preamble = 25;

let i = preamble;

for (let i = preamble; i < input.length; i++) {
  const slice = input.slice(i - preamble, i);
  const target = input[i];
  const seen = {};

  let valid = false;

  for (let j = 0; j < slice.length; j++) {
    const current = slice[j];
    const dif = target - current;
    if (seen[dif] === true) {
      valid = true;
      break;
    } else {
      seen[current] = true;
    }
  }

  if (valid === false) {
    console.log(target);
    break;
  }
}
