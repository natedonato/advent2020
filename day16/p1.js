const fs = require("fs");
let input = fs.readFileSync("day16/input.txt", "utf8").split('\r\n');

// const valid = new Array(1000).fill(null);

// for(let i = 0; i < 20; i++){
//     let line = input[i];
//     let [range1, range2] = line.split(': ')[1].split(' or ');


//     [range1, range2].forEach(range => {
//         const [lowerbound, upperbound] = range.split('-');

//         for(let i = lowerbound; i <= upperbound; i++){
//             valid[i] = true;
//         };
//     });
// };

// valid range is 25-974
let invalid = 0;

for(let i = 25; i < input.length; i++){
    let ticket = input[i].split(',')


    ticket.forEach(el => {
        el = parseInt(el);
        if(el < 25 || el > 974){
            invalid += el;
        }
    })
}

console.log(invalid)



//668844166853 is incorrect ;(