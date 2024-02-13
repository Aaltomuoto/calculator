let fNum = null,
    sNum = null,
    operator = null,
    newLine = true,
    calculated = false;

const screen = document.querySelector('#screen');
const numBtn = document.querySelectorAll('#btnContainer button.numBtn');
const opBtn = document.querySelectorAll('#btnContainer button.opBtn');
const clearBtn = document.querySelector('#clearBtn');
const calcBtn = document.querySelector('#calcBtn');
const decBtn = document.querySelector('#decBtn');
const delBtn = document.querySelector('#delBtn');
const minBtn = document.querySelector('#minBtn')

const logging = function(where = 'unknown') {
    console.table({'where': where,
        'fNum':fNum,
        'sNum':sNum,
        'operator':operator,
        'newLine':newLine, 
        'calculated':calculated});
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

const operate = function(first, second, theOperator) {
    logging('operate start');
    if (screen.textContent === 'Error') return;
    let result = 'Error';

    switch(theOperator) {
        case 'add':
            result = add(first, second);
            break;
        case 'subtract':
            result = subtract(first, second);
            break;
        case 'multiply':
            result = multiply(first, second);
            break;
        case 'divide':
            result = (second !== 0) ? divide(first, second) : result;
            break;
        
    }
    fNum = result;
    newLine = true;
    updateScreen(result);
    calculated = true;
};

const updateScreen = function(value = 0) {
    screen.textContent = value;
}

const addNumber = function(value) {
    logging('addNumber start');
    if (value === '0' && screen.textContent === '0') return;
    if (screen.textContent === 'Error') clear();
    let displayValue = (newLine && value !== '.') ? value : screen.textContent + value;
    if (newLine) {
        newLine = false;
        if (calculated) {
            fNum = null;
            sNum = null;
            operator = null;
        }
    }
    updateScreen(displayValue);
    logging('addNumber end');
}

const clear = function () {
    operator = null;
    fNum = null;
    sNum = null;
    newLine = true;
    calculated = false;
    updateScreen();
}
const setOperator = function(btnOperator) {
    logging('setOperator start');
    if (screen.textContent === 'Error') return;
    if(!operator) operator = btnOperator;
    newLine = true;
    if (fNum === null) {
        fNum = parseFloat(screen.textContent);
    } else {
        operator = btnOperator;
    }
    if (calculated) calculated = false;
    logging('setOperator end');
}

const removeNumber = function() {
    console.log('Remove');
    if (screen.textContent === '0') return;
    let screenArr = screen.textContent.split('');
    if (screenArr.length > 1) { 
        screenArr.pop();
    } else {
        screenArr = ['0'];
    }
    screen.textContent = screenArr.join('');
    if (fNum && newLine) fNum = +screen.textContent;
}

const toggleMinus = function() {
    logging('toggleMinus start');
    if (screen.textContent === '0') return;
    let screenArr = screen.textContent.split('');
    if (screenArr[0] === '-') {
        screenArr.shift();
    } else {
        screenArr.unshift('-');
    }
    screen.textContent = screenArr.join('');
    if (fNum && newLine) fNum = +screen.textContent;
    logging('toggleMinus end');
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
    if (fNum !== null) {
        if (!calculated) sNum = parseFloat(screen.textContent);
        operate(fNum, sNum, operator);
    } else {
        clear();
    }
});

decBtn.addEventListener('click', (button) => {
    addNumber('.');
});

delBtn.addEventListener('click', removeNumber);

minBtn.addEventListener('click', toggleMinus);
