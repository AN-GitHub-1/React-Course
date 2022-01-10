import { useState } from "react";

export default function useInput(validateValue) {
  const [enteredValue, setEnteredValue] = useState("");
  const [enteredValueTouched, setEnteredValueTouched] = useState(false);

  // valueIsValid is simply looking for syntax errors
  const valueIsValid = validateValue(enteredValue);
  const hasError = !valueIsValid && enteredValueTouched;

  const valueChangeHandler = (event) => {
    setEnteredValue(event.target.value);
  };

  const valueBlurHandler = (event) => {
    setEnteredValueTouched(true);
  };

  const reset = () => {
    setEnteredValue("");
    setEnteredValueTouched(false);
  };

  return {
    value: enteredValue,
    isValid: valueIsValid,
    hasError: hasError,
    valueChangeHandler: valueChangeHandler,
    valueBlurHandler: valueBlurHandler,
    reset: reset,
  };
}
