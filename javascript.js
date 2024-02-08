let fNum = null,
    sNum = null,
    operator = null,
    display = 0;


const screen = document.querySelector('#calculatorScreen');
const numberButtons = document.querySelectorAll('#calculatorButtons button.number');
const operatorButtons = document.querySelectorAll('#calculatorButtons button.operator');
const clearButton = document.querySelector('#clear');
const calculateButton = document.querySelector('#calculate');

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
    display = result;
    updateScreen(result);

};

const updateScreen = function(value = '0') {
    screen.textContent = value;
}

const addnumber = function(value) {
    display = (display === 0) ? value : display + value;
    updateScreen(display);
}

const clear = function () {
    display = 0;
    operator = null;
    fNum = null;
    sNum = null;
    updateScreen();
}
const setOperator = function(btnOperator) {
    if (fNum === null) {
        operator = btnOperator;
        fNum = parseFloat(display);
        updateScreen(display);
        display = 0;
        console.log('isnull')
    } else {
    // }
        sNum = parseFloat(display);
        operate(fNum, sNum, operator);
        operator = btnOperator;
        display = 0;
        console.log('notnull')
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
        console.log('operate');
        sNum = parseFloat(display);
        operate(fNum, sNum, operator);
    } else {
        clear();
    }
});
