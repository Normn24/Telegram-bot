import React from 'react';
import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from 'react-router-dom';
import './App.css';
import Cart from './Components/Cart/Cart';
import Card from './Components/Card/Card';

const { getData } = require("./db/db")
const foods = getData();

const tele = window.Telegram.WebApp;

function App() {
  const [cartItems, setCartItems] = useState([]);
  const navigate = useNavigate(); // Hook to programmatically navigate

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

  const handleMainButtonClick = () => {
    navigate('/order'); // Navigate to the /order route when MainButton is clicked
  };

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={<HomePage cartItems={cartItems} onAdd={onAdd} onRemove={onRemove} />}
        />
        <Route
          path="/order"
          element={<OrderPage cartItems={cartItems} onAdd={onAdd} onRemove={onRemove} />}
        />
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
          <Card
            food={food}
            key={food.id}
            onAdd={() => onAdd(food)}
            onRemove={() => onRemove(food)}
          />
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
