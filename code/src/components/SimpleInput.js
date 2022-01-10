import React from "react";
import useInput from "../hooks/useInput";

const SimpleInput = (props) => {
  // const [enteredName, setEnteredName] = useState("");
  // const [enteredEmail, setEnteredEmail] = useState("");
  // const [enteredNameIsValid, setEnteredNameIsValid] = useState(false);
  // const [enteredNameTouched, setEnteredNameTouched] = useState(false);
  // const [enteredEmailTouched, setEnteredEmailTouched] = useState(false);
  // const nameInputRef = useRef();
  // const [formIsValid, setFormIsValid] = useState(false);
  const {
    value: enteredName,
    isValid: enteredNameIsValid,
    hasError: nameInputHasError,
    valueChangeHandler: nameChangedHandler,
    valueBlurHandler: nameBlurHandler,
    reset: resetNameInput,
  } = useInput((value) => value.trim() !== "");

  const {
    value: enteredEmail,
    isValid: enteredEmailIsValid,
    hasError: emailInputHasError,
    valueChangeHandler: emailChangeHandler,
    valueBlurHandler: emailBlurHandler,
    reset: resetEmailInput,
  } = useInput((value) => {
    if (value.includes("@") && value.trim() !== "") {
      return true;
    } else {
      return false;
    }
  });

  // const enteredNameIsValid = enteredName.trim() !== "";
  // const enteredEmailIsValid = (function () {
  //   if (enteredEmail.includes("@") && enteredEmail.trim() !== "") {
  //     return true;
  //   } else {
  //     return false;
  //   }
  // })();
  // const nameInputIsInvalid = !enteredNameIsValid && enteredNameTouched;
  // const emailInputIsInvalid = !enteredEmailIsValid && enteredEmailTouched;

  // the dependencies and vaildation "if" would be every field that is changed
  // useEffect(() => {
  //   if (enteredNameIsValid) {
  //     setFormIsValid(true);
  //   } else {
  //     setFormIsValid(false);
  //   }
  // }, [enteredNameIsValid]);

  // the useEffect can be slimmed down to this.
  let formIsValid = false;

  if (enteredNameIsValid && enteredEmailIsValid) {
    formIsValid = true;
  }

  // useEffect(() => {
  //   if (enteredNameIsValid) {
  //     console.log("name is valid");
  //   }
  // }, [enteredNameIsValid]);

  // const nameInputChangeHandler = (event) => {
  //   setEnteredName(event.target.value);
  //   // console.log(enteredName);

  //   // if (enteredName.trim() !== "") {
  //   //   setEnteredNameIsValid(true);
  //   // }
  // };

  // const emailInputChangeHandler = (event) => {
  //   setEnteredEmail(event.target.value);
  //   console.log(enteredEmail);
  // };

  // const nameInputBlurHandler = (event) => {
  //   setEnteredNameTouched(true);
  //   // if (enteredName.trim() === "") {
  //   //   setEnteredNameIsValid(false);
  //   // }
  // };

  // const emailInputBlurHandler = (event) => {
  //   setEnteredEmailTouched(true);
  // };

  const formSubmissionHandler = (event) => {
    event.preventDefault();

    // If form is submitted, we assume that everything is touched
    // setEnteredNameTouched(true);

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

    // setEnteredName("");
    // setEnteredNameTouched(false);
    resetNameInput();
    // setEnteredEmail("");
    // setEnteredEmailTouched(false);
    resetEmailInput();
  };

  const nameInputClasses = nameInputHasError
    ? "form-control invalid"
    : "form-control";

  const emailInputClasses = emailInputHasError
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
          onChange={nameChangedHandler}
          onBlur={nameBlurHandler}
        />
        {nameInputHasError && (
          <p className="error-text">Name must not be empty!</p>
        )}
      </div>
      <div className={emailInputClasses}>
        <label htmlFor="email">Your E-Mail</label>
        <input
          type="email"
          id="email"
          value={enteredEmail}
          onChange={emailChangeHandler}
          onBlur={emailBlurHandler}
        ></input>
        {emailInputHasError && <p className="error-text">Email invalid!</p>}
      </div>
      <div className="form-actions">
        <button disabled={!formIsValid} type="submit">
          Submit
        </button>
      </div>
    </form>
  );
};

export default SimpleInput;
