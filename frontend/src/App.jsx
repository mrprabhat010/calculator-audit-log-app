import React from 'react';
import Calculator from './components/Calculator';
import './App.css';

function App() {
  return (
    <div className="App">
      <h1>Calculator</h1>
      <div className="app-container">
        <Calculator  />
      </div>
    </div>
  );
}

export default App;