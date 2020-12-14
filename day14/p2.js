const fs = require("fs");
let input = fs.readFileSync("day14/input.txt", "utf8").split("\r\n");

let mem = {};

let mask;

for (line of input) {
  let words = line.split(" ");

  if (words[0] === "mask") {
    mask = words[2];
    continue;
  } else {
      
    let address = words[0].slice(4, words[0].length - 1);
    address = parseInt(address).toString(2);
    let value = parseInt(words[2]);

    while (address.length < 36) {
      address = "0" + address;
    }

    address = address.split("");

    let count = 0;

    let xLocations = [];

    for (let i = 0; i < mask.length; i++) {
      let char = mask[i];
      if (char !== "0") {
        address[i] = char;
      }
      if (char === "X") {
        count += 1;
        xLocations.push(i);
      }
    }

    let binary = [];

    for (let i = 0; i < count; i++) {
      binary.push(1);
    }

    binary = parseInt(binary.join(""), 2);

    let addresses = [];

    while (binary >= 0) {
      binary = binary.toString(2);
      let binaryCopy = binary.split("");

      while (xLocations.length > binaryCopy.length) {
        binaryCopy.unshift(0);
      }

      xLocations.forEach((xLocation, i) => {
        address[xLocation] = binaryCopy.shift();
      });

      addresses.unshift(parseInt(address.join(""), 2));
      binary = parseInt(binary, 2) - 1;
    }

    addresses.forEach((addy) => (mem[addy] = value));

  }
}

console.log(Object.values(mem).reduce((acc, el) => acc + el));
