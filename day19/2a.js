const fs = require("fs");
let input = fs.readFileSync("day19/input.txt", "utf8");

let [ruleset, list] = input.split("\n\n");
list = list.split("\n");

ruleset = ruleset.split("\n");
const rules = {};

for (const line of ruleset) {
  let [key, val] = line.split(": ");
  rules[key] = val;
}

function process(input_strings, current_rule) {
  // check type of input
  let type;
  let rule = rules[current_rule];
  if (rule[0] === '"') {
    type = "char";
  } else if (rule.split("|").length > 1) {
    type = "or";
  } else {
    type = "list";
  }

  switch (type) {
    case "char":
      let c = rule[1];
      return evalChar(input_strings, c);
      break;
    case "list":
      let steps = rule.split(" ");
      return evalList(input_strings, steps);
      break;
    case "or":
      return evalOr(input_strings, rule)
      break;
  }
}


function evalChar(input_strings, c){
  let output = [];

  for(const input_string of input_strings)
    if (input_string[0] === c) {
      output.push(input_string.slice(1));
    } else {
      // don't add 
    }

  if(output.length > 0){
    return output;
  }else{
    return false;
  }
}

function evalList(input_strings, steps) {
  for (let i = 0; i < steps.length; i++) {
    let next_rule = steps[i];
    input_strings = process(input_strings, next_rule);
    if (input_strings === false) {
      return false;
    }
  }
  return input_strings;
}

function evalOr(input_string, rule){
  let [s1, s2] = rule.split(" | ");
  let r1 = evalList(input_string, s1.split(" "));
  let r2 = evalList(input_string, s2.split(" "));
  if (r1 !== false && r2 !== false) {
    return r1.concat(...r2);
  } else if(r1 !== false){
    return r1
  }else{
    return r2;
  }
}

let count = 0;

for (const item of list) {
  let result = process([item], 0)
  
  if (result && result.includes("")) {
    count += 1;
  }
}
console.log(count);
