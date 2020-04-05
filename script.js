class Calculator {

    constructor(previousOperandTextElement, currentOperandTextElement) {
        this.clear();

        this.previousOperandTextElement = previousOperandTextElement;
        this.currentOperandTextElement = currentOperandTextElement;
    }

    clear() {
        this.currentOperand = '';
        this.previousOperand = '';
        this.operation = undefined;
    }

    delete() {
        this.currentOperand = this.currentOperand.toString().slice(0, -1);
    }

    appendNumber(number) {
        if (number === '.' && this.currentOperand.includes('.')) return;
        this.currentOperand = this.currentOperand.toString() + number.toString();
    }

    chooseOperation(operation) {
        if (this.currentOperand === '' || this.operation == '') return
        if (this.prevousOperand !== '') {
            this.compute();
        }
        this.operation = operation;
        this.prevousOperand = this.currentOperand;
        this.currentOperand = '';
    }

    compute() {
        let computation;
        const prevNumber = parseFloat(this.prevousOperand);
        const currentNumber = parseFloat(this.currentOperand);
        if (isNaN(prevNumber) || isNaN(currentNumber)) return
        switch (this.operation) {
            case '+':
                computation = prevNumber + currentNumber;
                break;
            case '-':
                computation = prevNumber - currentNumber;
                break;
            case '*':
                computation = prevNumber * currentNumber;
                break;
            case '÷':
                computation = prevNumber / currentNumber;
                break;
            default:
                return
        }
        this.currentOperand = computation;
        this.operation = undefined;
        this.prevousOperand = '';
    }

    getDisplayNumber(number) {
        const stringNumber = number.toString();
        const integerDigits = parseFloat(stringNumber.split('.')[0]);
        const decimalDigits = stringNumber.split('.')[1];
        let integerDisplay;
        if (isNaN(integerDigits)) integerDisplay = '';
        else {
            integerDisplay = integerDigits.toLocaleString('en', {
                maximumFractionDigits: 0
            })
        }
        if (decimalDigits != null) {
            return `${integerDisplay}.${decimalDigits}`;
        }
        return integerDisplay;

    }

    updateDisplay() {
        this.currentOperandTextElement.innerText = this.getDisplayNumber(this.currentOperand);
        if (this.operation != null) {
            this.previousOperandTextElement.innerText = `${this.getDisplayNumber(this.prevousOperand)} ${this.operation}`;
        } else {
            this.previousOperandTextElement.innerText = this.getDisplayNumber(this.previousOperand);
        }

    }
}

const numberButtons = document.querySelectorAll('[data-number]');
const operationButtons = document.querySelectorAll('[data-operation]');
const equalsButton = document.querySelector('[data-equals]');
const deleteButton = document.querySelector('[data-delete]');
const allClearButton = document.querySelector('[data-all-clear]');
const previousOperandTextElement = document.querySelector('[data-previous-operand]');
const currentOperandTextElement = document.querySelector('[data-current-operand]');

const calculator = new Calculator(previousOperandTextElement, currentOperandTextElement);

numberButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.appendNumber(button.innerText);
        calculator.updateDisplay();
    })
})

operationButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.chooseOperation(button.innerText);
        calculator.updateDisplay();
    })
})

equalsButton.addEventListener('click', button => {
    calculator.compute();
    calculator.updateDisplay();
})

allClearButton.addEventListener('click', button => {
    calculator.clear();
    calculator.updateDisplay();
})

deleteButton.addEventListener('click', button => {
    calculator.delete();
    calculator.updateDisplay();
})
