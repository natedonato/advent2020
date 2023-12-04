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

edges = edges.sort()

for(const item of Object.values(graph)){
  item.matchCount = 0;
  for(const edge of item.possible_edges){
    let match = edges.filter(el => el === edge).length - 1;
    item.matchCount += match;
  }
  item.matchCount = item.matchCount / 2;
}

console.log(Object.values(graph).filter(el => el.matchCount === 2).map(el => el.key).reduce((a,e) => a *= parseInt(e),1));
console.log(Object.values(graph).filter(el => el.matchCount === 2).map(el => el.key));