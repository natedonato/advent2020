const fs = require("fs");
let input = fs.readFileSync("day21/input.txt", "utf8").split("\n");
let collection = {};
let allIngredients = {};

for (const line of input) {
  let [ingredients, allergens] = line.split(" (contains ");
  ingredients = ingredients.split(" ");
  allergens = allergens.slice(0, allergens.length - 1).split(", ");

  for (const ingredient of ingredients) {
    if (allIngredients[ingredient] === undefined) {
      allIngredients[ingredient] = 1;
    } else {
      allIngredients[ingredient] += 1;
    }
  }

  for (const allergen of allergens) {
    if (collection[allergen] === undefined) {
      collection[allergen] = ingredients;
    } else {
      let filteredIngredients = collection[allergen].filter((item) =>
        ingredients.includes(item)
      );
      collection[allergen] = filteredIngredients;
    }
  }
}

let unsafeIngredients = Object.values(collection).flat();
let everyIngredient = Object.keys(allIngredients);

let safeIngredients = everyIngredient.filter(
  (item) => !unsafeIngredients.includes(item)
);

let count = 0;
for (ingredient of safeIngredients) {
  count += allIngredients[ingredient];
}

let allergens = Object.keys(collection);
let numAllergens = allergens.length;
let solutions = {};
let numsolutions = 0;

while (numsolutions < numAllergens) {
  for (const allergen of allergens) {
    let possibilities = collection[allergen];
    if (
      possibilities.length === 1 &&
      !Object.keys(solutions).includes(allergen)
    ) {
      solutions[allergen] = possibilities[0];
      numsolutions += 1;
    } else {
      possibilities = possibilities.filter(
        (item) => !Object.values(solutions).includes(item)
      );
      collection[allergen] = possibilities;
    }
  }
}

let output = "";
Object.keys(solutions)
  .sort()
  .forEach((el) => (output += solutions[el] + ","));
console.log(output.slice(0, output.length - 1));
