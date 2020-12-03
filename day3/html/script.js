document.getElementById('solve').onclick = solve;

document.getElementById('reveal1').onclick = () => {
  document.getElementById('reveal1').style.display='none';
  document.getElementById('example1').style.display='block';
}

document.getElementById("reveal2").onclick = () => {
  document.getElementById("reveal2").style.display = "none";
  document.getElementById("example2").style.display = "block";
};


function solve(){

    const inputStr = document.getElementById('inputtext').value
    const output1 = document.getElementById('solution1');
    const output2 = document.getElementById('solution2');
    
    let input=inputStr.split("\n")
    .map((el) => el.split(""));

    console.log(input);

    let horizontalLength = input[0].length;
    let current = [0, 0];
    let treeCount = 0;

    while (current[0] < input.length) {
    let [row, column] = current;

    if (input[row][column] === "#") {
        treeCount += 1;
    }
    current = [current[0] + 1, (current[1] + 3) % horizontalLength];
    }

    console.log(treeCount);

    output1.innerText = (treeCount);


    
let offsets = [
    [1, 1],
    [1, 3],
    [1, 5],
    [1, 7],
    [2, 1],
  ];
  
  let treeQuotient = 1;
  
  for (offset of offsets) {
    let [offsetRow, offsetCol] = offset;
    let current = [0, 0];
    let treeCount = 0;
  
    while (current[0] < input.length) {
      let [row, column] = current;
  
      if (input[row][column] === "#") {
        treeCount += 1;
      }
  
      current = [row + offsetRow, (column + offsetCol) % horizontalLength];
    }
    treeQuotient *= treeCount;
  }

    output2.innerText = (treeQuotient);
}