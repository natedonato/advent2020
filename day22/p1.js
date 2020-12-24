const fs = require("fs");
let input = fs.readFileSync("day22/input.txt", "utf8").split("\r\n");

let deck1 = input.slice(1, 26).map((el) => parseInt(el));
let deck2 = input.slice(28, 54).map((el) => parseInt(el));

while (deck1.length > 0 && deck2.length > 0) {
  let c1 = deck1.shift();
  let c2 = deck2.shift();

  // console.log("p1 plays", c1);
  // console.log("p2 plays", c2);

  if (c1 > c2) {
    // console.log("p1 wins!")
    deck1.push(c1, c2);
  } else {
    // console.log("p2 wins!")
    deck2.push(c2, c1);
  }
}

let score = 0;

deck1.reverse().forEach((card, idx) => {
  score += card * (idx + 1);
});

console.log(score);
