let userNumberStrings = [];
let userOperation = "";
let numbers = [];
let mainDisplayValue = "";
let secondaryDisplayValue = "";


let numericButtons = document.querySelectorAll(".number");
let operationButtons = document.querySelectorAll(".operation");
let allPrintableButtons = document.querySelectorAll(".printable");
let divideButton = document.querySelector("#divide");
let multiplyButton = document.querySelector("#multiply");
let subtractButton = document.querySelector("#subtract");
let addButton = document.querySelector("#add");
let equalButton = document.querySelector("#equal");
let mainDisplay = document.querySelector(".main-display");
let secondaryDisplay = document.querySelector(".secondary-display");

// equalButton.addEventListener("click", operate(numbers))

numericButtons.forEach(button => {
    button.addEventListener(
        "click", () => {
            numericButtonPushed(button.value);
        })
});


operationButtons.forEach(button => {
    button.addEventListener(
        "click", () => {
            operationOrEqualPushed(button.value);
        })
});

allPrintableButtons.forEach(button => {
    button.addEventListener(
        "click", () => {
            addToMainDisplay(button.value);
        })
})

equalButton.onclick = (e) => operationOrEqualPushed(e.target.value);


function numericButtonPushed(value) {
    if (userNumberStrings.length === 0 && numbers.length === 0) {
        clearMainDisplay();
        userNumberStrings.push(value);
    } else if (userNumberStrings.length === 0 && numbers.length === 1) {
        userNumberStrings.push(value);
    } else if (userNumberStrings.length > 0) {
        userNumberStrings.push(value);
    }
}

function addToMainDisplay(value) {
    mainDisplayValue += value;
    mainDisplay.innerHTML += value;
}

function clearMainDisplay() {
    mainDisplayValue = "";
    mainDisplay.innerHTML = "";
}

function addToSecondaryDisplay(value) {
    secondaryDisplayValue = value;
    secondaryDisplay.innerHTML = value;
}

function operationOrEqualPushed(operation) {
    if (operation === "=" && numbers.length === 1 && userNumberStrings.length > 0) {
        numbers.push(concatenateNumber(userNumberStrings));
        clearUserNumberArray();
        let result = operate(numbers, userOperation);
        clearNumbers();
        addToSecondaryDisplay(mainDisplay.innerHTML + "=");
        clearMainDisplay();
        addToMainDisplay(result);
        userOperation = operation;
    } else if (operation === "=" && numbers.length === 1 && userNumberStrings.length === 0) {
        numbers.push(numbers[0]);
        addToMainDisplay(numbers[0]);
        let result = operate(numbers, userOperation);
        clearNumbers();
        addToSecondaryDisplay(mainDisplay.innerHTML + "=");
        clearMainDisplay();
        addToMainDisplay(result);
        userOperation = operation;
    } else if (operation === "=" && numbers.length === 0) {
        return
    } else if (operation !== "=" && userNumberStrings.length > 0) {
        userOperation = operation;
        numbers.push(concatenateNumber(userNumberStrings));
        clearUserNumberArray();
    } else if (operation !== "=" && userNumberStrings.length === 0 && numbers.length === 0 && userOperation !== "=") {
        numbers.push(0);
        userOperation = operation;
        addToMainDisplay("0");
    } else if (operation !== "=" && userNumberStrings.length === 0 && numbers.length === 0 && userOperation === "=") {
        numbers.push(parseInt(mainDisplayValue));
        userOperation = operation;
    }
}

function concatenateNumber(userNumberStrings) {
    return parseInt(userNumberStrings.join(""));
}

function clearUserNumberArray() {
    userNumberStrings = [];
}

function clearNumbers() {
    numbers = [];
}

function add(numbers) {
    return numbers[0] + numbers[1]
}

function subtract(numbers) {
    return numbers[0] - numbers[1]
}

function multiply(numbers) {
    return numbers[0] * numbers[1]
}

function divide(numbers) {
    return round(numbers[0] / numbers[1], 2)
}

function operate(numbers, operation) {
    switch (operation) {
        case "+":
            return add(numbers);
        case "-":
            return subtract(numbers);
        case "*":
            return multiply(numbers);
        case "/":
            return divide(numbers);
    }
}

function round(value, precision) {
    var multiplier = Math.pow(10, precision || 0);
    return Math.round(value * multiplier) / multiplier;
}