let collection = [];

for (let i = 0; i < 10000; i++) {
  if (i % 7 === 0 && i % 11 === 0) {
    console.log("fizzbuzz");
  } else if (i % 7 === 0 && (i + 2) % 11 === 0 && (i + 3) % 5 === 0) {
    collection.push(i);
  } else if (i % 7 === 0) {
    console.log("fizz", i);
  } else if (i % 11 === 0) {
    console.log("buzz", i);
  } else {
    console.log(i);
  }
}

console.log(collection);

// results of various explorations and tests:

// once we find a good input for two numbers, we know the next good input will
// always be those two numbers multiplied together.  Same goes for 3 or more numbers.
// The numbers might have to be prime for this to hold true, but all our inputs and
// example inputs are suspiciously prime looking so that doesn't have to be an issue for now.
