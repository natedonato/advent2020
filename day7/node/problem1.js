const fs = require("fs");
let input = fs.readFileSync("day7/node/input.txt", "utf8").split("\r\n");

const ints = "1234567890";

let parents = {};

for (line of input) {
  let parent = line.split(" bags contain ")[0];
  let childUnprocessed = line.split(" bags contain ")[1].split(" ");

  let children = [];

  for (let i = 0; i < childUnprocessed.length; i++) {
    const word = childUnprocessed[i];
    if (ints.includes(word)) {
      let nextChild = childUnprocessed[i + 1] + " " + childUnprocessed[i + 2];
      children.push(nextChild);
    }
  }

  for (child of children) {
    if (parents[child] === undefined) {
      parents[child] = [];
    }
    if (parents[parent] === undefined) {
      parents[parent] = [];
    }
    if (parents[child] && !parents[child].includes(parent))
      parents[child].push(parent);
  }
}

let numValid = -1;
let valid = {};
let queue = ["shiny gold"];

while (queue.length > 0) {
  let currNode = queue.shift();

  if (valid[currNode] !== true) {
    numValid += 1;
    valid[currNode] = true;
  }
  let parentNodes = parents[currNode];

  parentNodes.forEach((parent) => {
    queue.push(parent);
  });
}

console.log("number of valid", numValid);
