
let fNum = '',
    sNum = '',
    operator = null,
    reset = false;

const currentScreen = document.querySelector('.current');
const prevScreen = document.querySelector('.previous');
const numBtn = document.querySelectorAll('#btnContainer button.numBtn');
const opBtn = document.querySelectorAll('#btnContainer button.opBtn');
const clearBtn = document.querySelector('#clearBtn');
const calcBtn = document.querySelector('#calcBtn');
const decBtn = document.querySelector('#decBtn');
const delBtn = document.querySelector('#delBtn');
const minBtn = document.querySelector('#minBtn')


const logging = function(action = 'unknown') {
    console.table({
        'Action': action,
        'fNum': fNum,
        'sNum': sNum,
        'operator': operator,
        'reset': reset
    });
}

const add = function(a, b) {
    return a + b;
};

const subtract = function(a, b) {
    return a - b;
};

const multiply = function(a, b) {
    return a * b;
};

const divide = function(a, b) {
    return a / b;
};

const operate = function(theFirst, theSecond, theOperator) {
    let result = 'Error';
    theFirst = Number(theFirst);
    theSecond = Number(theSecond);
    switch(theOperator) {
        case 'add':
            result = add(theFirst, theSecond);
            break;
        case 'subtract':
            result = subtract(theFirst, theSecond);
            break;
        case 'multiply':
            result = multiply(theFirst, theSecond);
            break;
        case 'divide':
            result = divide(theFirst, theSecond);
            break;
    }
    return result;
}

const calculate = function() {
    if (operator === null || reset) return;
    if (operator === 'divide' && currentScreen.textContent === '0') {
        clear();
        reset = true;
        currentScreen.textContent = 'Error';
        return
    }
    sNum = currentScreen.textContent;
    currentScreen.textContent = roundResult(operate(fNum, sNum, operator));
    prevScreen.textContent = `${fNum} ${operator} ${sNum} =`
    operator = null;
    reset = true;
    logging('calculate()');
};

const roundResult = function(num) {
    return Math.round(num * 1000) / 1000;
}

const addNumber = function(value) {
    if(currentScreen.textContent === '0' || reset) resetScreen()
    currentScreen.textContent += value;
    logging('addNumber()');
}

const clear = function() {
    currentScreen.textContent = '0';
    prevScreen.textContent = '';
    fNum = '';
    sNum = '';
    operator = null;
    logging('clear()');
}

const resetScreen = function() {
    currentScreen.textContent = '';
    if (!operator) prevScreen.textContent = '';
    reset = false;
}

const setOperator = function(btnOperator) {
    if (operator !== null) calculate()
    fNum = currentScreen.textContent;
    operator = btnOperator;
    prevScreen.textContent = `${fNum} ${operator}`
    reset = true;
    logging('setOperator()');
}

const removeNumber = function() {
    let currentNum = currentScreen.textContent.toString();
    currentScreen.textContent = (currentNum.length > 1) ? 
        currentNum.slice(0,-1) : 
        currentNum;
    logging('removeNumber()');
}

const toggleMinus = function() {
    let currentNum = currentScreen.textContent.split('');
    if (currentNum[0] === '0') return;
    if (currentNum[0] === '-') {
        currentNum.shift();
    } else {
        currentNum.unshift('-');
    }
    currentScreen.textContent = currentNum.join('');
    logging('toggleMinus()');
}


const addPoint = function() {
    if (reset) resetScreen();
    if (currentScreen.textContent.includes('.')) return
    if (currentScreen.textContent === '') currentScreen.textContent = '0';
    currentScreen.textContent += '.'
    logging('addPoint()');
}
// add eventlisteners to buttons
numBtn.forEach((button) => {
    button.addEventListener('click', (e) => {
        addNumber(button.textContent);
    });
});

opBtn.forEach((button) => {
    button.addEventListener('click', () => {
        setOperator(button.dataset.operator);
    });
});

clearBtn.addEventListener('click', clear);

calcBtn.addEventListener('click', () => {
    calculate();
});

decBtn.addEventListener('click', () => {
    addPoint();
});

delBtn.addEventListener('click', removeNumber);

minBtn.addEventListener('click', toggleMinus);

