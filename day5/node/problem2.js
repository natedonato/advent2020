const fs = require("fs");
let input = fs.readFileSync("day5/node/input.txt", "utf8").split('\n');



const rows = [64, 32, 16,8,4,2,1];
const columns = [4,2,1]

let seats = [];




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
    seats.push(seatid)
}

for(line of input){
    decode(line)
}

seats = seats.sort();

for(let i = 0; i < seats.length; i++){
    let currSeat = seats[i]
    if(seats.indexOf(currSeat + 1) === -1 && i < seats.length - 2){
        console.log(currSeat + 1);
    }
}