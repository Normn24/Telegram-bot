import React, { useState, useEffect } from "react";
import "./Card.css";
import Button from "../Button/Button";

function Card({ food, onAdd, onRemove }) {
  const [count, setCount] = useState(0);
  const { title, Image, price, id } = food;

  useEffect(() => {
    // Відновлення значення count з локального сховища при монтажі компонента
    const savedCount = localStorage.getItem(`count_${id}`);
    if (savedCount) {
      setCount(parseInt(savedCount));
    }
  }, [id]);

  useEffect(() => {
    // Збереження значення count у локальному сховищі при зміні
    localStorage.setItem(`count_${id}`, count.toString());
  }, [count, id]);

  useEffect(() => {
    const handleBeforeUnload = () => {
      window.localStorage.clear(`count_${id}`);
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [id]);

  const handleIncrement = () => {
    setCount(count + 1);
    onAdd(food);
  };

  const handleDecrement = () => {
    setCount(count - 1);
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
