const fs = require("fs");
let buses = fs.readFileSync("day13/input.txt", "utf8").split("\r\n")[1];

buses = buses.split(",").map((el) => (el === "x" ? el : parseInt(el)));

let offset = 1;
let lastBus = 1;

function checkTime(time) {
  let currLastBus = 1;
  for (let i = 0; i < buses.length; i++) {
    const bus = buses[i];

    if (bus === "x") {
      continue;
    }

    const currTime = time + i;

    if (currTime % bus === 0) {
      currLastBus = bus;
    }

    if (currTime % bus !== 0) {
      if (lastBus !== currLastBus) {
        offset *= currLastBus;
        lastBus = currLastBus;
      }
      return false;
    }
  }

  return true;
}

let time = 1;

while (checkTime(time) === false) {
  time += offset;

  console.log(time, lastBus, offset);
}

// console.log('\n')
console.log("final time", time);
