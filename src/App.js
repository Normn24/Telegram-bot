import { useState, useEffect } from 'react';
import './App.css';
import Cart from './Components/Cart/Cart';
import Card from './Components/Card/Card';

const { getData } = require("./db/db")
const foods = getData();

const tele = window.Telegram.WebApp

function App() {
  const [cartItems, setCartItems] = useState([])

  useEffect(() => {
    tele.ready();
  })

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
      setCartItems(cartItems.filter((x) => x.id !== food.id))
    } else {
      setCartItems(
        cartItems.map((x) =>
          x.id === food.id ? { ...exist, quantity: exist.quantity - 1 } : x
        ))
    }
  }

  cartItems.length === 0 ? tele.MainButton.hide() : tele.MainButton.show()

  // const onCheckout = () => {
  // tele.MainButton.show();
  //   tele.MainButton.text = "Pay ;)";
  // }

  return (
    <>
      <h1 className='heading'>Order foods</h1>
      <Cart cartItems={cartItems} />
      <div className='cards__container'>
        {foods.map(food => {
          return <Card food={food} key={food.id} onAdd={onAdd} onRemove={onRemove} />;
        })}
      </div>
    </>
  )
}

export default App;

