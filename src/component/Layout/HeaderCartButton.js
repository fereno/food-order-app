import {useContext, useState, useEffect} from "react";
import CartIcon from "../Cart/CartIcon";
import classes from "./HeaderCartButton.module.css";
import CartContext from "../../storage/cart-context";

const HeaderCartButton = (props) => {
  const cartCtx = useContext(CartContext);
  const [btnIsBold, setBtnBold] = useState(false);
  const {items} = cartCtx;
  const numberOfCartItems = items.reduce((currentNumber, item) => {
    return currentNumber + item.amount;
  }, 0);
  useEffect(() => {
    if (items.length === 0) {
      return;
    }
    setBtnBold(true);
    const timer = setTimeout(() => {
      setBtnBold(false);
    }, 300);
    return () => {
      clearTimeout(timer);
    };
  }, [items]);
  const btnClasses = `${classes.button} ${btnIsBold ? classes.bump : ""}`;
  return (
    <button className={btnClasses} onClick={props.onShowCarto}>
      <span className={classes.icon}>
        <CartIcon />
      </span>
      <span>Your Cart</span>
      <span className={classes.badge}>{numberOfCartItems}</span>
    </button>
  );
};

export default HeaderCartButton;
