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
            result = divide(first, second);
            break;
        
    }
    fNum = result;
    newLine = true;
    updateScreen(result);
    calculated = true;
    logging('operate');
};

const updateScreen = function(value = 0) {
    screen.textContent = value;
}

const addnumber = function(value) {
    logging('addNumber before');
    let displayValue = (newLine) ? value : screen.textContent + value;
    if (newLine) newLine = false;
    updateScreen(displayValue);
    logging('addNumber after');
}

const clear = function () {
    operator = null;
    fNum = null;
    sNum = null;
    newLine = true;
    calculated = false;
    updateScreen();
    logging('setOperator clear');
}
const setOperator = function(btnOperator) {
    logging('setOperator start');
    if (operator === btnOperator && newLine) {
        operate(fNum, sNum, operator);
    } else {
        if(!operator) operator = btnOperator;
        newLine = true;
        if (fNum === null) {
            fNum = parseFloat(screen.textContent);
        } else if (calculated) {
            operator = btnOperator;
        } else {
            sNum = parseFloat(screen.textContent);
            operate(fNum, sNum, operator);
            operator = btnOperator;
        }
    }
    if (calculated) calculated = false;
    logging('setOperator end');
}
// add eventlisteners to buttons
numBtn.forEach((button) => {
    button.addEventListener('click', (e) => {
        addnumber(button.textContent);
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
