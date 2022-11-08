const currentExpression = document.querySelector('.new');
const log = document.querySelector('.old');
const anyOperator = /[^\d\.]/gi;

var SCREEN_RESET = false;

const add = (a,b) => a+b;

const subtract = (a,b) => a-b;

const multiply = (a,b) => a*b;

const divide = (a,b) => a/b;
  
const power = (a,b) => (b===0) ? 1:a*power(a,b-1);

const factorial = a =>  (a===0) ? 1:a*factorial(a-1);

const operations = {
    '+' : add,
    '-' : subtract,
    '*' : multiply,
    '/' : divide,
    '^' : power,
    '!' : factorial
};
const operate = (a=0,b=1,operator) => operations[operator](a,b);

const createButtons = function(){
    let buttons = document.querySelector('.buttons');
    let label = '1234567890.+-*/^!=xClear';
    label = label.split('x')[0].split('').concat(label.split('x')[1]);
    for (let i = 0; i < label.length ; i++){
        let b = document.createElement('button');
        b.className = 'b' + (i+1) +' calcButton';
        b.innerText = label[i];
        i == 18 ? b.addEventListener('click',clearScreen):
        i == 17 ? b.addEventListener('click',updateScreen):
        (10 < i && i < 16)? b.addEventListener('click',replace):
        b.addEventListener('click',type);
        buttons.appendChild(b);
    }
}
const type = (event)=>{
    SCREEN_RESET ? log.innerText += currentExpression.textContent+"\n": true;
    SCREEN_RESET ? currentExpression.textContent = '' : true;
    currentExpression.textContent+= event.target.innerText;
    SCREEN_RESET = false;
}
const replace = (event)=>{
    /[^\d\.\!]$/i.test(currentExpression.textContent) ? 
    currentExpression.textContent = currentExpression.textContent
    .replace(/[^\d\.]$/i,event.target.textContent):
    type(event);
}
const clearScreen = ()=>{
    log.textContent = '';
    currentExpression.textContent = '';
}
const updateScreen = ()=>{
    log.innerText += currentExpression.textContent+'='+"\n";
    currentExpression.textContent = analyzeLogic(currentExpression.textContent) || 'Syntax Error!';
    SCREEN_RESET = true;
}
function analyzeLogic(exp = currentExpression.textContent, index = 0){
    let op = [...Object.keys(operations)],
        result;
    if(!exp.match(anyOperator)){
        return Number(exp);
    }
    for(let i = index; i < op.length; i++){
        console.log('loop: (',exp.split(op[i]),op[i]+')')
        if(exp.split(op[i]).length<2){
            continue;
        }
        result = exp.split(op[i]);
        for(let j = 0; j < result.length;j++){  
            if(result[j].match(anyOperator)){
                result[j] = analyzeLogic(result[j],i+1);
            }
        }
        result = result.reduce((s,x)=> operate(Number(s),Number(x),op[i]))
        console.log('result: ',result);
        return Number(result).toFixed(2);
    }
    console.log('result: ',result);
    return result;
}

createButtons();