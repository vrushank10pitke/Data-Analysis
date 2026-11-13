let display = document.getElementById('display');
let currentInput = '0';
let previousValue = null;
let operator = null;
let shouldResetDisplay = false;

function updateDisplay() {
  display.textContent = currentInput;
}

function clearCalculator() {
  currentInput = '0';
  previousValue = null;
  operator = null;
  shouldResetDisplay = false;
  updateDisplay();
}

function appendNumber(value) {
  if (value === '.' && currentInput.includes('.')) return;

  if (currentInput === '0' && value !== '.') {
    currentInput = value;
  } else {
    if (shouldResetDisplay) {
      currentInput = value;
      shouldResetDisplay = false;
    } else {
      currentInput += value;
    }
  }

  updateDisplay();
}

function setOperator(nextOperator) {
  const value = Number(currentInput);

  if (operator && !shouldResetDisplay) {
    calculate();
  }

  previousValue = value;
  operator = nextOperator;
  shouldResetDisplay = true;
}

function calculate() {
  if (!operator || previousValue === null) return;

  const currentValue = Number(currentInput);
  let result;

  switch (operator) {
    case '+':
      result = previousValue + currentValue;
      break;
    case '-':
      result = previousValue - currentValue;
      break;
    case '*':
      result = previousValue * currentValue;
      break;
    case '/':
      result = currentValue === 0 ? 'Error' : previousValue / currentValue;
      break;
    default:
      return;
  }

  currentInput = String(result);
  previousValue = null;
  operator = null;
  shouldResetDisplay = true;
  updateDisplay();
}

function deleteLastDigit() {
  if (shouldResetDisplay) {
    currentInput = '0';
    shouldResetDisplay = false;
    updateDisplay();
    return;
  }

  currentInput = currentInput.length <= 1 ? '0' : currentInput.slice(0, -1);
  updateDisplay();
}

document.querySelectorAll('.number').forEach((button) => {
  button.addEventListener('click', () => {
    appendNumber(button.dataset.value);
  });
});

document.querySelectorAll('.operator').forEach((button) => {
  button.addEventListener('click', () => {
    const action = button.dataset.action;

    if (action === 'operator') {
      setOperator(button.dataset.value);
    }

    if (action === 'delete') {
      deleteLastDigit();
    }
  });
});

document.querySelector('.clear').addEventListener('click', clearCalculator);
document.querySelector('.equal').addEventListener('click', calculate);

updateDisplay();
