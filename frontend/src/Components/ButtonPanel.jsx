import React from "react";
import Button from "./Button";

const ButtonPanel = ({
  onDigitClick,
  onOperatorClick,
  onClear,
  onDecimal,
  onEquals,
  onBackspace,
}) => {
  return (
    <div className="buttons">
      {/* First row */}
      <div className="row">
        <Button
          label="AC"
          onClick={onClear}
          className="function-btn"
          span={2}
        />
        <Button label="." onClick={onDecimal} className="function-btn" />

        <Button
          label="/"
          onClick={() => onOperatorClick("/")}
          className="operator-btn"
        />
      </div>

      {/* Second row */}
      <div className="row">
        <Button
          label="×"
          onClick={() => onOperatorClick("*")}
          className="operator-btn"
        />
        <Button
          label="7"
          onClick={() => onDigitClick(7)}
          className="number-btn"
        />
        <Button
          label="8"
          onClick={() => onDigitClick(8)}
          className="number-btn"
        />
        <Button
          label="9"
          onClick={() => onDigitClick(9)}
          className="number-btn"
        />
      </div>

      {/* Third row */}
      <div className="row">
        <Button
          label="−"
          onClick={() => onOperatorClick("-")}
          className="operator-btn"
        />
        <Button
          label="4"
          onClick={() => onDigitClick(4)}
          className="number-btn"
        />
        <Button
          label="5"
          onClick={() => onDigitClick(5)}
          className="number-btn"
        />
        <Button
          label="6"
          onClick={() => onDigitClick(6)}
          className="number-btn"
        />
      </div>

      {/* Fourth row */}
      <div className="row">
        <Button
          label="+"
          onClick={() => onOperatorClick("+")}
          className="operator-btn"
        />
        <Button
          label="1"
          onClick={() => onDigitClick(1)}
          className="number-btn"
        />
        <Button
          label="2"
          onClick={() => onDigitClick(2)}
          className="number-btn"
        />
        <Button
          label="3"
          onClick={() => onDigitClick(3)}
          className="number-btn"
        />
      </div>

      {/* Fifth row */}
      <div className="row">
        <Button label="=" onClick={onEquals} className="equals-btn" />
        <Button label="⌫" onClick={onBackspace} className="function-btn" />

        <Button
          label="0"
          onClick={() => onDigitClick(0)}
          className="number-btn"
          span={2}
        />
      </div>
    </div>
  );
};

export default ButtonPanel;
