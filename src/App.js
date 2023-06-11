import React, {Fragment, useState} from "react";
import CartProvider from "./storage/CartProvider";

import Header from "./component/Layout/Header";
import Meals from "./component/Meals/Meals";
import Cart from "./component/Cart/Cart";

function App(props) {
  const [cartIsShown, setCartIShown] = useState(false);
  const onShowCartHandler = () => {
    setCartIShown(true);
  };
  const onHideCartHandler = () => {
    setCartIShown(false);
  };
  return (
    <CartProvider>
      {cartIsShown && <Cart onCloseCart={onHideCartHandler} />}
      <Header onShowCart={onShowCartHandler} onHideCart={onHideCartHandler} />
      <main>
        <Meals />
      </main>
    </CartProvider>
  );
}

export default App;
