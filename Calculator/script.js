const num0 = document.getElementById("num0");
const num1 = document.getElementById("num1");
const num2 = document.getElementById("num2");
const num3 = document.getElementById("num3");
const num4 = document.getElementById("num4");
const num5 = document.getElementById("num5");
const num6 = document.getElementById("num6");
const num7 = document.getElementById("num7");
const num8 = document.getElementById("num8");
const num9 = document.getElementById("num9");
const numC = document.getElementById("numC");
const plus = document.getElementById("num-plus");
const minus = document.getElementById("num-minus");
const divide = document.getElementById("num-divide");
const multiply = document.getElementById("num-multiply");
const equal = document.getElementById("num-equal");
const buttons = document.querySelectorAll(".box");
const display = document.getElementById("display")

buttons.forEach((button) => {
    button.addEventListener("mousedown", e => {
        button.style.backgroundColor = "gray";
    });
    button.addEventListener("mouseup", e => {
        button.style.backgroundColor = "white";
    });
});

numC.addEventListener("click", e => {
    display.value = " ";
});
num0.addEventListener("click", e => {
    display.value += "0";
});
num1.addEventListener("click", e => {
    display.value += "1";
});
num2.addEventListener("click", e => {
    display.value += "2";
});
num3.addEventListener("click", e => {
    display.value += "3";
});
num4.addEventListener("click", e => {
    display.value += "4";
});
num5.addEventListener("click", e => {
    display.value += "5";
});
num6.addEventListener("click", e => {
    display.value += "6";
});
num7.addEventListener("click", e => {
    display.value += "7";
});
num8.addEventListener("click", e => {
    display.value += "8";
});
num9.addEventListener("click", e => {
    display.value += "9";
});
minus.addEventListener("click", e => {
    display.value += "-";
});
plus.addEventListener("click", e => {
    display.value += "+";
});
multiply.addEventListener("click", e => {
    display.value += "*";
});
divide.addEventListener("click", e => {
    display.value += "/";
});

equal.addEventListener("click", e => {
    let equation = document.getElementById("display").value;
    console.log(equation);
  
    const calculate = (equation = '') => {
      const operators = {
        '+': { precedence: 1 },
        '-': { precedence: 1 },
        '*': { precedence: 2 },
        '/': { precedence: 2 },
      };
  
      const applyOperator = (operator, operand1, operand2) => {
        switch (operator) {
          case '+':
            return operand1 + operand2;
          case '-':
            return operand1 - operand2;
          case '*':
            return operand1 * operand2;
          case '/':
            return operand1 / operand2;
          default:
            return 0;
        }
      };
  
      let tokens = equation.match(/[+\-*/()]|\d+(\.\d+)?/g) || [];
      let operandStack = [];
      let operatorStack = [];
  
      tokens.forEach(token => {
        if (/\d+(\.\d+)?/.test(token)) {
          operandStack.push(parseFloat(token));
        } else if (token === '(') {
          operatorStack.push(token);
        } else if (token === ')') {
          while (
            operatorStack.length > 0 &&
            operatorStack[operatorStack.length - 1] !== '('
          ) {
            let operator = operatorStack.pop();
            let operand2 = operandStack.pop();
            let operand1 = operandStack.pop();
            let result = applyOperator(operator, operand1, operand2);
            operandStack.push(result);
          }
  
          if (
            operatorStack.length > 0 &&
            operatorStack[operatorStack.length - 1] === '('
          ) {
            operatorStack.pop();
          }
        } else {
          while (
            operatorStack.length > 0 &&
            operators[token].precedence <=
              operators[operatorStack[operatorStack.length - 1]].precedence
          ) {
            let operator = operatorStack.pop();
            let operand2 = operandStack.pop();
            let operand1 = operandStack.pop();
            let result = applyOperator(operator, operand1, operand2);
            operandStack.push(result);
          }
  
          operatorStack.push(token);
        }
      });
  
      while (operatorStack.length > 0) {
        let operator = operatorStack.pop();
        let operand2 = operandStack.pop();
        let operand1 = operandStack.pop();
        let result = applyOperator(operator, operand1, operand2);
        operandStack.push(result);
      }
  
      return operandStack.pop();
    };
  
    alert(calculate(equation));
  });
  