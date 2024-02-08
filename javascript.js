let fNum = null,
    sNum = null,
    operator = null,
    display = '0';


const screen = document.querySelector('#calculatorScreen');
const numberButtons = document.querySelectorAll('#calculatorButtons button.number');
const operatorButtons = document.querySelectorAll('#calculatorButtons button.operator');
const clearButton = document.querySelector('#clear');
const calculateButton = document.querySelector('#calculate');

const add = function(a, b) {
    return +a + +b;
};

const subtract = function(a, b) {
    return +a - +b;
};

const multiply = function(a, b) {
    return +a * +b;
};

const divide = function(a, b) {
    return +a / +b;
};

const operate = function(fNum, sNum, operator) {
    let result;
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
    updateScreen(result);
};

const updateScreen = function(value = '0') {
    //if (display === '0' && value === '0') return
    display = (display === '0') ? value : display + value;
    screen.textContent = display;
}

const addnumber = function(value) {
    console.log(`Add number: ${value}`);
    updateScreen(value);
}

const clear = function () {
    display = '0';
    updateScreen();
    operator = null;
    fNum = null;
    sNum = null;
}

// add eventlisteners to buttons
numberButtons.forEach((button) => {
    button.addEventListener('click', (e) => {
        addnumber(button.textContent);
    });
});

operatorButtons.forEach((button) => {
    button.addEventListener('click', (e) => {
        operator = button.dataset.operator;
        fNum = display;
        display ='0';
        updateScreen(display);
    });
});

clearButton.addEventListener('click', clear);

calculateButton.addEventListener('click', () => {
    if (fNum) {
        console.log('operate');
        sNum = display;
        operate(fNum, sNum, operator);
    } else {
        clear();
    }
});
