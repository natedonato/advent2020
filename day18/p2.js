const fs = require("fs");
let input = fs
  .readFileSync("day18/input.txt", "utf8")
  .split("\r\n")
  .map((el) => el.replace(/\(/g, "( ").replace(/\)/g, " )"));

// new strat:
// go through, add stuff to the stack
// if parenthesis are encountered still do the recursive jawn
// once you reach the end or the closing point, THEN evaluate the stack in two passes:
// first squash all the addition, then squash all the multiplication

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
    let parsed = parseInt(el);

    if (!isNaN(parsed)) {
      el = parsed;
    }

    if (el === "(") {
      let [val, length] = evaluate(expression.slice(i + 1));
      el = val;
      i += length + 1;
    } else if (el === ")") {
      let val = solveFlat(stack);
      return [val, i];
    }

    stack.push(el);
  }

  let val = solveFlat(stack);

  return [val, expression.length];
}

function solveFlat(expression) {
  for (let i = 0; i < expression.length; i++) {
    if (expression[i] === "+") {
      let previous = expression[i - 1];
      let next = expression[i + 1];
      let sum = previous + next;

      expression.splice(i - 1, 3, sum);
      i -= 1;
    }
  }

  for (let i = 0; i < expression.length; i++) {
    if (expression[i] === "*") {
      let previous = expression[i - 1];
      let next = expression[i + 1];
      let product = previous * next;

      expression.splice(i - 1, 3, product);
      i -= 1;
    }
  }

  return expression[0];
}
