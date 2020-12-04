const fs = require("fs");
let input = fs.readFileSync("day4/node/input.txt", "utf8");

input = input.split('\n\n');

input = input.map((el) => el.replace(/\n/g, " "));

const reqFields = ['byr', 'iyr', 'eyr', 'hgt', 'hcl', 'ecl', 'pid'];

let numValid = 0;

for(passport of input){
  let items = passport.split(' ');

  const fields = {};

  items.forEach(item => {
    let [field, value] = item.split(':');
    fields[field] = value;
  })

  let valid = true;
  reqFields.forEach(reqField => {
    if(fields[reqField] === undefined){
      valid = false;
    }
  })

  if(valid===true){
    numValid += 1;
  }
}

console.log(numValid);