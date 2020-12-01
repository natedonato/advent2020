const fs = require('fs');
const input = fs.readFileSync('day1/node/input.txt', "utf8").split('\n').map(el => parseInt(el));

input.forEach((num, idx) => {
    input.forEach((num2, idx2) => {
        if (num + num2 === 2020 && idx !== idx2) {
            console.log(num * num2);
        }
    })
})