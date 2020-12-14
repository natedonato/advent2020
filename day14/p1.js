const fs = require("fs");
let input = fs.readFileSync("day14/input.txt", "utf8").split('\r\n')

let mem = [];

let mask;

for(line of input){
    let words = line.split(" ");

    if(words[0] === 'mask'){
        mask = words[2];
        continue;
    }else{
        const address = words[0].slice(4, words[0].length - 1);
        let num = parseInt(words[2]).toString(2);

        while(num.length < 36){
            num = '0' + num;
        }

        num = num.split('');

        for(let i = 0; i < mask.length; i++){
            let char = mask[i]
            if(char !== 'X'){
                num[i] = char;
            }
        }

        mem[address] = parseInt(num.join(''), 2)
    }

}

console.log(mem.reduce((acc, el) => {
    if(el !== undefined){
        return acc + el
    }else{
        return acc
    }
}))
