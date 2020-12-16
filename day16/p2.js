const fs = require("fs");
let input = fs.readFileSync("day16/input.txt", "utf8").split("\r\n");

let fields = {};

for (let i = 0; i < 20; i++) {
  let line = input[i];

  let field = line.split(": ")[0];
  let [range1, range2] = line.split(": ")[1].split(" or ");

  fields[field] = [range1.split("-"), range2.split("-")];
}

let invalid = {};

for (let i = 26; i < input.length; i++) {
  let ticket = input[i].split(",");

  ticket.forEach((el) => {
    el = parseInt(el);
    if (el < 25 || el > 974) {
      invalid[i] = true;
    }
  });
}

let fieldList = Object.keys(fields);

let possibilities = [];

for (let j = 0; j < 20; j++) {
  let possFields = [];

  let collection = [];

  for (let i = 25; i < input.length; i++) {
    if (invalid[i] === true) {
      continue;
    }

    let value = input[i].split(",")[j];
    collection.push(parseInt(value));
  }

  let numValid = 0;

  for (field of fieldList) {
    let [[b1, b2], [b3, b4]] = fields[field];
    let found = true;
    for (val of collection) {
      if (!((b1 <= val && val <= b2) || (b3 <= val && b4 >= val))) {
        found = false;
        break;
      }
    }

    if (found === true) {
      numValid += 1;
      possFields.push(field);
    }
  }

  possibilities[j] = possFields;
}

const solved = [];

let unsortedPossibilities = [...possibilities];

possibilities.sort((a, b) => a.length - b.length);

let departures = [];

let ticket = input[22].split(",").map((el) => parseInt(el));

console.log('ticket fields: ')
possibilities.forEach((collection, idx) => {
  let oldIdx = unsortedPossibilities.indexOf(collection);
  collection = collection.filter((el) => !solved.includes(el));
  let final = collection.pop();

  console.log(oldIdx, final);

  if (final.slice(0, 9) === "departure") {
    departures.push(ticket[oldIdx]);
  }

  solved.push(final);
});

console.log(
  "Product of departures",
  departures.reduce((a, b) => a * b)
);
