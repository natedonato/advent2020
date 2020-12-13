const fs = require("fs");
let [time, buses] = fs.readFileSync("day13/input.txt", "utf8").split("\r\n");
time  = parseInt(time);
buses = buses.split(',').filter(el => el !== 'x').map(el => parseInt(el)).sort((a,b) => a - b);

let busTimes = [];
buses.forEach(bus => {

  let i = 1;
  let nextTime = bus;

  while(nextTime < time){
    nextTime = bus * i
    i += 1;
  }

  busTimes.push({id: bus, time: nextTime})
})

const finalBus = busTimes.sort((a,b) => a.time - b.time)[0]

console.log((finalBus.time - time) * finalBus.id)
