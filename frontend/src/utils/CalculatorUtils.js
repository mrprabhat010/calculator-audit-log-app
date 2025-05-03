export const formatNumber = (num) => {
    if (isNaN(num)) return 'Undefined';
    
    const str = num.toString();
    if (str.length <= 12) return str;
    
    return num.toExponential(8)
      .replace(/(\.\d*?[1-9])0+e/, '$1e')
      .replace(/\.?0+e/, 'e');
  };
  
  export const calculateResult = (prevValue, currentValue, operator) => {
    console.log(operator,currentValue===0)
    if (operator === '/' && currentValue === 0) {
      throw 'Division by zero';
    }
  
    switch (operator) {
      case '+': return prevValue + currentValue;
      case '-': return prevValue - currentValue;
      case '*': return prevValue * currentValue;
      case '/': return prevValue / currentValue;
      default: return currentValue;
    }
  };
  // In calculatorUtils.js
export const validateInput = (input) => {
    // Check if input is a valid number or decimal point
    if (typeof input !== 'number' && input !== '.') {
      throw new Error('Invalid input: Only numbers and decimals allowed');
    }
  
    // Check for NaN values
    if (typeof input === 'number' && isNaN(input)) {
      throw new Error('Invalid number input');
    }
  
    // Prevent multiple decimal points in a single number
    if (input === '.' && currentInput.includes('.')) {
      throw new Error('Decimal point already exists');
    }
  
    // Validate number range (optional)
    if (typeof input === 'number' && !Number.isFinite(input)) {
      throw new Error('Number out of valid range');
    }
  };