import React, { useState } from 'react';
import './Calculator.css';
import auditService from '../Services/auditService';

const MAX_INPUT_LENGTH = 10;
const MAX_OUTPUT_LENGTH = 16;

//util function
const formatNumber = (num) => {
  // Format numbers to fit display constraints
  const str = num.toString();
  
  if (str.length <= MAX_OUTPUT_LENGTH) {
    return str;
  }
  
  // Use scientific notation for very large/small numbers
  return num.toExponential(8).replace(/(\.\d*?[1-9])0+e/, '$1e');
};

const Calculator = () => {
  const [currentInput, setCurrentInput] = useState('0');
  const [expression, setExpression] = useState('');
  const [prevValue, setPrevValue] = useState(null);
  const [operator, setOperator] = useState(null);
  const [waitingForOperand, setWaitingForOperand] = useState(false);
  const [history, setHistory] = useState([]);

  const logAction = async (action, value) => {
    const event = {
      id: history.length + 1,
      timestamp: Math.floor(Date.now() / 1000),
      action,
      value: String(value)
    };
    
    setHistory([...history, event]);
    
    try {
      await auditService.logAction(event);
    } catch (error) {
      console.error('Error logging action:', error);
    }
  };

  const clearAll = () => {
    setCurrentInput('0');
    setExpression('');
    setPrevValue(null);
    setOperator(null);
    setWaitingForOperand(false);
    logAction('clearPressed', 'AC');
  };

  const inputDigit = (digit) => {
    if (currentInput?.toString().replace('.', '').length >= MAX_INPUT_LENGTH) return;
    if (waitingForOperand) {
      setCurrentInput(String(digit));
      setWaitingForOperand(false);
      setExpression(expression + String(digit));
    } else {
      setCurrentInput(currentInput === '0' ? String(digit) : currentInput + digit);
      setExpression(expression === '' ? String(digit) : expression + String(digit));
    }
    logAction('numberEntered', digit);
  };

  const inputDecimal = () => {
    if (currentInput.includes('.')) return;
    if (waitingForOperand) {
      setCurrentInput('0.');
      setExpression(expression + '0.');
      setWaitingForOperand(false);
      return;
    }

    if (!currentInput.includes('.')) {
      setCurrentInput(currentInput + '.');
      setExpression(expression + '.');
    }
    logAction('decimalEntered', '.');
  };

  const performOperation = (nextOperator) => {
    const inputValue = parseFloat(currentInput);

    // If there's an existing operator and we're not waiting for a new operand
    if (operator && !waitingForOperand) {
      const currentValue = prevValue || 0;
      let newValue;
      
      switch (operator) {
        case '+':
          newValue = currentValue + inputValue;
          break;
        case '-':
          newValue = currentValue - inputValue;
          break;
        case '*':
          newValue = currentValue * inputValue;
          break;
        case '/':
          newValue = currentValue / inputValue;
          break;
        default:
          newValue = inputValue;
      }

      setPrevValue(newValue);
      setCurrentInput(String(newValue));
    } else if (!waitingForOperand) {
      // No operator yet, just store the current input
      setPrevValue(inputValue);
    }

    // Update the expression with the operator (unless it's the first input)
    if (expression !== '' || nextOperator === '-') {
      // Handle negative numbers
      if (nextOperator === '-' && (expression === '' || 
          ['+', '-', '*', '/'].includes(expression.slice(-1)))) {
        setExpression(expression + nextOperator);
      } else {
        // Replace the last operator if user changes their mind
        const lastChar = expression.slice(-1);
        if (['+', '-', '*', '/'].includes(lastChar)) {
          setExpression(expression.slice(0, -1) + nextOperator);
        } else {
          setExpression(expression + nextOperator);
        }
      }
    }

    setWaitingForOperand(true);
    setOperator(nextOperator);
    logAction('operatorEntered', nextOperator);
  };

  const handleEquals = () => {
    if (!operator) return;
    
    const inputValue = parseFloat(currentInput);
    let result;
    
    if (prevValue !== null) {
      switch (operator) {
        case '+':
          result = prevValue + inputValue;
          break;
        case '-':
          result = prevValue - inputValue;
          break;
        case '*':
          result = prevValue * inputValue;
          break;
        case '/':
          result = prevValue / inputValue;
          break;
        default:
          result = inputValue;
      }

      const formattedResult = formatNumber(result);
    setExpression(prev => `${prev}=${formattedResult}`);
    setCurrentInput(formattedResult);
      setPrevValue(null);
      setOperator(null);
      setWaitingForOperand(false);
    }
    
    logAction('equalsPressed', '=');
  };

  const displayClass = currentInput.length > MAX_OUTPUT_LENGTH ? 'small-text' : '';
  const expressionClass = expression.length > MAX_OUTPUT_LENGTH * 2 ? 'small-text' : '';

  return (
    <div className="calculator">
      <div className="display">
        <div className={`expression ${expressionClass}`}>{expression}</div>
        <div className={`current-input ${displayClass}`}>{currentInput}</div>
      </div>
      <div className="buttons">
        {/* First row */}
        <div className="row">
          <button className="span-2 function-btn" onClick={clearAll}>
            AC
          </button>
          <button className="function-btn" onClick={inputDecimal}>
            .
          </button>
          <button
            className="operator-btn"
            onClick={() => performOperation("/")}
          >
            /
          </button>
        </div>

        {/* Second row */}
        <div className="row">
          <button
            className="operator-btn"
            onClick={() => performOperation("*")}
          >
            ×
          </button>
          <button className="number-btn" onClick={() => inputDigit(7)}>
            7
          </button>
          <button className="number-btn" onClick={() => inputDigit(8)}>
            8
          </button>
          <button className="number-btn" onClick={() => inputDigit(9)}>
            9
          </button>
        </div>

        {/* Third row */}
        <div className="row">
          <button
            className="operator-btn"
            onClick={() => performOperation("-")}
          >
            −
          </button>
          <button className="number-btn" onClick={() => inputDigit(4)}>
            4
          </button>
          <button className="number-btn" onClick={() => inputDigit(5)}>
            5
          </button>
          <button className="number-btn" onClick={() => inputDigit(6)}>
            6
          </button>
        </div>

        {/* Fourth row */}
        <div className="row">
          <button
            className="operator-btn"
            onClick={() => performOperation("+")}
          >
            +
          </button>
          <button className="number-btn" onClick={() => inputDigit(1)}>
            1
          </button>
          <button className="number-btn" onClick={() => inputDigit(2)}>
            2
          </button>
          <button className="number-btn" onClick={() => inputDigit(3)}>
            3
          </button>
        </div>

        {/* Fifth row */}
        <div className="row">
          <button className="equals-btn" onClick={handleEquals}>
            =
          </button>
          <button className="number-btn span-3" onClick={() => inputDigit(0)}>
            0
          </button>
        </div>
      </div>
    </div>
  );
};

export default Calculator;