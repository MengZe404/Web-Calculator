"use strist"
// Get element <input> and <textarea> (output)
let input = document.getElementById('input');
let output = document.getElementById('output');
const parser = math.parser()

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
        if(mode == 'standard' || mode == 'calculus') { 
            window.expression = input.value;
            calculate();
            history();
        } else{
            window.expression = input.value;
            output.value += ('Function:  ' + expression + '\n');
            input.value = 'x = ';
            input.addEventListener("keyup", function(event){
                if(event.key) x = parser.evaluate(input.value);
            })
            calculate();
            history();
        } 
    }
})

// Calculator Core
let result = '';
let x = '';
function calculate() {
    let expression = window.expression;

    // Nature Typing Identifier

    let letters = /^[A-Za-z]+$/;

    let userOperator = '';

    let operator = [];

    let array = expression.split(' ');

    let position = 0;

    for(let i = 0; i < array.length; i++) {
        if(array[i].match(letters)) {
            userOperator = array[i];
            switch(userOperator) {
                case 'plus':
                case 'add':
                    operator.push('+');
                    array.splice(i, 1, operator[position]);
                    position++;
                    break;
                case 'minus':
                case 'subtract':
                    operator.push('-');
                    array.splice(i, 1, operator[position]);
                    position++;
                    break;
                case 'times':
                case 'multiply':
                    operator.push('*');
                    array.splice(i, 1, operator[position]);
                    position++;
                    break;
                case 'divide':
                case 'over':
                    operator.push('/');
                    array.splice(i, 1, operator[position]);
                    position++;
                    break;
                case 'power':
                case 'caret':
                case 'to the power of':
                    operator.push('^');
                    array.splice(i, 1, operator[position]);
                    position++;
                    break;
                default:
                    operator.push(userOperator);
                    array.splice(i, 1, operator[position]);
                    position++;
            }
        }
    }

    // Function identifier (e.g f(x), g(x)).
    let userFunc = array[0];

    switch(userFunc) {
        case 'f(x)':
            funcOp = 'f(';
            break;
        case 'g(x)':
            funcOp = 'g(';
            break;
        case 'h(x)':
            funcOp = 'h('
            break;
    }
    
    expression = (array.join(' '));
    // Use different mathemtical methods for each mode
    if(mode == 'standard') {
        input.value = ''; // Everytime the user click 'Enter', the value in <input> reset
        let compiled = math.compile(expression);
        result = compiled.evaluate();
        output.value += ('Input:  ' + expression + '\n' + result + '\n' + '\n'); 
    } else if(mode == 'algebra'){
        input.value = 'x = ';
        parser.evaluate(expression);
        result = parser.evaluate(funcOp + x + ')'); // example: f(2) if x = 2.
        output.value += ( 'Result:  ' + result + '\n' + '\n');
    } else {
        input.value = ''; // Everytime the user click 'Enter', the value in <input> reset
        result = math.derivative(expression, 'x').toString();
        output.value += ('Input:  ' + expression + '\n' + result + '\n' + '\n'); 
    }

    if(result == undefined) result = "no answer";
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


