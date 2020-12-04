const fs = require("fs");
const { pid } = require("process");
let input = fs.readFileSync("day4/node/input.txt", "utf8");
input = input.split("\n\n");
input = input.map((el) => el.replace(/\n/g, " "));
const reqFields = ["byr", "iyr", "eyr", "hgt", "hcl", "ecl", "pid"];
let numValid = 0;
const validEyes = ["amb", "blu", "brn", "gry", "grn", "hzl", "oth"];
const hex = '0123456789abcdef'

let checkHCL = (color) => {
  let valid = true;
  color.slice(1).split('').forEach(char => {
    if(!hex.includes(char)){
      valid = false
    }
  })
  return valid
}

for (passport of input) {
  let items = passport.split(" ");

  const fields = {};

  items.forEach((item) => {
    let [field, value] = item.split(":");
    fields[field] = value;
  });
  
  let valid = true;
  
  reqFields.forEach((reqField) => {
    if (fields[reqField] === undefined) {
      valid = false;
    }else{
      if (validate(reqField, fields[reqField]) !== true) {
        valid = false;
      }
    }
  });

  if (valid === true) {
    numValid += 1;
  }

  console.log('totalValid', numValid);

  console.log('\n')
}

console.log(numValid)


function validate(key, value){
  console.log("key:", key, "value:", value)
switch (key) {
  case 'byr':
    if(parseInt(value) >= 1920 && parseInt(value) <=2002){
      console.log('byr valid: ', value)
      return true;
    }else{
      console.log("byr INVALID: ", value);
      return false;
    }
  case 'iyr':
    if(parseInt(value) >= 2010 && parseInt(value) <=2020){
      console.log("iyr valid: ", value);
      return true;
    }else{
      console.log("iyr INVALID: ", value);
      return false;
    }
  case 'eyr':
   if(parseInt(value) >= 2020 && parseInt(value) <=2030){
      console.log("eyr valid: ", value);
      return true;
    }else{
      console.log("eyr INVALID: ", value);
      return false;
    }
  case 'hgt':
    let type = value.substr(-2, 2);
    let [lowerbound, upperbound] = [150, 193]
    if(type === 'in'){
      [lowerbound, upperbound] = [59, 76]
    }
    if(parseInt(value) >= lowerbound && parseInt(value) <= upperbound){
      console.log("hgt valid: ", value);
      return true
    }else{
      console.log("hgt INVALID: ", value);
      return false;
    }
  case 'ecl':
    if(validEyes.includes(value)){
      console.log("ecl valid:", value)
      return true
    }else{
      console.log("ecl INVALID: ", value);
      return false;
    }
  case 'hcl': 
    if(value[0] === "#" && value.length === 7 && checkHCL(value) === true){
      console.log("hcl valid:", value)
      return true
    }else{
      console.log("hcl INVALID: ", value);
      return false;
    }
  case 'pid':
    if(value.length === 9 && !isNaN(parseInt(value))){
      console.log("pid valid:", value)
      return true
    }else{
      console.log("pid INVALID: ", value);
      return false;
    }
  default:
    console.log('unexpected key', key);
    return true;
  }
}
