const fs = require("fs");
let input = fs.readFileSync("day15/input.txt", "utf8").split(",");

let mem = new Map();

let current;
let last;

for (let i = 0; i < 30000000; i++) {
  if(i < input.length - 1){
    mem.set(parseInt(input[i]), i + 1);
  }else if (i === input.length - 1){
    current = parseInt(input[i])
  }
  
  else{
    last = current;

    mem.has(current) ? current = i - mem.get(current) : current = 0; 
    mem.set(last, i)
  }


}

console.log(current);