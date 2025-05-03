import React from 'react';
import PropTypes from 'prop-types';
import './Calculator.css';

const Display = ({ expression, currentInput, maxOutputLength }) => {
  const displayClass = currentInput.length > maxOutputLength ? 'small-text' : '';

  return (
    <div className="display">
      <div className="expression">{expression}</div>
      <div className={`current-input ${displayClass}`}>{currentInput}</div>
    </div>
  );
};

Display.propTypes = {
  expression: PropTypes.string.isRequired,
  currentInput: PropTypes.string.isRequired,
  maxOutputLength: PropTypes.number.isRequired
};

export default Display;