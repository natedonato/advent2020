const fs = require('fs');
const input = fs.readFileSync('day2/node/input.txt', "utf8").split('\n').map(el => el.split(' '));

let numValid = 0;

for(line of input){
    let [rule, char, password] = line;
    const [position1, position2] = rule.split('-');
    char = char[0];
    password = password.split('');
    const str1 = password[position1 - 1];
    const str2 = password[position2 - 1]; 
  
    if((str1 === char || str2 === char) && str1 !== str2){
        ++numValid;
    }

}

console.log(numValid);