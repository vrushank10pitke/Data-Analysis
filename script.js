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

function celebrate() {
    const container = document.getElementById("celebration");
    for (let burst = 0; burst < 5; burst++) {

        const centerX = Math.random() * window.innerWidth;
        const centerY = Math.random() * window.innerHeight * 0.7;

        for (let i = 0; i < 30; i++) {

            const particle = document.createElement("div");

            particle.classList.add("particle");

            particle.style.left = centerX + "px";
            particle.style.top = centerY + "px";

            const angle = Math.random() * Math.PI * 2;
            const distance = 80 + Math.random() * 150;

            particle.style.setProperty(
                "--x",
                Math.cos(angle) * distance + "px"
            );

            particle.style.setProperty(
                "--y",
                Math.sin(angle) * distance + "px"
            );

            particle.style.background =
                colors[Math.floor(Math.random() * colors.length)];

            container.appendChild(particle);

            setTimeout(() => {
                particle.remove();
            }, 800);
        }
    }
    celebrate();
}


    const colors = [
        "#ff0000",
        "#00ff00",
        "#ffff00",
        "#00ffff",
        "#ff00ff",
        "#ff8800"

    ];

    // Create several bursts
    
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
