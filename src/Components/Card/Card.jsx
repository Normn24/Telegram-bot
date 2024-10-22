import React, { useState, useEffect } from "react";
import "./Card.css";
import Button from "../Button/Button";

function Card({ food, onAdd, onRemove }) {
  const [count, setCount] = useState(0);
  const { title, Image, price, id } = food;

  useEffect(() => {
    const savedCount = sessionStorage.getItem(`count_${id}`);
    if (savedCount) {
      setCount(parseInt(savedCount));
    }
  }, [id]);

  useEffect(() => {
    sessionStorage.setItem(`count_${id}`, count.toString());
  }, [count, id]);

  const handleIncrement = () => {
    const newCount = count + 1;
    setCount(newCount);
    onAdd(food);
  };

  const handleDecrement = () => {
    const newCount = count - 1;
    setCount(newCount);
    onRemove(food);
  };

  return (
    <div className="card">
      <span
        className={`${count !== 0 ? "card__badge" : "card__badge--hidden"}`}
      >
        {count}
      </span>
      <div className="image__container">
        <img src={Image} alt={title} />
      </div>
      <h4 className="card__title">
        {title} • <span className="card__price">${price}</span>
      </h4>

      <div className="btn-container">
        {count === 0 ? (
          <Button title={"ADD"} type={"add"} onClick={handleIncrement} />
        ) : (
          ""
        )}
        {count >= 1 ? (
          <Button title={"+"} type={"add"} onClick={handleIncrement} />
        ) : (
          ""
        )}
        {count !== 0 ? (
          <Button title={"-"} type={"remove"} onClick={handleDecrement} />
        ) : (
          ""
        )}
      </div>
    </div>
  );
}

export default Card;
