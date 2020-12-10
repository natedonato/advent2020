const fs = require("fs");
let input = fs.readFileSync("day10/node/input.txt", "utf8").split("\r\n").map(el => parseInt(el)).sort((a,b) => a - b);
input.push(input[input.length -1] + 3)



let possibilities = Array(input[input.length -1]).fill(0);
possibilities[0] = 1;

for(let i = 0; i < input.length; i++){
    const target = input[i];
    
    let prev = [possibilities[target-3], possibilities[target-2], possibilities[target-1]];

    if(i < 3){
        prev = prev.map(el => el === undefined ? 0 : el);
    }

    const currentPossibilities = prev.reduce((a,el)=> a+el)
    possibilities[target] = currentPossibilities;
}

console.log(possibilities.pop());