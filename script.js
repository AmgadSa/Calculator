const add = function(a,b) {
	return a+b;
};

const subtract = function(a,b) {
	return a-b;
};

const multiply = function(a,b) {
    return a*b;
};

const divide = function(a,b){
    return a/b;
}
  
const power = function(a,b) {
    return (b===0)? 1:a*power(a,b-1);
};

const factorial = function(a) {
    return (a===0)? 1:a*factorial(a-1);
};

const operate = function(a=0,b=1,operator) {
    let operation = {
        '+' : add,
        '-' : subtract,
        '*' : multiply,
        '/' : divide,
        '^' : power,
        '!' : factorial
    }
    return operation[operator](a,b);
}
const createButtons = function(){
    let buttons = document.querySelector('.buttons');
    let label = '1234567890.=+-*/!^xClear';
    label = label.split('x')[0].split('').concat(label.split('x')[1]);
    for (let i = 0; i < label.length ; i++){
        let b = document.createElement('button');
        b.className = 'b' + (i+1) +' calcButton';
        b.innerText = label[i];
        buttons.appendChild(b);
    }
}
createButtons();