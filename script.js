const clearBtn = document.querySelector("#clear");
const equals = document.querySelector(".equals");
const display = document.querySelector("#display");

const numberButtons = document.querySelectorAll(".number");
const operatorButtons = document.querySelectorAll(".operator");

let firstOperand = "";
let secondOperand = "";
let currentOperator = "";
let shouldResetDisplay = false;

numberButtons.forEach((button) => {
  button.addEventListener("click", function () {
    if (shouldResetDisplay) {
      display.textContent = "";
    }
    display.textContent += button.textContent;
  });
});

operatorButtons.forEach((button) => {
  button.addEventListener("click", function () {
    if (currentOperator) evaluate();
    firstOperand = display.textContent;
    currentOperator = button.textContent;
    shouldResetDisplay = true;
  });
});

equals.addEventListener("click", function () {
  if (!currentOperator || shouldResetDisplay) return;
  evaluate();
  currentOperator = "";
});

const evaluate = function () {
  secondOperand = display.textContent;
  console.log("First Operand:", firstOperand);
  console.log("Second Operand:", secondOperand);
  console.log("Operator:", currentOperator);
  const first = parseFloat(firstOperand);
  const second = parseFloat(secondOperand);

  let result;
  if (currentOperator === "+") {
    result = first + second;
  } else if (currentOperator === "-") {
    result = first - second;
  } else if (currentOperator === "x") {
    result = first * second;
  } else if (currentOperator === "/") {
    result = first / second;
  }
  display.textContent = result.toString();
  shouldResetDisplay = true;
};
