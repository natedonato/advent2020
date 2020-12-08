const fs = require("fs");
const originalInput = fs
  .readFileSync("day8/node/input.txt", "utf8")
  .split("\n");

class Computer {
  constructor(input) {
    this.input = input;
    this.accumulator = 0;
    this.currentInstruction = 0;
    this.lastInstruction = input.length;
  }

  runComputer() {
    let running = true;
    let result = false;

    while (running) {
      let currentLine = this.input[this.currentInstruction];

      if (this.currentInstruction === this.lastInstruction) {
        console.log("Final accumulator", this.accumulator);
        result = true;
        running = false;
      } else {
        running = this.executeLine(currentLine);
      }
    }
    return result;
  }

  executeLine(line) {
    let [operation, argument] = line.split(" ");
    this.input[this.currentInstruction] = "X +0";

    switch (operation) {
      case "jmp":
        this.currentInstruction += parseInt(argument);
        break;
      case "X":
        return false;
      case "acc":
        this.accumulator += parseInt(argument);
      case "nop":
      default:
        this.currentInstruction += 1;
    }
    return true;
  }
}

for (let i = 0; i < originalInput.length; i++) {
  const inputCopy = [...originalInput];

  let line = inputCopy[i];
  let [operation, argument] = line.split(" ");

  if (operation !== "nop" && operation !== "jmp") {
    continue;
  } else if (operation === "nop") {
    inputCopy[i] = "jmp " + argument;
  } else {
    inputCopy[i] = "nop" + argument;
  }

  const comp = new Computer(inputCopy);
  if (comp.runComputer() === true) {
    break;
  }
}
