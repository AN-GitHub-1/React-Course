import { useState, useReducer } from "react";

const inputStateReducer = (state, action) => {
  switch (action.type) {
    case "INPUT":
      // we do nothing with the isTouched so we just use the prev state
      return {
        value: action.value,
        isTouched: state.isTouched,
      };
    case "BLUR":
      return {
        value: state.value,
        isTouched: true,
      };
    case "RESET":
      return {
        value: "",
        isTouched: false,
      };
    default:
      return {
        value: "",
        isTouched: false,
      };
  }
};

export default function useInput(validateValue) {
  const [inputState, dispatch] = useReducer(inputStateReducer, {
    value: "",
    isTouched: false,
  });
  // const [enteredValue, setEnteredValue] = useState("");
  // const [enteredValueTouched, setEnteredValueTouched] = useState(false);

  // valueIsValid is simply looking for syntax errors
  // const valueIsValid = validateValue(enteredValue);
  // const hasError = !valueIsValid && enteredValueTouched;

  const valueIsValid = validateValue(inputState.value);
  const hasError = !valueIsValid && inputState.isTouched;

  const valueChangeHandler = (event) => {
    dispatch({ type: "INPUT", value: event.target.value });
    // setEnteredValue(event.target.value);
  };

  const valueBlurHandler = (event) => {
    dispatch({ type: "BLUR" });
    // setEnteredValueTouched(true);
  };

  const reset = () => {
    // we dont need to pass in true or false because that can be handled inside the
    // reducer
    dispatch({ type: "RESET" });
    // setEnteredValue("");
    // setEnteredValueTouched(false);
  };

  return {
    // value: enteredValue,
    value: inputState.value,
    isValid: valueIsValid,
    hasError: hasError,
    valueChangeHandler: valueChangeHandler,
    valueBlurHandler: valueBlurHandler,
    reset: reset,
  };
}
