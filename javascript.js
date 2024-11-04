function add(a, b) {
  return a + b;
}

function subtract(a, b) {
  return a - b;
}

function multiply(a, b) {
  return a * b;
}

function divide(a, b) {
  if (b === 0) {
    return "Hey dude, you can't divide by 0!";
  } else {
    return a / b;
  }
}

let numberA = null;
let operator = "";
let numberB = null;

// operate function takes an operator and two numbers and then calls one of the above functions
function operate(operator, numberA, numberB) {
  if (operator === "+") return add(numberA, numberB);
  if (operator === "-") return subtract(numberA, numberB);
  if (operator === "*") return multiply(numberA, numberB);
  if (operator === "/") return divide(numberA, numberB);
}

let displayValue = "0";

function updateDisplay() {
  document.querySelector(".display").textContent = displayValue;
}

// reset function to clear display
function resetCalculator() {
  numberA = null;
  operator = "";
  numberB = null;
  displayValue = "0";
  updateDisplay();
}

// add event listeners for each button
const button = document.querySelectorAll(".button");

button.forEach((button) => {
  button.addEventListener("click", () => {
    const value = button.textContent;

    // check if the button is a number
    if (!isNaN(value)) {
      if (operator === "") {
        // numberA
        if (displayValue === "0")
          displayValue = value; // replace the initial '0'
        else displayValue += value;
        numberA = parseFloat(displayValue);
      } else {
        //numberB
        if (numberB === null) {
          displayValue += " " + value;
          numberB = parseFloat(value);
        }
      }

      updateDisplay();
    }
    // check if the button is operator
    else if (value === "+" || value === "-" || value === "*" || value === "/") {
      // If numberA and operator are set, and numberB has a value, calculate the result first
      if (numberA !== null && operator && numberB !== null) {
        // calculate the result
        let result = operate(operator, numberA, numberB);
        displayValue = result.toString();

        // update numberA to be the result and clear numberB
        numberA = result;
        numberB = null;
      }

      operator = value;
      displayValue += " " + operator + " ";
      updateDisplay();
    }

    // handle the = button
    if (value === "=") {
      let result = operate(operator, numberA, numberB);
      displayValue = result.toString();
      updateDisplay();
    }

    // handle the C button
    if (value === "C") {
      resetCalculator();
    }

    // handle the % button
    if (value === "%") {
      displayValue = (parseFloat(displayValue) / 100).toString();
      updateDisplay();
    }

    // handle the . button
    if (value === ".") {
      // check if displayValue already contains a dot
      if (!displayValue.includes(".")) {
        displayValue += ".";
        updateDisplay();
      }
    }

    // handle the backspace button
    if (value === "⌫") {
      // if the displayValue is more than 1 character, remove the last character
      if (displayValue.length > 1) {
        displayValue = displayValue.slice(0, -1); // removes the last character
      } else {
        displayValue = "0";
      }
      updateDisplay();
    }
  });
});
