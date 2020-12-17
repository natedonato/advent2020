const fs = require("fs");
let input = fs
  .readFileSync("day17/input.txt", "utf8")
  .split("\r\n")
  .map((el) => el.split(""));

let hypercube = [[input]];

function printHyperCube(hypercube) {
  let wLength = hypercube.length;

  hypercube.forEach((cube, idx) => {
    console.log("\n\n");

    cube.forEach((layer, idx2) => {
      console.log(
        "z=",
        -Math.floor(wLength / 2) + idx2,
        "w= ",
        -Math.floor(wLength / 2) + idx
      );

      console.log(layer);
    });
  });
}

function newLayer(n) {
  let layer = [];
  for (let i = 0; i < n; i++) {
    layer.push(new Array(n).fill("."));
  }
  return layer;
}

function newCube(z, n) {
  let cube = [];

  for (let i = 0; i < z; i++) {
    cube.push(newLayer(n));
  }

  return cube;
}

function expandLayer(layer) {
  for (row of layer) {
    row.unshift(".");
    row.push(".");
  }

  layer.unshift(new Array(layer[0].length).fill("."));
  layer.push(new Array(layer[0].length).fill("."));

  return layer;
}

function expandCube(cube) {
  let newCube = [];

  for (layer of cube) {
    newCube.push(expandLayer(layer));
  }

  let sideLength = newCube[0][0].length;
  newCube.unshift(newLayer(sideLength));
  newCube.push(newLayer(sideLength));

  return newCube;
}

function expandHyperCube(hypercube) {
  let newHyperCube = [];

  for (cube of hypercube) {
    cube = expandCube(cube);
    cube = copyCube(cube);
    newHyperCube.push(cube);
  }

  let zLength = newHyperCube[0].length;
  let nLength = newHyperCube[0][0].length;

  newHyperCube.unshift(newCube(zLength, nLength));
  newHyperCube.push(newCube(zLength, nLength));

  return newHyperCube;
}

function copyCube(cube) {
  return JSON.parse(JSON.stringify(cube));
}

function iterateHyperCube(hypercube, newHyperCube) {
  let wLength = hypercube.length;
  let zLength = hypercube[0].length;
  let rowLength = hypercube[0][0].length;
  let hyperCubeBounds = [wLength, zLength, rowLength];

  for (let w = 0; w < wLength; w++) {
    for (let z = 0; z < zLength; z++) {
      for (let y = 0; y < rowLength; y++) {
        for (let x = 0; x < rowLength; x++) {
          let el = hypercube[w][z][y][x];
          let neighborCount = countNeighbors(
            w,
            z,
            y,
            x,
            hyperCubeBounds,
            hypercube
          );

          if (el === "#" && !(neighborCount === 2 || neighborCount === 3)) {
            newHyperCube[w][z][y][x] = ".";
          } else if (el === "." && neighborCount === 3) {
            newHyperCube[w][z][y][x] = "#";
          }
        }
      }
    }
  }
}

function countNeighbors(_w, _z, _y, _x, hyperCubeBounds, hypercube) {
  let wBounds = makeBound(_w, hyperCubeBounds[0]);
  let zBounds = makeBound(_z, hyperCubeBounds[1]);
  let yBounds = makeBound(_y, hyperCubeBounds[2]);
  let xBounds = makeBound(_x, hyperCubeBounds[2]);
  let count = 0;

  for (let w = wBounds[0]; w < wBounds[1]; w++) {
    for (let z = zBounds[0]; z < zBounds[1]; z++) {
      for (let y = yBounds[0]; y < yBounds[1]; y++) {
        for (let x = xBounds[0]; x < xBounds[1]; x++) {
          let el = hypercube[w][z][y][x];

          if (el === "#" && !(w === _w && z === _z && y === _y && x === _x)) {
            count += 1;
          }
        }
      }
    }
  }

  return count;
}

function hyperCubeCount(hypercube) {
  let count = 0;

  let wLength = hypercube.length;
  let zLength = hypercube[0].length;
  let rowLength = hypercube[0][0].length;

  for (let w = 0; w < wLength; w++) {
    for (let z = 0; z < zLength; z++) {
      for (let y = 0; y < rowLength; y++) {
        for (let x = 0; x < rowLength; x++) {
          let el = hypercube[w][z][y][x];
          if (el === "#") {
            count += 1;
          }
        }
      }
    }
  }
  return count;
}

function makeBound(x, bound) {
  let lowerBound = x - 1 < 0 ? 0 : x - 1;
  let upperBound = x + 1 + 1 > bound ? bound : x + 1 + 1;

  return [lowerBound, upperBound];
}

for (let i = 0; i < 6; i++) {
  hypercube = expandHyperCube(hypercube);

  newHyperCube = copyCube(hypercube);

  iterateHyperCube(hypercube, newHyperCube);

  hypercube = newHyperCube;

  // printHyperCube(hypercube);
}

console.log(hyperCubeCount(hypercube));
