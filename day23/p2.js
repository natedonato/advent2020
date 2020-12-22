const fs = require("fs");
let input = fs.readFileSync("day23/input.txt", "utf8").split("\r\n");

let deck1 = input.slice(1, 26).map((el) => parseInt(el));
let deck2 = input.slice(28, 54).map((el) => parseInt(el));

function recursiveCombat(_deck1, _deck2) {
  let deck1 = [..._deck1];
  let deck2 = [..._deck2];

  let seenPositons = {};

  while (deck1.length > 0 && deck2.length > 0) {
    let string = deck1.join("") + "," + deck2.join("");

    if (seenPositons[string] === true) {
      return [[1, 2], []];
    } else {
      seenPositons[string] = true;
    }

    let c1 = deck1.shift();
    let c2 = deck2.shift();

    if (deck1.length >= c1 && deck2.length >= c2) {
      let outcome = recursiveCombat(deck1.slice(0, c1), deck2.slice(0, c2));
      if (outcome[0].length > outcome[1].length) {
        deck1.push(c1, c2);
      } else {
        deck2.push(c2, c1);
      }
    } else if (c1 > c2) {
      deck1.push(c1, c2);
    } else {
      deck2.push(c2, c1);
    }
  }

  return [deck1, deck2];
}

let score = 0;

let [fdeck1, fdeck2] = recursiveCombat(deck1, deck2);

let winner = fdeck2;
if (fdeck1.length > fdeck2) {
  winner = fdeck1;
}

winner.reverse().forEach((card, idx) => {
  score += card * (idx + 1);
});

console.log(score);
