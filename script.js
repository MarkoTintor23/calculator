class Calculator {
  constructor() {
    this.numberButtons = document.querySelectorAll("[data-number]");
    this.operationButtons = document.querySelectorAll("[data-operation]");
    this.allClearButton = document.querySelector("[data-all-clear]");
    this.equalsButton = document.querySelector("[data-equals]");
    this.previousOperandText = document.querySelector(
      "[data-previous-operand]"
    );
    this.currentOperandText = document.querySelector("[data-current-operand]");
    this.deleteButton = document.querySelector("[data-delete]");
    this.decimalButton = document.querySelector("[data-decimal]");
    this.currentOperand = "";
    this.previousOperand = "";
    this.operation = null;

    this.addEventListeners();
  }
  addEventListeners() {
    this.numberButtons.forEach((button) => {
      button.addEventListener("click", this.numberBtnHandler.bind(this));
    });
    this.operationButtons.forEach((button) => {
      button.addEventListener("click", this.operationsHandler.bind(this));
    });
    this.equalsButton.addEventListener("click", this.equalsHandler.bind(this));
    this.allClearButton.addEventListener(
      "click",
      this.AllClearHandler.bind(this)
    );
    this.decimalButton.addEventListener(
      "click",
      this.decimalHandler.bind(this)
    );
    this.deleteButton.addEventListener("click", this.deleteHandler.bind(this));
  }
  numberBtnHandler(e) {
    this.currentOperand += e.target.textContent;
    this.previousOperandText.textContent = this.currentOperand;
  }
  operationsHandler(e) {
    if (this.currentOperand === "") return;
    if (this.previousOperand !== "") {
      this.calculate();
    }
    this.operation = e.target.textContent;
    this.previousOperand = this.currentOperand;
    this.currentOperand = "";
    this.previousOperandText.textContent =
      this.previousOperand + " " + this.operation;
  }
  equalsHandler() {
    if (this.currentOperand === "" || this.previousOperand === "") return;
    this.calculate();
    this.currentOperandText.textContent = this.currentOperand;
    this.previousOperandText.textContent = "";
    this.previousOperand = "";
  }
  calculate() {
    let result;
    const prev = parseFloat(this.previousOperand);
    const current = parseFloat(this.currentOperand);
    if (isNaN(prev) || isNaN(current)) return;

    switch (this.operation) {
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
    this.currentOperand = result.toString();
  }

  AllClearHandler() {
    this.currentOperand = "";
    this.previousOperand = "";
    this.operation = null;
    this.currentOperandText.textContent = "";
    this.previousOperandText.textContent = "";
  }
  deleteHandler() {
    if (this.currentOperand === "") return;
    this.currentOperand = this.currentOperand.slice(0, -1);
    this.currentOperandText.textContent = this.currentOperand;

    this.previousOperandText.textContent =
      this.previousOperand && this.operation
        ? this.previousOperand + " " + this.operation
        : "";
  }
  decimalHandler() {
    if (this.currentOperand.includes(".")) return;
    this.currentOperand += ".";
    this.currentOperandText.textContent = this.currentOperand;
  }
}

const calc = new Calculator();
