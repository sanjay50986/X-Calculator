import React, { useState, useEffect } from 'react';

const App = () => {
  const [inputValue, setInputValue] = useState('');
  const [result, setResult] = useState('');

  const handleClick = (value) => {
    setInputValue((prev) => prev + value);
  };

  const handleClear = () => {
    setInputValue('');
    setResult('');
  };

  const handleCalculate = () => {
    try {
      if (!inputValue) {
        setResult("Error"); 
        return;
      }

      if (inputValue === "0/0") {
        setResult("NaN");
        return;
      }

      const sanitized = inputValue.replace(/\b0+(\d)/g, '$1');
      const calculated = eval(sanitized);

      if (isNaN(calculated)) {
        setResult("NaN");
      } else if (!isFinite(calculated)) {
        setResult("Infinity");
      } else {
        setResult(String(calculated));
      }

    } catch (error) {
      setResult("Error");
    }
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      const { key } = e;

      if (/[0-9]/.test(key)) {
        handleClick(key);
      } else if (['+', '-', '*', '/'].includes(key)) {
        handleClick(key);
      } else if (key === 'Enter') {
        e.preventDefault();
        handleCalculate();
      } else if (key === 'Backspace') {
        setInputValue(prev => prev.slice(0, -1));
      } else if (key === 'Escape') {
        handleClear();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <div className='container'>
      <div className="calculator">
        <h2>React Calculator</h2>

        <div className='input-box'>
          <input type="text" value={inputValue} readOnly />
        </div>

        <div id="calc-result">{result}</div>

        <div className='calculator-buttons'>
          <button onClick={() => handleClick('7')}>7</button>
          <button onClick={() => handleClick('8')}>8</button>
          <button onClick={() => handleClick('9')}>9</button>
          <button onClick={() => handleClick('+')} className="operator">+</button>

          <button onClick={() => handleClick('4')}>4</button>
          <button onClick={() => handleClick('5')}>5</button>
          <button onClick={() => handleClick('6')}>6</button>
          <button onClick={() => handleClick('-')} className="operator">-</button>

          <button onClick={() => handleClick('1')}>1</button>
          <button onClick={() => handleClick('2')}>2</button>
          <button onClick={() => handleClick('3')}>3</button>
          <button onClick={() => handleClick('*')} className="operator">*</button>

          <button onClick={handleClear} className="clear">C</button>
          <button onClick={() => handleClick('0')}>0</button>
          <button onClick={handleCalculate} className="equal">=</button>
          <button onClick={() => handleClick('/')} className="operator">/</button>
        </div>
      </div>
    </div>
  )
}

export default App;
