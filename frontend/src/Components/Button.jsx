import React from 'react';
import PropTypes from 'prop-types';
import './Calculator.css';

const Button = ({ label, onClick, className = '', span = 1 }) => {
  const buttonClass = `button ${className} ${span > 1 ? `span-${span}` : ''}`;
  
  return (
    <button className={buttonClass} onClick={onClick}>
      {label}
    </button>
  );
};

Button.propTypes = {
  label: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  className: PropTypes.string,
  span: PropTypes.number
};

export default Button;