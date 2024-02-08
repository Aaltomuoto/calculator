let fNum = null,
    sNum = null,
    operator = null,
    displayValue = 0;


const screen = document.querySelector('#calculatorScreen');
const numberButtons = document.querySelectorAll('#calculatorButtons button.number');
const operatorButtons = document.querySelectorAll('#calculatorButtons button.operator');
const clearButton = document.querySelector('#clear');
const calculateButton = document.querySelector('#calculate');

const logging = function(where = 'unknown') {
    console.log({'where': where,'fNum':fNum,'sNum':sNum,'operator':operator,'displayValue':displayValue});
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

const operate = function(first, second, operator) {
    let result = 'Error';
    switch(operator) {
        case 'add':
            result = add(fNum, sNum);
            break;
        case 'subtract':
            result = subtract(fNum, sNum);
            break;
        case 'multiply':
            result = multiply(fNum, sNum);
            break;
        case 'divide':
            result = divide(fNum, sNum);
            break;
        
    }
    clear();
    fNum = result;
    displayValue = 0;
    updateScreen(result);
    logging('operate');
};

const updateScreen = function(value = 0) {
    screen.textContent = value;
    logging('updatescreen');
}

const addnumber = function(value) {
    displayValue = (displayValue === 0) ? value : displayValue + value;
    fNum = (operator === null) ? null : fNum;
    updateScreen(displayValue);
}

const clear = function () {
    displayValue = 0;
    operator = null;
    fNum = null;
    sNum = null;
    updateScreen(displayValue);
}
const setOperator = function(btnOperator) {
    if (fNum === null) {
        operator = btnOperator;
        fNum = parseFloat(displayValue);
        updateScreen(displayValue);
        displayValue = 0;
        logging('setOperator Null');
    } else if (operator) {
        sNum = parseFloat(displayValue);
        operate(fNum, sNum, operator);
        operator = btnOperator;
        displayValue = 0;
        logging('setOperator operator');
    } else {
        operator = btnOperator;
        logging('setOperator else');
    }
}
// add eventlisteners to buttons
numberButtons.forEach((button) => {
    button.addEventListener('click', (e) => {
        addnumber(button.textContent);
    });
});

operatorButtons.forEach((button) => {
    button.addEventListener('click', () => {
        setOperator(button.dataset.operator);
    });
});

clearButton.addEventListener('click', clear);

calculateButton.addEventListener('click', () => {
    if (fNum !== null) {
        sNum = parseFloat(displayValue);
        operate(fNum, sNum, operator);
    } else {
        clear();
    }
});
