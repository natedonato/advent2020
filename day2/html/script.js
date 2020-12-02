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


    let input = inputStr.split('\n').map(el => el.split(' '));

    let numValid = 0;

    for(line of input){
        const [rule, char, password] = line;
        const [lowerbound, upperbound] = rule.split('-');
        const counterChar = char[0];
    
        let count = 0;
        for(character of password.split('')){
            if(character === counterChar){
                ++count;
            }
        }
    
        if( lowerbound <= count && count <= upperbound){
            ++numValid;
        }
    }
    
    output1.innerText = (numValid);
    numValid = 0

    for(line of input){
        let [rule, char, password] = line;
        const [position1, position2] = rule.split('-');
        char = char[0];
        password = password.split('');
        const str1 = password[position1 - 1];
        const str2 = password[position2 - 1]; 
    
        if((str1 === char || str2 === char) && str1 !== str2){
            ++numValid;
        }
    }

    output2.innerText = (numValid);
}