import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Link, Routes, useNavigate } from 'react-router-dom';
import './App.css';
import Cart from './Components/Cart/Cart';
import Card from './Components/Card/Card';

const { getData } = require("./db/db");
const foods = getData();

const tele = window.Telegram.WebApp;

function App() {
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    tele.ready();
  });

  const onAdd = (food) => {
    const exist = cartItems.find((x) => x.id === food.id);
    if (exist) {
      setCartItems(
        cartItems.map((x) =>
          x.id === food.id ? { ...exist, quantity: exist.quantity + 1 } : x
        )
      );
    } else {
      setCartItems([...cartItems, { ...food, quantity: 1 }]);
    }
  };

  const onRemove = (food) => {
    const exist = cartItems.find((x) => x.id === food.id);
    if (exist.quantity === 1) {
      setCartItems(cartItems.filter((x) => x.id !== food.id));
    } else {
      setCartItems(
        cartItems.map((x) =>
          x.id === food.id ? { ...exist, quantity: exist.quantity - 1 } : x
        )
      );
    }
  };

  if (cartItems.length === 0) {
    tele.MainButton.hide();
  } else {
    tele.MainButton.show();
    tele.MainButton.text = "VIEW ORDER ;)";
  }

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={<HomePage cartItems={cartItems} onAdd={onAdd} onRemove={onRemove} tele={tele} />}
        />
        <Route
          path="/order"
          element={<OrderPage cartItems={cartItems} tele={tele} />}
        />
      </Routes>
    </Router>
  );
}

function HomePage({ cartItems, onAdd, onRemove, tele }) {
  const navigate = useNavigate();

  useEffect(() => {
    tele.MainButton.onClick(() => {
      navigate('/order');
    });
  });
  return (
    <>
      <h1 className='heading'>Order foods</h1>
      <Cart cartItems={cartItems} />
      <div className='cards__container'>
        {foods.map((food) => (
          <Card food={food} key={food.id} onAdd={onAdd} onRemove={onRemove} />
        ))}
      </div>
    </>
  );
}

function OrderPage({ cartItems, tele }) {
  const totalPrice = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  useEffect(() => {
    tele.MainButton.text = `PAY $${totalPrice.toFixed(2)}`;
    tele.MainButton.onClick(() => {
      tele.MainButton.show();
    });
  }, [tele.MainButton, totalPrice]);

  return (
    <>
      <div className="carts__container">
        <div className="cart__header">
          <h3 className="cart__heading">Your order</h3>
          <Link to="/" className="cart__edit">Edit</Link>
        </div>
        {cartItems.map((food) => (
          <div className="order__container" key={food.id}>
            <img className="img__container" src={food.Image} alt={food.title} />
            <div className="cart__title">
              {food.title}
              <span className="cart__quantity">{food.quantity}x</span>{" "}
              <span className="cart__price">${food.price}</span>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

export default App;