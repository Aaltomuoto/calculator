let fNum = null,
    sNum = null,
    operator = null,
    newLine = true,
    calculated = false,
    activeBtn,
    theBtn;

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
        'screen':screen.textContent,
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
    if (!first || !second || !theOperator) return;
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
    // limit the result to 3 decimal points
    result = result.toFixed(3);
    //remove trailing zeroes from results
    let resultArr = result.split('');
    if (resultArr.indexOf('.') > -1) {
        for (let i = resultArr.length-1; i > 0; i--) {
            if (resultArr[i] === '0') {
                 resultArr.pop();
            } else {
                break;
            }
        }
        result = +resultArr.join('');
    }
    fNum = result;
    newLine = true;
    calculated = true;
    updateScreen(fNum);
    logging('calculated');
};

const updateScreen = function(value = 0) {
    screen.textContent = value;
}

const addNumber = function(value) {
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
}
const clearOpBtn = function() {
    opBtn.forEach(button => {
        button.classList.remove('active');
    });
}
const clear = function() {
    operator = null;
    fNum = null;
    sNum = null;
    newLine = true;
    calculated = false;
    clearOpBtn();
    updateScreen();
    logging('clear');
}
const setOperator = function(btnOperator) {
    logging('setOperator start');
    if (screen.textContent === 'Error') return;
    activeBtn = document.querySelector('.opBtn.active');
    theBtn = document.querySelector(`button[data-operator='${btnOperator}']`);
    if (activeBtn === theBtn && newLine) return;
    if (activeBtn) activeBtn.classList.remove('active');
    theBtn.classList.add('active');
    if (!operator) {
        operator = btnOperator;
        newLine = true;
        fNum = +screen.textContent;
    } else {
        if (fNum && !calculated) {
            sNum = parseFloat(screen.textContent);
            operate(fNum, sNum, operator);
            operator = btnOperator;
        } else {
            operator = btnOperator;
            sNum = null;
        }
    }

    if (calculated) calculated = false;
    logging('setOperator end');
}

const removeNumber = function() {
    if (screen.textContent === '0') return;
    let screenArr = screen.textContent.split('');
    if (screenArr.length > 1) { 
        screenArr.pop();
    } else {
        screenArr = [0];
        newLine = true;
    }
    screen.textContent = screenArr.join('');
    fNum = (fNum) ? +screenArr.join('') : fNum;
}

const toggleMinus = function() {
    if (screen.textContent === '0') return;
    let screenArr = screen.textContent.split('');
    if (screenArr[0] === '-') {
        screenArr.shift();
    } else {
        screenArr.unshift('-');
    }
    screen.textContent = screenArr.join('');
    if (fNum && newLine) fNum = +screen.textContent;
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
        clearOpBtn();
    } else {
        clear();
    }
});

decBtn.addEventListener('click', (button) => {
    addNumber('.');
});

delBtn.addEventListener('click', removeNumber);

minBtn.addEventListener('click', toggleMinus);
