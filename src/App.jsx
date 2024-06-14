import {useState } from "react";
import "./App.css";

function App() {
  const [currentValue, setCurrentValue] = useState("0");

  const clearDisplay = () => {
    setCurrentValue("0");
  }

  const updateValue = (e) => {
    let value = e.target.value;
    let operators = ["+", "-", "*", "/"];

    // Remove leading zeros
    if (currentValue === "0" && value === "00") {
      setCurrentValue("0");
      return;
    } else if (currentValue === "0" && value === "0") {
      setCurrentValue("0");
      return;
    } else if (currentValue === "0" && value !== "0" && value !== ".") {
      setCurrentValue(value);
      return;
    }

    // Prevent multiple decimals
    if (value === "." && currentValue.includes(".")) {
      return;
    }

    // Handle consecutive operators (excluding negative sign)
    if (operators.includes(value)) {
      let lastChar = currentValue[currentValue.length - 1];
      if (operators.includes(lastChar)) {
        if (value === "-" && lastChar !== "-") {
          // Allow negative sign after an operator
          setCurrentValue(currentValue + value);
        } else if (lastChar !== "-") {
          // Replace last operator with the new one
          setCurrentValue(currentValue.slice(0, -1) + value);
        }
        return;
      }
    }

    setCurrentValue(currentValue + value);
  }


  const calculate = () => {
    try {
      
      let result = eval(currentValue);
      setCurrentValue(String(result));
    } catch (error) {
      setCurrentValue("Error");
    }
  }

  return (
    <>
      <div id="calculator">
        <input type="text" name="input" id="display" value={currentValue} readOnly/>
        <div id="buttons">
          <div className="p">
            <button onClick={clearDisplay} id="clear">AC</button>
            <button value={"*"} onClick={updateValue} id="multiply">*</button>
            <button value={"/"} onClick={updateValue} id="divide">/</button>
          </div>
          <div className="p">
            <button value={"7"} onClick={updateValue} id="seven">7</button>
            <button value={"8"} onClick={updateValue} id="eight">8</button>
            <button value={"9"} onClick={updateValue} id="nine">9</button>
            <button value={"+"} onClick={updateValue} id="add">+</button>
          </div>
          <div className="p">
            <button value={"4"} onClick={updateValue} id="four">4</button>
            <button value={"5"} onClick={updateValue} id="five">5</button>
            <button value={"6"} onClick={updateValue} id="six">6</button>
            <button value={"-"} onClick={updateValue} id="subtract">-</button>
          </div>
          <div className="p">
            <button value={"1"} onClick={updateValue} id="one">1</button>
            <button value={"2"} onClick={updateValue} id="two">2</button>
            <button value={"3"} onClick={updateValue} id="three">3</button>
            <button value={"."} onClick={updateValue} id="decimal">.</button>
          </div>
          <div className="p">
            <button value={"00"} onClick={updateValue} id="tz">00</button>
            <button value={"0"} onClick={updateValue} id="zero">0</button>
            <button onClick={calculate} id="equal">=</button>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
