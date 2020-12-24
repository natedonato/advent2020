const fs = require("fs");
let input = fs
  .readFileSync("day23/input.txt", "utf8")
  .split("")
  .map((el) => parseInt(el));

class Node {
  constructor(val, next) {
    this.val = val;
    this.next = next ? next : null;
  }
}

let map = {};

class LinkedList {
  constructor(node) {
    this.head = node;
    this.tail = node;
    this.pickedUpValues = [];
    this.pickedUp = null;
    this.length = 0;
  }

  add(node) {
    if (!this.head) {
      this.head = node;
      this.tail = node;
    } else {
      this.tail.next = node;
      this.tail = node;
    }
    this.length += 1;
    map[this.tail.val] = this.tail;
  }

  pickup(node) {
    this.pickedUp = node.next;
    let current = node;
    let values = [];

    for (let i = 0; i < 3; i++) {
      current = current.next;
      this.pickedUpValues.push(current.val);
    }

    node.next = current.next;
    current.next = null;

    // console.log("pick up:", this.pickedUpValues);
  }

  return(node) {
    let returnVal = node.val - 1;
    if (returnVal === 0) {
      returnVal = this.length;
    }

    while (this.pickedUpValues.includes(returnVal)) {
      returnVal -= 1;
      if (returnVal === 0) {
        returnVal = this.length;
      }
    }

    // console.log("destination:", returnVal);
    let returnNode = map[returnVal];
    let returnNext = returnNode.next;

    returnNode.next = this.pickedUp;
    while (this.pickedUp.next !== null) {
      this.pickedUp = this.pickedUp.next;
    }

    this.pickedUp.next = returnNext;
    this.pickedUp = null;
    this.pickedUpValues = [];
  }
}

const cups = new LinkedList();

for (const cup of input) {
  cups.add(new Node(cup));
}

for (let i = Math.max(...input) + 1; i < 1000001; i++) {
  cups.add(new Node(i));
}

cups.tail.next = cups.head;

let pointer = cups.head;

function move(pointer) {
  cups.pickup(pointer);
  cups.return(pointer);
  // print(pointer);
}

function print(pointer) {
  let tempPointer = pointer;
  let str = "";
  for (let i = 0; i < 10; i++) {
    str += tempPointer.val + " ";
    tempPointer = tempPointer.next;
  }
  console.log("\n");
  console.log("cups", str);
}

for (let i = 0; i < 10000000; i++) {
  move(pointer);
  pointer = pointer.next;
}

pointer = map[1];

console.log(pointer.next.val * pointer.next.next.val);
