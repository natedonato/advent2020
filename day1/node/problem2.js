const fs = require('fs');
const input = fs.readFileSync('day1/node/input.txt', "utf8").split('\n').map(el => parseInt(el));

input.forEach((num1, idx1) => {
    input.forEach((num2, idx2) => {
        input.forEach((num3, idx3) => {
            if(num1 + num2 + num3 === 2020 && (idx1 !== idx2 && idx2 !== idx3 && idx1 !== idx3)){
                console.log(num1*num2*num3)
            }
        })
    })
})