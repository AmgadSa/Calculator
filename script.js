const body = document.querySelector('body');

const currentExpression = document.querySelector('.new');

const log = document.querySelector('.old');

const screen = document.querySelector('.screen');

const digits = document.querySelector('.digits');

const symbols = document.querySelector('.symbols');

const extra = document.querySelector('.extra');

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
    '×' : multiply,
    '/' : divide,
    '^' : power,
    '!' : factorial
};
const operate = (a=0,b=1,operator) => operations[operator](a || 0,b || 1);

const createButtons = function(){
    let buttons = document.querySelector('.buttons');
    let label = '1234567890.+-×/^!=xCxAC';
    label = label.split('x')[0].split('').concat(label.split('x').slice(1));
    for (let i = 0; i < label.length ; i++){
        let b = document.createElement('button');
        b.className = 'b' + (i+1) +' calcButton';
        b.innerText = label[i];
        i == 19 ? b.addEventListener('click',clearScreen):
        i == 18 ? b.addEventListener('click',backspace):
        i == 17 ? b.addEventListener('click',updateScreen):
        b.addEventListener('click',type);
        (0 <= i && i < 9)? digits.appendChild(b):
        (10 < i && i <17)? symbols.appendChild(b):
        extra.appendChild(b);
    }
}
const scrollScreen = () => screen.scroll({top: screen.scrollHeight, behavior: 'smooth' });

const type = (event)=>{
    if(/[A-Za-z]$/i.test(currentExpression.textContent) || (
        SCREEN_RESET && /\d/i.test(event.target.innerText))){
        log.innerText += currentExpression.textContent+"\n";
        currentExpression.textContent = ''
    }
    if ((event.target.innerText == '\.' && (/\d+\.\d*$/i.test(currentExpression.textContent))) ||
       (/\d/i.test(event.target.innerText) && /\!$/i.test(currentExpression.textContent))){
        currentExpression.textContent+= '';
        return true;
    }
    else if(/[^\d\.\!]$/i.test(currentExpression.textContent) &&
            /[^\d\.\!]$/i.test(event.target.innerText)){
            currentExpression.textContent = currentExpression.textContent
            .replace(/[^\d\.]$/i,event.target.textContent)
            return true;
    } else {
        currentExpression.textContent= (currentExpression.textContent != '0') ?
        currentExpression.textContent + event.target.innerText:
        event.target.innerText;
    }
    SCREEN_RESET = false;
    scrollScreen();
}
const clearScreen = ()=>{
    log.textContent = '';
    currentExpression.textContent = '0';
}
const updateScreen = ()=>{
    log.innerText += currentExpression.textContent+' ='+"\n";
    currentExpression.textContent = analyzeLogic(currentExpression.textContent) || 'SYNTAX ERROR';
    SCREEN_RESET = true;
    scrollScreen();
}
const backspace = ()=>{
    let tail = currentExpression.textContent.split('');
    tail.pop();
    currentExpression.textContent = tail.join('') || '0';
}
const keyboardInput = (event) => {
    let buttons = [...document.querySelectorAll('button')];
    let newTarget = {};
    newTarget.target = buttons.find(element =>
        event.key === element.innerText ? true:
        event.key === '*' && element.innerText === '×' ? true:
        event.key === 'Enter' && element.innerText === '=' ? true:
        event.key === 'c' && element.innerText === 'AC'? true:
        event.key === 'Backspace'&& element.innerText === 'C'? true:
        false);
    !newTarget.target? false:
    newTarget.target.innerText === '='? updateScreen():
    newTarget.target.innerText === 'AC'? clearScreen():
    newTarget.target.innerText === 'C'? backspace():
    type(newTarget);
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
        return Number(Number(result).toFixed(9));
    }
    console.log('result: ',result);
    return result;
}

createButtons();
body.addEventListener('keydown',keyboardInput);