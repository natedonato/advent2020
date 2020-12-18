const fs = require("fs");
let input = fs
  .readFileSync("day18/input.txt", "utf8")
  .split("\r\n")
  .map((el) => el.replace(/\(/g, "( ").replace(/\)/g, " )"));

let sum = 0;
for (line of input) {
  let expression = line.split(" ");
  sum += evaluate(expression)[0];
}

console.log(sum);

function evaluate(expression) {
  let stack = [];
  for (let i = 0; i < expression.length; i++) {
    let el = expression[i];

    if (el === "(") {
      let [val, length] = evaluate(expression.slice(i + 1));
      el = val;
      i += length + 1;
    } else if (el === ")") {
      val = stack[0];
      return [val, i];
    }

    if (el === "+" || el === "*") {
      stack.push(el);
    } else {
      el = parseInt(el);
      let prev = stack.pop();

      if (prev === "+") {
        stack.push(stack.pop() + el);
      } else if (prev === "*") {
        stack.push(stack.pop() * el);
      } else {
        stack.push(el);
      }
    }
  }

  val = stack[0];
  return [val, expression.length];
}
