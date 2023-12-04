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

function process(input_string, current_rule) {
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
      if (input_string[0] === c) {
        return input_string.slice(1);
      } else {
        return false;
      }
      break;
    case "list":
      let steps = rule.split(" ");
      return evalList(input_string, steps);
      break;
    case "or":
      let [s1, s2] = rule.split(" | ");
      let r1 = evalList(input_string, s1.split(" "));
      if (r1 !== false) {
        return r1;
      } else {
        return evalList(input_string, s2.split(" "));
      }
      break;
  }
}

function evalList(input_string, steps) {
  // console.log(input_string,steps)
  for (let i = 0; i < steps.length; i++) {
    let next_rule = steps[i];
    input_string = process(input_string, next_rule);
    if (input_string === false) {
      return false;
    }
  }
  return input_string;
}
let count = 0;

for (const item of list) {
  if(process(item, 0) === ""){
    count += 1;
  };
}
console.log(count)