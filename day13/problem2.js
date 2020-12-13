const fs = require("fs");
let buses = fs.readFileSync("day13/input.txt", "utf8").split("\r\n")[1];

buses = buses.split(',').map(el => el === 'x' ? el : parseInt(el));



// this is not gonna work unfortunately, need to cut down on the required work.

// function checkTime(time){
  
//   for(let i = 0; i < buses.length; i++){
    
//     const bus = buses[i]
    
//     if(bus === 'x'){
//       continue;
//     }

//     const currTime = time + i;
    
//     if(currTime % bus !== 0){
//       return false;
//     }
//   }

//   return true;
// }



// let time = 100000000000000;

// while(checkTime(time) === false){
//   ++time ;


//   console.log(time);
// }

// console.log('\n')
// console.log('final time', time);