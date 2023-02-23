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
let clearButton = document.querySelector("#clear");
let undoButton = document.querySelector("#undo");
let dotButton = document.querySelector("#dot");
let mainDisplay = document.querySelector(".main-display");
let secondaryDisplay = document.querySelector(".secondary-display");


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


equalButton.onclick = (event) => operationOrEqualPushed(event.target.value);
clearButton.onclick = () => clearDisplayAndMemory();
undoButton.onclick = () => undoLastInput();
dotButton.onclick = (event) => numericButtonPushed(event.target.value);


function clearDisplayAndMemory() {
    clearOperation();
    clearNumbers();
    clearUserNumberArray();
    clearMainDisplay("0");
    clearSecondaryDisplay();
}

function undoLastInput() {
    if (userNumberStrings.length > 0) {
        userNumberStrings.pop();
        removeLastCharacterFromMain();
    }
    else {
        clearSecondaryDisplay();
    }
}

function removeLastCharacterFromMain() {
    let currentMainDisplayText = mainDisplay.innerHTML;
    mainDisplay.innerHTML = currentMainDisplayText.substring(0, currentMainDisplayText.length - 1);
}

function numericButtonPushed(value) {
    if (userNumberStrings.length === 0 && mainDisplay.innerHTML === "0") {
        mainDisplay.innerHTML = "";
    }
    if (userNumberStrings.length === 0 && numbers.length === 0) {
        userNumberStrings.push(value);
    } else if (userNumberStrings.length === 0 && numbers.length === 1) {
        userNumberStrings.push(value);
    } else if (userNumberStrings.length > 0) {
        userNumberStrings.push(value);
    }
}

function addToMainDisplay(value) {
    if (value === "." && mainDisplay.innerHTML.indexOf('.') !== -1) {
        if (numbers.length !== 1) {
            return
        } else {
            mainDisplayValue += value;
            mainDisplay.innerHTML += value;
        }
    } else {
        mainDisplayValue += value;
        mainDisplay.innerHTML += value;
    }
}

function clearMainDisplay(defaultValue) {
    mainDisplayValue = "";
    mainDisplay.innerHTML = defaultValue;
}

function clearSecondaryDisplay() {
    secondaryDisplayValue = "";
    secondaryDisplay.innerHTML = "";
}

function addToSecondaryDisplay(value) {
    secondaryDisplayValue = value;
    secondaryDisplay.innerHTML = value;
}

function clearOperation() {
    userOperation = "";
}

function operationOrEqualPushed(operation) {
    if (operation === "=" && numbers.length === 1 && userNumberStrings.length > 0) {
        numbers.push(concatenateNumber(userNumberStrings));
        clearUserNumberArray();
        let result = operate(numbers, userOperation);
        clearNumbers();
        addToSecondaryDisplay(mainDisplay.innerHTML + "=");
        clearMainDisplay("");
        addToMainDisplay(result);
        userOperation = operation;
    } else if (operation === "=" && numbers.length === 1 && userNumberStrings.length === 0) {
        numbers.push(numbers[0]);
        addToMainDisplay(numbers[0]);
        let result = operate(numbers, userOperation);
        clearNumbers();
        addToSecondaryDisplay(mainDisplay.innerHTML + "=");
        clearMainDisplay("");
        addToMainDisplay(result);
        userOperation = operation;
    } else if (operation === "=" && numbers.length === 0) {
        return
    } else if (operation !== "=" && userOperation !== "" && numbers.length === 1) {
        userOperation = operation;
        removeLastCharacterFromMain();
    } else if (operation !== "=" && userNumberStrings.length > 0) {
        userOperation = operation;
        numbers.push(concatenateNumber(userNumberStrings));
        clearUserNumberArray();
    } else if (operation !== "=" && userNumberStrings.length === 0 && numbers.length === 0 && userOperation !== "=") {
        numbers.push(0);
        userOperation = operation;
        addToMainDisplay("0");
    } else if (operation !== "=" && userNumberStrings.length === 0 && numbers.length === 0 && userOperation === "=") {
        numbers.push(convertStringToNumber(mainDisplayValue));
        userOperation = operation;
    }
}

function concatenateNumber(userNumberStrings) {
    return convertStringsArrayToNumber(userNumberStrings);
}

function convertStringsArrayToNumber(stringArray) {
    if (stringArray.includes(".")) {
        return round(parseFloat(stringArray.join("")), 2);
    } else {
        return parseInt(stringArray.join(""));
    }
}

function convertStringToNumber(text) {
    if (text.indexOf('.') !== -1) {
        return round(parseFloat(text), 2);
    } else {
        return parseInt(text);
    }
}

function clearUserNumberArray() {
    userNumberStrings = [];
}

function clearNumbers() {
    numbers = [];
}

function add(numbers) {
    return round(numbers[0] + numbers[1], 2);
}

function subtract(numbers) {
    return round(numbers[0] - numbers[1], 2);
}

function multiply(numbers) {
    return round(numbers[0] * numbers[1], 2);
}

function divide(numbers) {
    return round(numbers[0] / numbers[1], 2);
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