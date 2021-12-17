// ToDo: Bug with operators without numbers
// ToDo: Add all operators

const numbers = document.querySelectorAll('.number');
const operators = document.querySelectorAll('.operator');
const previousOperation = document.querySelector('.previous__operation')
const currentOperation = document.querySelector('.current__operation');
const clearAll = document.querySelectorAll('.calculator__btn.big')[0];
const clearLast = document.querySelectorAll('.calculator__btn.big')[1];
const equals = document.querySelector('.equals');
let n1 = '';
let n2 = '';
let o = '';
let answer;

function operate(a, operator, b) {
  if (operator == '÷') {
    return +a / +b;
  } else if (operator == '×') {
    return +a * +b;
  } else if (operator == '-') {
    return +a - +b;
  } else if (operator == '+') {
    return +a + +b;
  }
}

function clear() {
  n1 = '';
  n2 = '';
  currentOperation.innerText = '0';
  previousOperation.innerText = '';
  answer = undefined
}

numbers.forEach(number => number.addEventListener('click', () => {
  if (currentOperation.innerText == '0') {
    currentOperation.innerText = number.innerText;
  } else {
    currentOperation.innerText += number.innerText;
  }
  n1 = currentOperation.innerText;
  if (currentOperation.innerText.length > 13) {
    currentOperation.innerText = currentOperation.innerText.substring(0, 13);
    n1 = n1.substring(0, 13);
  }
}))

clearAll.addEventListener('click', clear)

clearLast.addEventListener('click', () => {
  if (currentOperation.innerText.length == 1) {
    currentOperation.innerText = '0';
    n1 = '0';
  } else {
    n1 = n1.substring(0, n1.length - 1);
    currentOperation.innerText = currentOperation.innerText.substring(0, currentOperation.innerText.length - 1);
  }
})

operators.forEach(operator => operator.addEventListener('click', () => {
  if (o != '' && n1 != '' && n2 != '') {
    previousOperation.innerText = previousOperation.innerText + ' ' + n1 + ' =';
    answer = operate(n2, o, n1);
    currentOperation.innerText = answer
    n2 = '';
    n1 = answer;
    o = '';
  }
  o = operator.innerText;
  previousOperation.innerText = n1 + ' ' + o;
  n2 = n1;
  n1 = '';
  currentOperation.innerText = '0';
}))

equals.addEventListener('click', () => {
  if (o != '' && n1 != '' && n2 != '') {
    previousOperation.innerText = previousOperation.innerText + ' ' + n1 + ' =';
    answer = operate(n2, o, n1);

    if (answer == Infinity) {
      alert("You cant't divide by 0");
      clear();
    } else {

      if (answer.toString().length > 13) {
        if (answer.toString().indexOf('.') < 13 && answer.toString().indexOf('.') >= 0) {
          currentOperation.innerText = answer.toString().substring(0, 13);
        } else {
          currentOperation.innerText = '9999999999999';
        }
      } else {
        currentOperation.innerText = answer;
        n1 = currentOperation.innerText;
        n2 = '';
        o = '';
      }

    }
  }
})