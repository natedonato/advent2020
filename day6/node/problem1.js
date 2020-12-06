const fs = require("fs");
let input = fs.readFileSync("day6/node/input.txt", "utf8")

input = input.split("\r\n\r\n");
input = input.map((el) => el.replace(/\r\n/g, " "));

console.log(input);
let count = 0;

for(line of input){
    let subcount = 0;
    line = line.split('')
    line.forEach((char, idx) =>{
        if(line.indexOf(char) === idx){
            subcount += 1;
        }
    })

    console.log(subcount)
    count += subcount

}

console.log(count);