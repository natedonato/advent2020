const fs = require("fs");
let input = fs.readFileSync("day5/node/input.txt", "utf8").split('\n');



const rows = [64, 32, 16,8,4,2,1];
const columns = [4,2,1]

let maxid = 0;




const decode = (seat) => {
    let row = 0;
    let column = 0;
    for(let i = 0; i < 7; i++){
        const current = rows[i];
        if(seat[i] === 'B')
        row += current;
    }
    for(let j = 0; j < 3; j++){
        const current = columns[j];
        if(seat[j+7] === 'R'){
            column += current 
        }
    }

    const seatid = row * 8 + column
    maxid = Math.max(seatid, maxid)
}

for(line of input){
    decode(line)
}

console.log(maxid)








