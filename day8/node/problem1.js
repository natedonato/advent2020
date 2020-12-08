const fs = require("fs");
const input = fs.readFileSync("day8/node/input.txt", "utf8").split("\n");

class Computer {
  constructor(input) {
    this.accumulator = 0;
    this.currentInstruction = 0;
  }

  runComputer() {
    let currentLine = input[this.currentInstruction];
    if (this.executeLine(currentLine) === true) {
      this.runComputer();
    }
  }

  executeLine(line) {
    let [operation, argument] = line.split(" ");
    input[this.currentInstruction] = "X +0";

    switch (operation) {
      case "jmp":
        this.currentInstruction += parseInt(argument);
        break;
      case "X":
        console.log("Final accumulator", this.accumulator);
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

const comp = new Computer(input);
comp.runComputer();
