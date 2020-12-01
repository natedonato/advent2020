document.getElementById('solve').onclick = solve;

function solve(){
    const inputStr = document.getElementById('inputtext').value
    const output1 = document.getElementById('solution1');
    const output2 = document.getElementById('solution2');


    const input = inputStr.split('\n').map(el => parseInt(el))

    for(let i = 0; i < input.length; i++){
        for(let j = 0; j < input.length; j++){
            
            let num1 = input[i];
            let num2 = input[j];

            if(i < j && num1 + num2 === 2020){
                output1.innerText = (num1 * num2)
                break;
            }
        }
    }

    for(let i = 0; i < input.length; i++){
        for(let j = 0; j < input.length; j++){
            for(let k = 0; k < input.length; k++){

                let [num1, num2, num3] = [input[i], input[j], input[k]];

                if(num1 + num2 + num3 === 2020){
                    output2.innerText=num1 * num2 * num3
                    break;
                }
            }
        }
    }



}