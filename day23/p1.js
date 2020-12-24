const fs = require("fs");
let cups = fs
  .readFileSync("day23/input.txt", "utf8")
  .split("")
  .map((el) => parseInt(el));
let current = 0;

function move(cups) {
  console.log("cups: ", cups.join(" "));

  let currentVal = cups[current];
  let pickup = [];
  let target = current + 1;

  for (let i = 0; i < 3; i++) {
    target %= cups.length;
    pickup = [...pickup, ...cups.splice(target, 1)];
  }

  console.log("pick up: ", pickup.join(" "));
  let nextVal = currentVal;
  let nextIdx = cups.indexOf(nextVal - 1);

  while (nextIdx === -1) {
    if (nextVal <= 0) {
      nextVal = 9;
    } else {
      --nextVal;
    }
    nextIdx = cups.indexOf(nextVal);
  }

  console.log("destination: ", cups[nextIdx]);

  cups.splice(nextIdx + 1, 0, ...pickup);
  current = (cups.indexOf(currentVal) + 1) % cups.length;
}

for (let i = 0; i < 100; i++) {
  console.log("-- move", i + 1);
  move(cups);
}

let idx = cups.indexOf(1) + 1;

let output = "";
for (let i = 0; i < cups.length - 1; i++) {
  output += cups[(idx + i) % cups.length];
}

console.log(output);
