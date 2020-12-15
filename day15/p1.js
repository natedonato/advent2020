const fs = require("fs");
let input = fs.readFileSync("day15/input.txt", "utf8").split(',')

let mem = [];

for(let i = 0; i < 2020; i++){
    if(i < input.length){
        mem.push(parseInt(input[i]))
    }else{
        let last = mem.pop()
        let lastidx = mem.lastIndexOf(last)
        
        if(lastidx !== - 1){
            next = i - 1 - lastidx;
        }else{
            next = 0;
        }

        mem.push(last);
        mem.push(next)
    
    }

}

console.log(mem[mem.length - 1]);

