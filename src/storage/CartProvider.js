import React, {useReducer} from "react";
import CartContext from "./cart-context";

const cartReducer = (state, action) => {
  if (action.type === "ADD") {
    const updatedItems = state.items.concat(action.item);
    const updatedTotalAmount =
      state.totalAmount + action.item.price * action.item.amount;
    return {items: updatedItems, totalAmount: updatedTotalAmount};
  }
  if (action.type === "REMOVE") {
    const updatedItems = state.items.filter((item) => item.id !== action.id);

    // const updatedTotalAmount = updatedItems.map((item) => {
    //   sum += item.price * item.amount;
    // });
    let sum = 0;
    for (let item of updatedItems) {
      sum += item.price * item.amount;
    }
    return {items: updatedItems, totalAmount: sum};
  }
  return defaultCartState;
};
const defaultCartState = {items: [], totalAmount: 0};

const CartProvider = (props) => {
  const [cartState, dispatchCartAction] = useReducer(
    cartReducer,
    defaultCartState
  );

  const addItemToCartHandler = (item) => {
    dispatchCartAction({type: "ADD", item: item});
  };
  const removeItemFromCartHandler = (id) => {
    dispatchCartAction({type: "REMOVE", id: id});
  };
  const cartContext = {
    items: cartState.items,
    totalAmount: cartState.totalAmount,
    addItem: addItemToCartHandler,
    removeItem: removeItemFromCartHandler,
  };
  return (
    <CartContext.Provider value={cartContext}>
      {props.children}
    </CartContext.Provider>
  );
};

export default CartProvider;
