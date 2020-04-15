"use strist"

// Get element <input> and <textarea> (output)
let input = document.getElementById('input');
let output = document.getElementById('output');

// When the user click 'Enter' key, assign the value in <input> to a new variable expression
input.addEventListener("keyup", function(event){
    if(event.keyCode === 13) {
        window.expression = input.value;
        calculate();
    }
})

function calculate() {
    input.value = ''; // Everytime the user click 'Enter', the value in <input> reset
    let expression = window.expression;
    let result  = math.evaluate(expression);
    if(result == undefined) {
        result = "no answer";
    }
    output.value += ('Input:  ' + expression + '\n' + result + '\n' + '\n'); 
}

function reset() {
    input.value = '';
    output.value = '';
}


