import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom';
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

  useEffect(() => {
    if (cartItems.length === 0) {
      tele.MainButton.hide();
    } else {
      tele.WebApp.MainButton.setParams({
        text: 'VIEW ORDER ;)',
        is_visible: true
      }).onClick(() => {
        window.location.href = '/order';
      });
    }
  }, [cartItems]);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage cartItems={cartItems} onAdd={onAdd} onRemove={onRemove} />} />
        <Route path="/order" element={<OrderPage cartItems={cartItems} onAdd={onAdd} onRemove={onRemove} />} />
      </Routes>
    </Router>
  );
}

function HomePage({ cartItems, onAdd, onRemove }) {
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

function OrderPage({ cartItems, onAdd, onRemove }) {
  const totalPrice = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  return (
    <>
      <h1>Order Summary</h1>
      <Cart cartItems={cartItems} />
      <h2>Total Price: ${totalPrice}</h2>
      <Link to="/">Edit Order</Link>
    </>
  );
}

export default App;
