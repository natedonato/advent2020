const fs = require("fs");
let input = fs.readFileSync("day10/node/input.txt", "utf8").split("\r\n").map(el => parseInt(el)).sort((a,b) => a - b);

input.push(input[input.length -1] + 3)
input.unshift(0);

let difs = {1: 0, 2:0, 3:0 };

for(let i = 0; i < input.length - 1; i++){
    const dif = input[i+1] - input[i];

    difs[dif] += 1;
}

console.log(difs);

console.log(difs[1] * difs[3]);