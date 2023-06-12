import React from "react";
import "./Card.css";
import { useSelector, useDispatch } from "react-redux";
import Button from "../Button/Button";
import { incrementCount, decrementCount } from "./cardActions";

function Card({ food, onAdd, onRemove }) {
  // eslint-disable-next-line no-unused-vars
  const { title, Image, price, id } = food;
  const count = useSelector((state) => state.count);
  const dispatch = useDispatch();

  const handleIncrement = () => {
    dispatch(incrementCount());
    onAdd(food);
  };

  const handleDecrement = () => {
    dispatch(decrementCount());
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
