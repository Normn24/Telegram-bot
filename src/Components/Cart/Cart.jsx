import useEffect from "react";
import "./Cart.css";
import Button from "../Button/Button";

const tele = window.Telegram.WebApp;

function Cart({ cartItems, onCheckout }) {
  const totalPrice = cartItems.reduce((a, c) => a + c.price * c.quantity, 0);

  useEffect(() => {
    tele.ready();
  });

  return (
    <div className="cart__container">
      {cartItems.length === 0
        ? "No items in cart "
        : `Total Price: ${totalPrice.toFixed(2)}`}
      <Button
        // title={`${cartItems.length === 0 ? (tele.MainButton.hide()) : (tele.MainButton.show())} `}
        type={"checkout"}
        disable={cartItems.length === 0 ? true : false}
        onClick={onCheckout}
      />
    </div>
  );
}

export default Cart;
