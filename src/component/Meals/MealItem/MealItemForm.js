import React, {useState} from "react";
import classes from "./MealItemForm.module.css";
import Input from "../../UI/Input";
import Button from "../../UI/Button";
const MealItemForm = () => {
  const [price, setPrice] = useState();
  const onSubmitHandler = (event) => {
    event.preventDefault();
    console.log("on submit price", price);
  };
  const onChangeHandler = (event) => {
    console.log("event", price);
    setPrice(event.target.value);
  };

  return (
    <form className={classes.form} onSubmit={onSubmitHandler}>
      <Input
        label={"Amount "}
        input={{
          id: "amount",
          type: "number",
          min: "1",
          max: "5",
          step: "1",
          defaultValue: "1",
        }}
      />
      <button type="submit">+ Add</button>
    </form>
  );
};

export default MealItemForm;
