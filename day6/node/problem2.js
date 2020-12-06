const fs = require("fs");
let input = fs.readFileSync("day6/node/input.txt", "utf8")

input = input.split("\r\n\r\n");
input = input.map((el) => el.replace(/\r\n/g, " "));

console.log(input);
let count = 0;

for(let line of input){
    let numPeople = line.split(' ').length;
    let counts = {};
    let subcount = 0
    line = line.replace(/ /g, "")
    for(let i = 0; i < line.length; i++){
        const char = line[i];
        if(counts[char] === undefined){
            counts[char] = 0
        }

        counts[char] += 1;
        if(counts[char] === numPeople){
            subcount += 1
        }
    }
    console.log(line, subcount);
    count += subcount
}

console.log(count);