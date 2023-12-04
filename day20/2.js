const fs = require("fs");
let input = fs.readFileSync("day20/input.txt", "utf8");
input = input.split("\n\n");
const graph = {};

input.forEach(puzzlePiece => {
  puzzlePiece = puzzlePiece.split("\n")
  let key = puzzlePiece[0].slice(5,9);
  let piece = new Array()
  for(let i = 1; i < puzzlePiece.length; i++){
    piece.push(puzzlePiece[i].split(""));
  }
  

  graph[key] = {"key": key, "piece": piece, "possible_edges": []}
})

function print(piece){
  for(const row of piece){
    console.log(row.join(""));
  }
  console.log("")
}

let edges = [];

Object.values(graph).forEach(item => {
  let puzzlePiece = item.piece

  let left = ""
  let right = ""
  for(let i = 0; i < puzzlePiece.length; i++){
    left += puzzlePiece[i][0]
    right += puzzlePiece[i][9]
  }

    saveEdge(puzzlePiece[0].join(""));
    saveEdge(puzzlePiece[puzzlePiece.length - 1].join(""));
    saveEdge(left);
    saveEdge(right);

  function saveEdge(edge){
    item.possible_edges.push(edge);
    item.possible_edges.push(edge.split("").reverse().join(""));
  }
  
  edges.push(...item.possible_edges)

})

// flip piece horizontally
function flipPiece(piece){
  let output = []
  for(let i = 0; i < piece.length; i++){
    output[i] = [...piece[i]].reverse()
  }
  return output
};

/// rotate array fn
function rotatePiece(piece){
  let output = [];

  for(let j = 0; j < piece.length; j++){
  let row = []
    for(let i = piece.length-1; i >= 0; i--){
    row.push(piece[i][j]);

    }
    output.push(row);
  }

  return output;
}

// sample puzzle:
// // align sample with website sample
// graph[1951].piece = flipPiece(rotatePiece(rotatePiece(graph[1951].piece)));

// // console.log("\n")
// // console.log(graph[1951])
// print(graph[1951].piece)

// let puzzle = [[graph[1951]]];


// real puzzle:
let puzzle = [[graph[2081]]];

let matching = true;
let current_piece = puzzle[0][0]
let i = 0;



// fill out the puzzle array by flipping pieces into correct order
while(matching){
  let next_piece = findPieceToLeft(current_piece);
  if(next_piece === "end of row"){
    // console.log("end of row");
    next_piece = findPieceBelow(puzzle[i][0])
    if(next_piece === "end of column"){
      matching = false;
      break;
    }
    
    i += 1;
    puzzle[i] = []

  }
  puzzle[i].push(next_piece);
  current_piece = next_piece
}

console.log("puzzle assembled")
// console.log(puzzle)

let combined = combinePuzzle(puzzle)

print(combined)


function combinePuzzle(puz){
  let combined = [];
  for(let pieceRow = 0; pieceRow < puz.length; pieceRow ++){
    if(pieceRow === 0){
      // console.log("pieceRow", puz[pieceRow]);
    }
    for(let j = 1; j < puz[pieceRow][0].piece.length-1; j++){
      let nextRow = []
      // console.log('row', j)
      for(let i = 0; i < puz[pieceRow].length; i++){
        // console.log("current_id", puz[pieceRow][i].key)
        let current = puz[pieceRow][i].piece;
        // console.log("current", current[j])
        let current_seg = [...current[j]];
        current_seg.pop();
        current_seg.shift();
        nextRow.push(...current_seg)
      }
      combined.push(nextRow);
    }
  }
  return combined
}




function findPieceToLeft(graph_piece){
  // get left edge  
  let left_edge = "";
  for(let i = 0; i < graph_piece.piece.length; i++){
    left_edge += graph_piece.piece[i][graph_piece.piece[i].length - 1];
  }

  // find piece that contains left edge
  let match = Object.values(graph).filter(el => el.key !== graph_piece.key && el.possible_edges.includes(left_edge));
  if(match.length > 1){
    throw new Error("too many matches")
  }else if(match.length === 0){
    return "end of row";
  }else{
    match = match[0]
  }

  let matching = false;
  let i = 0;

  while(!matching){
    // get right edge
    let right_edge = "";
    for (let i = 0; i < match.piece.length; i++) {
      right_edge += match.piece[i][0];
    }

    if(left_edge === right_edge){
      matching = true;
    }else{
      match.piece = rotatePiece(match.piece)
      i += 1;
      if(i === 4){
        match.piece = flipPiece(match.piece)
      }
    }
  }
  print(match.piece)
  return(match);
}

function findPieceBelow(graph_piece) {
  // get bottom edge
  let bottom_edge = "";
  bottom_edge = graph_piece.piece[graph_piece.piece.length - 1].join("");

  // find piece that contains bottom edge
  let match = Object.values(graph).filter(
    (el) => el.key !== graph_piece.key && el.possible_edges.includes(bottom_edge)
  );
  if (match.length > 1) {
    throw new Error("too many matches");
  } else if (match.length === 0) {
    return "end of column";
  } else {
    match = match[0];
  }

  let matching = false;
  let i = 0;
  while (!matching) {
    // get right edge
    let top_edge = "";
      top_edge = match.piece[0].join("");

    if (bottom_edge === top_edge) {
      matching = true;
    } else {
      match.piece = rotatePiece(match.piece);
      i += 1;
      if (i === 4) {
        match.piece = flipPiece(match.piece);
      }
    }
  }
  print(match.piece);
  return match;
}



let monster = `                  # 
#    ##    ##    ###
 #  #  #  #  #  #   `;


monster = monster.split("\n").map(el => el.split(""))

let monsterCoords = [];
for(let i = 0; i < monster.length; i++){
  for(let j = 0; j < monster[0].length; j++){
    if(monster[i][j] === "#"){
      monsterCoords.push([i,j])
    }
  }
}

console.log(monsterCoords)


function checkMonster(puzzle, coordinate){
  if(monsterCoords.every(el => {
    let test = [coordinate[0] + el[0], coordinate[1] + el[1]];
    return puzzle[test[0]][test[1]] === "#"
  })){
    return true
  }
}


let num_monsters = 0
function checkWholePuzzle(puzzle){

  for(let i = 0; i < puzzle.length - monster.length; i++){
    for(let j = 0; j < puzzle[0].length - monster[0].length; j++ ){
      if(checkMonster(puzzle, [i,j])){
        num_monsters += 1;
      }
    }
  }
  if (num_monsters === 0) {
    console.log("no monsters detected");
  }

}

function markPuzzle(puzzle){
   for (let i = 0; i < puzzle.length - monster.length; i++) {
     for (let j = 0; j < puzzle[0].length - monster[0].length; j++) {
       if (checkMonster(puzzle, [i, j])) {
         for(item of monsterCoords){
          puzzle[i + item[0]][j + item[1]] = "O"
         }
       }
     }
   }
}

let checking = true;
i = 0;
while(checking){
  checkWholePuzzle(combined)
  if(num_monsters === 0){
     combined = rotatePiece(combined);
     i += 1;
     if (i === 4) {
       combined = flipPiece(combined);
     }
  }else{
    markPuzzle(combined);
    checking = false;
    print(combined);
    console.log("number of monsters:", num_monsters)
    let roughness = 0;
    for(let i = 0; i < combined.length; i++){
      for(let j = 0; j < combined[0].length; j++){
        if(combined[i][j] === "#"){
          roughness += 1
        }
      }
    }
    console.log("total roughness:", roughness)
  }

}