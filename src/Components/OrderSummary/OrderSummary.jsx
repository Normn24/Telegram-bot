import React from "react";

const OrderSummary = ({ cartItems, onEdit }) => {
  const totalPrice = cartItems.reduce((total, item) => {
    return total + item.price * item.quantity;
  }, 0);

  return (
    <div className="order-summary">
      <h2>Order Summary</h2>
      <ul className="order-items">
        {cartItems.map((item) => (
          <li key={item.id}>
            <span className="item-name">{item.name}</span>
            <span className="item-quantity">{item.quantity}</span>
            <span className="item-price">{item.price}</span>
          </li>
        ))}
      </ul>
      <div className="total-price">Total: {totalPrice}</div>
      <button className="edit-button" onClick={onEdit}>
        Edit Order
      </button>
    </div>
  );
};

export default OrderSummary;
