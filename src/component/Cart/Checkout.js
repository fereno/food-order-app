import React, {useRef, useState} from "react";
import classes from "./Checkout.module.css";

const Checkout = (props) => {
  const [formInputValidity, setFormInputValidity] = useState({
    name: true,
    street: true,
    city: true,
    postalCode: true,
  });
  const isEmpty = (value) => value.trim() === "";
  const isFiveChars = (value) => value.trim().length === 5;
  const nameInputRef = useRef();
  const streetInputRef = useRef();
  const cityInputRef = useRef();
  const postalCodeInputRef = useRef();

  const submitFormHandler = (event) => {
    event.preventDefault();
    const enteredName = nameInputRef.current.value;
    const enteredStreet = streetInputRef.current.value;
    const enteredPostalCode = postalCodeInputRef.current.value;
    const enteredCity = cityInputRef.current.value;

    const nameIsValid = !isEmpty(enteredName);
    const cityIsValid = !isEmpty(enteredCity);
    const streetIsValid = !isEmpty(enteredStreet);
    const postalCodeIsValid = isFiveChars(enteredPostalCode);

    const formIsValid =
      nameIsValid & cityIsValid & streetIsValid & postalCodeIsValid;

    if (!formIsValid) {
      return;
    }

    setFormInputValidity({
      name: nameIsValid,
      city: cityIsValid,
      postalCode: postalCodeIsValid,
      street: streetIsValid,
    });

    //submit the cart data
    props.onConfirm({
      name: enteredName,
      city: enteredCity,
      postalCode: enteredPostalCode,
      street: enteredStreet,
    });
  };
  const nameControlClasses = `${classes.control} ${
    formInputValidity.name ? "" : classes.invalid
  }`;

  const cityControlClasses = `${classes.control} ${
    formInputValidity.city ? "" : classes.invalid
  }`;

  const streetControlClasses = `${classes.control} ${
    formInputValidity.street ? "" : classes.invalid
  }`;

  const postalCodeControlClasses = `${classes.control} ${
    formInputValidity.postalCode ? "" : classes.invalid
  }`;

  return (
    <form onSubmit={submitFormHandler} className={classes.form}>
      <div className={nameControlClasses}>
        <label htmlFor="name">Your Name</label>
        <input ref={nameInputRef} type="text" id="name"></input>
        {!formInputValidity.name && <p>please enter a valid name</p>}
      </div>
      <div className={streetControlClasses}>
        <label htmlFor="street">Street</label>
        <input ref={streetInputRef} type="text" id="street"></input>
        {!formInputValidity.street && <p>please enter a valid street</p>}
      </div>
      <div className={postalCodeControlClasses}>
        <label htmlFor="postal">Postal code</label>
        <input ref={postalCodeInputRef} type="text" id="postal"></input>
        {!formInputValidity.postalCode && (
          <p>please enter a valid postalCode</p>
        )}
      </div>
      <div className={cityControlClasses}>
        <label htmlFor="city">City</label>
        <input ref={cityInputRef} type="text" id="city"></input>
        {!formInputValidity.city && <p>please enter a valid city</p>}
      </div>
      <div className={classes.actions}>
        <button className={classes.submit} type="submit">
          confirm
        </button>
        <button onClick={props.onCancel}>cancel</button>
      </div>
    </form>
  );
};

export default Checkout;
