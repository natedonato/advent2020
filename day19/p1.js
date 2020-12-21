const fs = require("fs");
let input = fs
  .readFileSync("day19/smallinput.txt", "utf8")
  .split("\r\n")

let rules = {};
let messages = [];

for(let i = 0; i < input.indexOf(''); i++){
  let [key, val] = input[i].split(': ');

  rules[key] = val.split("|")
};

for(let i = input.indexOf('') + 1; i < input.length; i++){
  messages.push(input[i]);
};


