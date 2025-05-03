import React, { useState } from 'react';
import Display from './Display';
import ButtonPanel from './ButtonPanel';
import { formatNumber, calculateResult, validateInput } from '../utils/CalculatorUtils';
import { logAction } from '../Services/auditService';
import './Calculator.css';

const MAX_INPUT_LENGTH = 9;
const MAX_OUTPUT_LENGTH = 12;

const Calculator = () => {
  const [state, setState] = useState({
    currentInput: '0',
    expression: '',
    prevValue: null,
    operator: null,
    waitingForOperand: false,
    error: null
  });

  const handleError = (error) => {
    console.error('Calculator Error:', error);
    setState(prev => ({ 
      ...prev, 
      error: error.message || 'Calculation error',
      currentInput: 'Error'
    }));
    setTimeout(() => {
      setState(prev => ({ ...prev, error: null }));
    }, 3000);
  };

  const clearAll = () => {
    setState({
      currentInput: '0',
      expression: '',
      prevValue: null,
      operator: null,
      waitingForOperand: false,
      error: null
    });
    logAction('clearPressed', 'AC').catch(handleError);
  };

  const clearOneDigit = () => {
    if (state.waitingForOperand) return;
    
    setState(prev => {
      if (prev.currentInput.length === 1) {
        return { 
          ...prev, 
          currentInput: '0',
          expression: prev.expression.slice(0, -1)
        };
      }
      return {
        ...prev,
        currentInput: prev.currentInput.slice(0, -1),
        expression: prev.expression.slice(0, -1)
      };
    });
    logAction('backspacePressed', '⌫').catch(handleError);
  };

  const inputDigit = (digit) => {
    try {
      validateInput(digit);
      
      setState(prev => {
        if(prev.currentInput==='Error'){
          return {
            ...prev,
            currentInput: String(digit),
            expression:'',
            waitingForOperand: false,
            error: null
          };
        }
        else if (prev.waitingForOperand) {
          return {
            ...prev,
            currentInput: String(digit),
            expression: prev.expression + digit,
            waitingForOperand: false,
            error: null
          };
        }

        else if (prev.currentInput.replace('.', '').length >= MAX_INPUT_LENGTH) {
          return prev;
        }

        return {
          ...prev,
          currentInput: prev.currentInput === '0' ? String(digit) : prev.currentInput + digit,
          expression: prev.expression === '' ? String(digit) : prev.expression + digit,
          error: null
        };
      });
      logAction('numberEntered', digit).catch(handleError);
    } catch (error) {
      handleError(error);
    }
  };

  const inputDecimal = () => {
    try {
      setState(prev => {
        if(prev.currentInput==='Error'){
          return {
            ...prev,
            currentInput: '0.',
            expression:'',
            waitingForOperand: false,
            error: null
          };
        }
        else if (prev.waitingForOperand) {
          return {
            ...prev,
            currentInput: '0.',
            expression: prev.expression + '0.',
            waitingForOperand: false,
            error: null
          };
        }

        else if (prev.currentInput.includes('.')) {
          return prev;
        }

        else if (prev.currentInput.replace('.', '').length >= MAX_INPUT_LENGTH) {
          return prev;
        }

        return {
          ...prev,
          currentInput: prev.currentInput + '.',
          expression: prev.expression + '.',
          error: null
        };
      });

      logAction('decimalEntered', '.').catch(handleError);
    } catch (error) {
      handleError(error);
    }
  };

  const performOperation = (nextOperator) => {
    if(state.currentInput=='Error') return;
    try {
      setState(prev => {
        const inputValue = parseFloat(prev.currentInput);
        let newState = { ...prev };

        if (prev.operator && !prev.waitingForOperand) {
          const currentValue = prev.prevValue || 0;
          try {
            const result = calculateResult(currentValue, inputValue, prev.operator);
            newState.prevValue = result;
            newState.currentInput = formatNumber(result);
            newState.expression = `${formatNumber(result)}${nextOperator}`;
          } catch (error) {
             handleError(error)
          }
        } else if (!prev.waitingForOperand) {
          newState.prevValue = inputValue;
          newState.expression = `${inputValue}${nextOperator}`;
        } else {
          newState.expression = `${prev.expression.slice(0, -1)}${nextOperator}`;
        }

        return {
          ...newState,
          operator: nextOperator,
          waitingForOperand: true,
        };
      });

      logAction('operatorEntered', nextOperator).catch(handleError);
    } catch (error) {
      handleError(error);
    }
  };

  const handleEquals = () => {
    try {
      if (!state.operator || state.waitingForOperand) return;

      setState(prev => {
        const inputValue = parseFloat(prev.currentInput);
        let result;
        
        try {
          result = calculateResult(prev.prevValue || 0, inputValue, prev.operator);
        } catch (error) {
          handleError(error);
        }

        const formattedResult = formatNumber(result);
        const newExpression = `${prev.prevValue}${prev.operator}${inputValue}=${formattedResult}`;

        return {
          currentInput: formattedResult,
          expression: newExpression,
          prevValue: null,
          operator: null,
          waitingForOperand: false,
          error: null
        };
      });

      logAction('equalsPressed', '=').catch(handleError);
    } catch (error) {
      handleError(error);
    }
  };

  return (
    <div className="calculator">
      <Display 
        expression={state.expression}
        currentInput={state.currentInput}
        maxOutputLength={MAX_OUTPUT_LENGTH}
      />
      <ButtonPanel
        onDigitClick={inputDigit}
        onOperatorClick={performOperation}
        onClear={clearAll}
        onDecimal={inputDecimal}
        onEquals={handleEquals}
        onBackspace={clearOneDigit}
      />
    </div>
  );
};

export default Calculator;