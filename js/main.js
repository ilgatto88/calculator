let userNumber = [];
let userOperation = "";
let numbers = [];
let displayValue = "";


let numericButtons = document.querySelectorAll(".number");
let operationButtons = document.querySelectorAll(".operation");
let divideButton = document.querySelector("#divide");
let multiplyButton = document.querySelector("#multiply");
let subtractButton = document.querySelector("#subtract");
let addButton = document.querySelector("#add");
let equalButton = document.querySelector("#equal");

// equalButton.addEventListener("click", operate(numbers))

numericButtons.forEach(button => {
    button.addEventListener(
        "click", () => {
            userNumber.push(button.value);
        })
});


operationButtons.forEach(button => {
    button.addEventListener(
        "click", () => {
            operationorEqualPushed(button.value);
        })
});

equalButton.addEventListener("click", () => { operationorEqualPushed(); })

function operationorEqualPushed(operation) {
    if (userOperation !== "") {
        console.log("Equal button pushed")
        numbers.push(concatenateNumber(userNumber));
        console.log(`Numbers in array: ${numbers}`);
        clearUserNumberArray();
        console.log("User number array cleared.");
        let result = operate(numbers, userOperation);
        console.log(result);
        userOperation = "";
        clearNumbers();
    }
    else {
        userOperation = operation;
        console.log(`Operation selected: ${operation}`);
        numbers.push(concatenateNumber(userNumber));
        console.log(`Numbers in array: ${numbers}`);
        clearUserNumberArray();
        console.log("User number array cleared.");
    }
}

function concatenateNumber(userNumber) {
    return parseInt(userNumber.join(""));
}

function clearUserNumberArray() {
    userNumber = [];
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
    return numbers[0] / numbers[1]
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