const fs = require("fs");
let input = fs
  .readFileSync("day17/input.txt", "utf8")
  .split("\r\n")
  .map((el) => el.split(""));

let cube = [input];
let hypercube = [[input]];


function printHyperCube(hypercube){
  hypercube.forEach((cube, idx) =>{
    console.log('\n\n')
    console.log('w: ', idx);
    console.log(cube);
  })
}





function newLayer(n) {
  let layer = [];
  for (let i = 0; i < n; i++) {
    layer.push(new Array(n).fill("."));
  }
  return layer;
}

function newCube(z,n){
  let cube = [];

  for(let i = 0; i < z; i++){
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

function expandHyperCube(hypercube){
  let newHyperCube = [];

  for(cube of hypercube){
    cube = expandCube(cube);
    cube = copyCube(cube);
    newHyperCube.push(cube);
  }

  let zLength = newHyperCube[0].length;
  let nLength = newHyperCube[0][0].length;

  // make empty cubes
  newHyperCube.unshift(newCube(zLength, nLength));
  newHyperCube.push(newCube(zLength, nLength));

  return newHyperCube;
}

function copyCube(cube) {
  return JSON.parse(JSON.stringify(cube));
}

// //traverse full cube function
// function iterateCube(cube, newCube) {
//   let layerLength = cube.length;
//   let rowLength = cube[0].length;
//   let cubeBounds = [layerLength, rowLength];

//   for (let z = 0; z < layerLength; z++) {
//     for (let y = 0; y < rowLength; y++) {
//       for (let x = 0; x < rowLength; x++) {
//         let el = cube[z][y][x];
//         let neighborCount = countNeighbors(z, y, x, cubeBounds, cube);

//         if (el === "#" && !(neighborCount === 2 || neighborCount === 3)) {
//           newCube[z][y][x] = ".";
//         } else if (el === "." && neighborCount === 3) {
//           newCube[z][y][x] = "#";
//         }
//       }
//     }
//   }
// }

// function countNeighbors(_z, _y, _x, cubeBounds, cube) {
//   let zBounds = makeBound(_z, cubeBounds[0]);
//   let yBounds = makeBound(_y, cubeBounds[1]);
//   let xBounds = makeBound(_x, cubeBounds[1]);
//   let count = 0;



//   // console.log('checking neighbors for ', _z, _y,_x)
//   // console.log('bounds', zBounds, yBounds, xBounds)



//   for(let z = zBounds[0]; z < zBounds[1]; z++){
//     for(let y = yBounds[0]; y < yBounds[1]; y++){
//       for(let x = xBounds[0]; x < xBounds[1]; x++){
//         let el = cube[z][y][x];
//         // console.log(z,y,x, el);
//         if(el === '#' && !(z === _z && y === _y && x === _x)){
//           count += 1;
//         }
//       }
//     }
//   }

//   return count;
// }

// function makeBound(x, bound){
//   let lowerBound = x-1 < 0 ? 0 : x-1;
//   let upperBound = x+1+1 > bound ? bound : x+1+1;

//   return[lowerBound, upperBound];
// }


// function cubeCount(cube){
//   let count = 0;
  
//   let layerLength = cube.length;
//   let rowLength = cube[0].length;

//   for (let z = 0; z < layerLength; z++) {
//     for (let y = 0; y < rowLength; y++) {
//       for (let x = 0; x < rowLength; x++) {
//         let el = cube[z][y][x];
//         if(el === '#'){
//           count+=1;
//         }
//       }
//     }
//   }
//   return count;
// }



// for(let i = 0; i < 6; i++){
  
//   cube = expandCube(cube);

//   newCube = copyCube(cube);

//   iterateCube(cube, newCube);

//   console.log('\n\n');

//   console.log(newCube);

//   cube = newCube;

// }

// console.log(cubeCount(cube));



printHyperCube(hypercube);


printHyperCube(expandHyperCube(hypercube));