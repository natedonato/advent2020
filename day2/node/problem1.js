const fs = require('fs');
const input = fs.readFileSync('day2/node/input.txt', "utf8").split('\n').map(el => el.split(' '));

let numValid = 0;

for(line of input){
    const [rule, char, password] = line;
    const [lowerbound, upperbound] = rule.split('-');
    const counterChar = char[0];

    let count = 0;
    for(character of password.split('')){
        if(character === counterChar){
            ++count;
        }
    }

    if( lowerbound <= count && count <= upperbound){
        ++numValid;
    }
}

console.log(numValid);