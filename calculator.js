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
    input.value = '';
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
                case 'one':
                    operator.push('1');
                    array.splice(i, 1, operator[position]);
                    position++;
                    break;
                case 'two':
                    operator.push('2');
                    array.splice(i, 1, operator[position]);
                    position++;
                    break;
                case 'three':
                    operator.push('3');
                    array.splice(i, 1, operator[position]);
                    position++;
                    break;
                case 'four':
                    operator.push('4');
                    array.splice(i, 1, operator[position]);
                    position++;
                    break;
                case 'five':
                    operator.push('5');
                    array.splice(i, 1, operator[position]);
                    position++;
                    break;
                case 'six':
                    operator.push('6');
                    array.splice(i, 1, operator[position]);
                    position++;
                    break;
                case 'seven':
                    operator.push('7');
                    array.splice(i, 1, operator[position]);
                    position++;
                    break;
                case 'eight':
                    operator.push('8');
                    array.splice(i, 1, operator[position]);
                    position++;
                    break;
                case 'nine':
                    operator.push('9');
                    array.splice(i, 1, operator[position]);
                    position++;
                    break;
                case 'ten':
                    operator.push('10');
                    array.splice(i, 1, operator[position]);
                    position++;
                    break;
                case 'eleven':
                    operator.push('11');
                    array.splice(i, 1, operator[position]);
                    position++;
                    break;
                case 'twelve':
                    operator.push('12');
                    array.splice(i, 1, operator[position]);
                    position++;
                    break;
                case 'thirteen':
                    operator.push('13');
                    array.splice(i, 1, operator[position]);
                    position++;
                    break;
                case 'forteen':
                    operator.push('14');
                    array.splice(i, 1, operator[position]);
                    position++;
                    break;
                case 'fifteen':
                    operator.push('15');
                    array.splice(i, 1, operator[position]);
                    position++;
                    break;
                case 'sixteen':
                    operator.push('16');
                    array.splice(i, 1, operator[position]);
                    position++;
                    break;
                case 'seventeen':
                    operator.push('17');
                    array.splice(i, 1, operator[position]);
                    position++;
                    break;
                case 'eighteen':
                    operator.push('18');
                    array.splice(i, 1, operator[position]);
                    position++;
                    break;
                case 'nineteen':
                    operator.push('19');
                    array.splice(i, 1, operator[position]);
                    position++;
                    break;
                case 'twenty':
                    operator.push('20');
                    array.splice(i, 1, operator[position]);
                    position++;
                    break;
                case 'thirty':
                    operator.push('30');
                    array.splice(i, 1, operator[position]);
                    position++;
                    break;
                case 'forty':
                    operator.push('40');
                    array.splice(i, 1, operator[position]);
                    position++;
                    break;
                case 'fifty':
                    operator.push('50');
                    array.splice(i,1, operator[position]);
                    position++;
                    break;
                case 'sixty':
                    operator.push('60');
                    array.splice(i, 1, operator[position]);
                    position++;
                    break;
                case 'seventy':
                    operator.push('70');
                    array.splice(i, 1, operator[position]);
                    position++;
                    break;
                case 'eighty':
                    operator.push('80');
                    array.splice(i, 1, operator[position]);
                    position++;
                    break;
                case 'ninety':
                    operator.push('90');
                    array.splice(i, 1, operator[position]);
                    position++;
                    break;
                case 'hundred':
                    operator.push('00');
                    array.splice(i, 1, operator[position]);
                    position++;
                    break;
                case 'thousand':
                    operator.push('000');
                    array.splice(i,1, operator[position]);
                    position++;
                    break;
                case 'million':
                    operator.push('000000');
                    array.splice(i, 1, operator[position]);
                    position++;
                    break;
                case 'billion':
                    operator.push('00000000');
                    array.splice(i, 1, operator[position]);
                    position++;
                    break;
                case 'percent':
                    operator.push('%');
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
        // Hey! This is  what i have been working on for 2 hours!!!!! :( 
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


