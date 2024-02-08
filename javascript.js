let fNum,
    sNum,
    operator,
    display = '';


const screen = document.querySelector('#calculatorScreen');
const numberButtons = document.querySelectorAll('#calculatorButtons button.number');
const clearButton = document.querySelector('#clear');
const calculateButton = document.querySelector('#calculate');

const add = function() {

};

const subtract = function() {

};

const multiply = function() {

};

const divide = function() {

};

const operate = function(fNum, sNum, operator) {

};

const updateScreen = function(value) {

}

const addnumber = function(value) {
    console.log(`Add number: ${value}`);
    updateDisplay(value);
}

const clear = function () {
    display = '0';
    screen.textContent = '0';
}

const calculate = function() {
    console.log('Calculate');
}

const updateDisplay = function(value) {
    if (display === '0' && value === '0') return
    display  = (display === '0') ? value : display + value;
    screen.textContent = display;
}

// add eventlisteners to buttons
numberButtons.forEach((button) => {
    button.addEventListener('click', (e) => {
        addnumber(button.textContent);
    });
});

clearButton.addEventListener('click', (e) => {
    clear();
});

calculateButton.addEventListener('click', (e) => {
    calculate();
});
