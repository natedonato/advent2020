const fs = require("fs");
let input = fs.readFileSync("day7/node/input.txt", "utf8").split("\r\n");

const ints = "1234567890";

let graph = {};

for (line of input) {
  let parent = line.split(" bags contain ")[0];
  let childUnprocessed = line.split(" bags contain ")[1].split(" ");

  let children = [];

  for (let i = 0; i < childUnprocessed.length; i++) {
    const num = childUnprocessed[i];
    if (ints.includes(num)) {
      let nextChild = childUnprocessed[i + 1] + " " + childUnprocessed[i + 2];
      children.push([nextChild, num]);
    }
  }
  graph[parent] = children;
}

let numBags = -1;
let queue = [["shiny gold", 1]];

while (queue.length > 0) {
  let currNode = queue.shift();
  let [currBag, num] = currNode;

  numBags += num;

  let subBags = graph[currBag];
  subBags.forEach((currentSub) => {
    let [subBag, subNum] = currentSub;
    subNum *= num;
    queue.push([subBag, subNum]);
  });
}

console.log('total bags', numBags);
