"use strist"
// Get element <input> and <textarea> (output)
let input = document.getElementById('input');
let output = document.getElementById('output');


// Mode selector with <select> and <option> elements.
let modeSelector = document.getElementById('selector');
let mode = 'standard';

// When there is a change in select value, the mode changes too.
modeSelector.addEventListener('change', userMode);

// Assign the selected value to mode
function userMode() {
    mode = modeSelector.value;
}

// When the user click 'Enter' key, assign the value in <input> to a new variable expression
input.addEventListener("keyup", function(event){
    if(event.keyCode === 13) {
        window.expression = input.value;
        calculate();
        history();
    }
})

let result = '';

function calculate() {
    input.value = ''; // Everytime the user click 'Enter', the value in <input> reset
    let expression = window.expression;

    // Nature Typing Identifier

    let letters = /^[A-Za-z]+$/;

    let userOperator = '';

    let operator = []

    let array = expression.split(' ');

    let position = 0;

    checkInput:
    for(let i = 0; i < array.length; i++) {
        if(array[i].match(letters) && array[i].indexOf('x') == -1) {
            userOperator = array[i];
            switch(userOperator) {
                case 'plus':
                    operator.push('+');
                    array.splice(i, 1, operator[position]);
                    position++
                    continue checkInput;
                case 'add':
                    operator.push('+');
                    array.splice(i, 1, operator[position]);
                    position++
                    continue checkInput;
                case 'minus':
                    operator.push('-');
                    array.splice(i, 1, operator[position]);
                    position++
                    continue checkInput;
                case 'subtract':
                    operator.push('-');
                    array.splice(i, 1, operator[position]);
                    position++
                    continue checkInput;
                case 'times':
                    operator.push('*');
                    array.splice(i, 1, operator[position]);
                    position++
                    continue checkInput;
                case 'multiply':
                    operator.push('*');
                    array.splice(i, 1, operator[position]);
                    position++
                    continue checkInput;
                case 'divide':
                    operator.push('/');
                    array.splice(i, 1, operator[position]);
                    position++
                    continue checkInput;
                case 'over':
                    operator.push('/');
                    array.splice(i, 1, operator[position]);
                    position++
                    continue checkInput;
                case 'power':
                    operator.push('^');
                    array.splice(i, 1, operator[position]);
                    position++
                    continue checkInput;
                case 'caret':
                    operator.push('^');
                    array.splice(i, 1, operator[position]);
                    position++
                    continue checkInput;
            }
        }
    }

    expression = (array.join(' '));
    // Use different mathemtical methods for each mode
    if(mode == 'standard') {
        result = math.evaluate(expression);
    } else if(mode == 'algebra'){
        result = math.simplify(expression).toString();
    } else {
        result = math.derivative(expression, 'x').toString();
    }

    if(result == undefined) result = "no answer";
    
    output.value += ('Input:  ' + expression + '\n' + result + '\n' + '\n'); 
}

// Everytime the user refresh the page, reset the input box and output history.
function reset() {
    input.value = '';
    output.value = '';
    mode = modeSelector.value = 'standard';
}

// History of output

let length = localStorage.getItem("OpenRevise2_calHistory").length;
if(length > 100) localStorage.clear("OpenRevise2_calHistory");

let userHistory = document.getElementById('history');
userHistory.addEventListener('click', function(){
    output.value = "History:  \n" + localStorage.getItem("OpenRevise2_calHistory");
})

function history() {
    localStorage.setItem("OpenRevise2_calHistory", output.value);
}


