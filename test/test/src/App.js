import React, { useState, useCallback } from "react";
import "./App.css";
import Child from "./components/Child";

function App() {
  const [toggle, setToggle] = useState(false);
  const [callback, setCallback] = useState(false);

  console.log("App.js ran");

  const toggleButtonHandler = () => {
    setToggle((prevToggle) => !prevToggle);
  };

  const useCallbackButtonHandler = () => {
    setCallback((prevCallback) => !prevCallback);
  };

  // All children will console log when toggle is pressed because React.memo() ensures
  // that the child will run if a prop is changed. Button2 button won't do this
  // because it doesn't change the toggle state at all.

  return (
    <div>
      <Child toggle={toggle} />
      {toggle ? <h1>Toggle: True</h1> : <h1>Toggle: False</h1>}
      {callback ? <h1>Callback: True</h1> : <h1>Callback: False</h1>}
      <button onClick={toggleButtonHandler}>Toggle</button>
      <button onClick={useCallbackButtonHandler}>Button2</button>
    </div>
  );
}

export default App;
