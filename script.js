const numberButtons = document.querySelectorAll("[data-number]");
const operationButtons = document.querySelectorAll("[data-operation]");
const allClearButton = document.querySelector("[data-all-clear]");
const equalsButton = document.querySelector("[data-equals]");
const previousOperandText = document.querySelector("[data-previous-operand]");
const currentOperandText = document.querySelector("[data-current-operand]");
const deleteButton = document.querySelector("[data-delete]");
const decimalButton = document.querySelector("[data-decimal]");
let currentOperand = "";
let previousOperand = "";
let operation = null;

numberButtons.forEach((button) => {
  button.addEventListener("click", function () {
    currentOperand += button.textContent;
    previousOperandText.textContent = currentOperand;
  });
});
operationButtons.forEach((button) => {
  button.addEventListener("click", function () {
    if (currentOperand === "") return;
    if (previousOperand !== "") {
      calculate();
    }
    operation = button.textContent;
    previousOperand = currentOperand;
    currentOperand = "";
    previousOperandText.textContent = previousOperand + " " + operation;
  });
});

equalsButton.addEventListener("click", () => {
  if (currentOperand === "" || previousOperand === "") return;
  calculate();
  currentOperandText.textContent = currentOperand;
  previousOperandText.textContent = "";
  previousOperand = "";
});

function calculate() {
  let result;
  const prev = parseFloat(previousOperand);
  const current = parseFloat(currentOperand);
  if (isNaN(prev) || isNaN(current)) return;

  switch (operation) {
    case "+":
      result = prev + current;
      break;
    case "-":
      result = prev - current;
      break;
    case "x":
      result = prev * current;
      break;
    case "/":
      result = prev / current;
      break;
    default:
      return;
  }
  currentOperand = result.toString();
}
allClearButton.addEventListener("click", () => {
  currentOperand = "";
  previousOperand = "";
  operation = null;
  currentOperandText.textContent = "";
  previousOperandText.textContent = "";
});
deleteButton.addEventListener("click", () => {
  if (currentOperand === "") return;
  currentOperand = currentOperand.slice(0, -1);
  currentOperandText.textContent = currentOperand;

  previousOperandText.textContent =
    previousOperand && operation ? previousOperand + " " + operation : "";
});
decimalButton.addEventListener("click", () => {
  if (currentOperand.includes(".")) return;
  currentOperand += ".";
  currentOperandText.textContent = currentOperand;
});
