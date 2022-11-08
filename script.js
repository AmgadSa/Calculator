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

const operate = function(a,b,operator) {
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