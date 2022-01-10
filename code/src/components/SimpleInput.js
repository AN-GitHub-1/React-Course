import React, { useEffect, useRef, useState } from "react";

const SimpleInput = (props) => {
  const [enteredName, setEnteredName] = useState("");
  // const [enteredNameIsValid, setEnteredNameIsValid] = useState(false);
  const [enteredNameTouched, setEnteredNameTouched] = useState(false);
  // const nameInputRef = useRef();

  const enteredNameIsValid = enteredName.trim() !== "";
  const nameInputIsInvalid = !enteredNameIsValid && enteredNameTouched;

  // useEffect(() => {
  //   if (enteredNameIsValid) {
  //     console.log("name is valid");
  //   }
  // }, [enteredNameIsValid]);

  const nameInputChangeHandler = (event) => {
    setEnteredName(event.target.value);
    console.log(enteredName);

    // if (enteredName.trim() !== "") {
    //   setEnteredNameIsValid(true);
    // }
  };

  const nameInputBlurHandler = (event) => {
    setEnteredNameTouched(true);
    // if (enteredName.trim() === "") {
    //   setEnteredNameIsValid(false);
    // }
  };

  const formSubmissionHandler = (event) => {
    event.preventDefault();

    // If form is submitted, we assume that everything is touched
    setEnteredNameTouched(true);

    if (enteredName.trim() === "") {
      console.log("empty");
      // setEnteredNameIsValid(false);
      // return so the rest of the code doesn't get executed
      return;
    }

    // setEnteredNameIsValid(true);

    console.log("entered name", enteredName);

    // to clean up code we can remove ref since we're not using it.
    // const enteredValue = nameInputRef.current.value;
    // console.log(enteredValue);

    // Don't do this below method since it directly interacts with the DOM
    // nameInputRef.current.value = ''

    setEnteredName("");
    setEnteredNameTouched(false);
  };

  const nameInputClasses = nameInputIsInvalid
    ? "form-control invalid"
    : "form-control";

  return (
    <form onSubmit={formSubmissionHandler}>
      <div className={nameInputClasses}>
        <label htmlFor="name">Your Name</label>
        <input
          // ref={nameInputRef}
          value={enteredName}
          type="text"
          id="name"
          onChange={nameInputChangeHandler}
          onBlur={nameInputBlurHandler}
        />
        {nameInputIsInvalid && (
          <p className="error-text">Name must not be empty!</p>
        )}
      </div>
      <div className="form-actions">
        <button type="submit">Submit</button>
      </div>
    </form>
  );
};

export default SimpleInput;
