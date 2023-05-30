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

  }

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <HomePage cartItems={cartItems} onAdd={onAdd} onRemove={onRemove} tele={tele} />
          }
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

  return (
    <>
      <h2>Order Summary</h2>
      <ul>
        {cartItems.map((food) => (
          <li key={food.id}>
            {food.image}{food.title} x {food.quantity}
          </li>
        ))}
      </ul>
      <h3>Total Price: ${totalPrice.toFixed(2)}</h3>
      <Link to="/">Edit Order</Link>
    </>
  );
}

export default App;
