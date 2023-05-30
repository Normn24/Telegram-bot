import React from "react";
import "./Cart.css";
// import Button from "../Button/Button";

function Cart({ cartItems, food }) {
  const totalPrice = cartItems.reduce((a, c) => a + c.price * c.quantity, 0);
  // eslint-disable-next-line no-unused-vars
  const { title, Image, price, id } = food;

  return (
    <div className="cart__container">
      {cartItems.length === 0
        ? "No items in cart "
        : `Total Price: ${totalPrice.toFixed(2)}`}

      <div className="image__container">
        <img src={Image} alt={title} />
      </div>
      <h4 className="card__title">
        {title} • <span className="card__price">${price}</span>
      </h4>
    </div>
  );
}

export default Cart;
