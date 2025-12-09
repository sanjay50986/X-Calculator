import React, { useState, useEffect } from 'react';

const App = () => {
  const [inputValue, setInputValue] = useState('');

  const handleClick = (value) => {
    setInputValue((prev) => {
      if (prev === 'Error' || prev === 'Infinity' || prev === 'NaN') {
        return value;
      }
      return prev + value;
    });
  };

  const handleClear = () => {
    setInputValue('');
  };

  const handleCalculate = () => {
    try {
      if (!inputValue) return;
      // Fix for octal literals (e.g., 05 -> 5) to prevent strict mode errors
      const sanitized = inputValue.replace(/\b0+(\d)/g, '$1');
      // eslint-disable-next-line
      const result = eval(sanitized);

      if (!isFinite(result) || isNaN(result)) {
        setInputValue('Error');
      } else {
        setInputValue(String(result));
      }
    } catch (error) {
      setInputValue('Error');
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
        setInputValue(prev => {
          if (prev === 'Error' || prev === 'Infinity' || prev === 'NaN') return '';
          return prev.slice(0, -1);
        });
      } else if (key === 'Escape') {
        handleClear();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [inputValue]);

  return (
    <div className='container'>
      <div className="calculator">
        <h2>React Calculator</h2>
        <div className='input-box'>
          <input type="text" value={inputValue} readOnly placeholder="0" />
        </div>

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

export default App