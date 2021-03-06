import React from 'react';
import classes from './Order.module.css';

const order = (props) => {
  const ingArray = [];
  for (let ing in props.ingredients) {
    ingArray.push({ name: ing, value: props.ingredients[ing] });
  }

  const ingredients = ingArray.map((ing) => {
    if (ing.value === 0) return;
    return (
      <li key={ing.name}>
        {ing.name}: X{ing.value}
      </li>
    );
  });

  return (
    <div className={classes.Order}>
      <h4>Order ID{props.orderNo}</h4>
      <section>
        <div className={classes.Ingredients}>
          <p>Ingredients:</p>
          <ul>{ingredients}</ul>
        </div>
        <div className={classes.Info}>
          <p>Contact Info:</p>
          <span>{props.info.name}</span>
          <span>{props.info.number}</span>
          <div>
            Delivery address:
            <ul>
              <li>{props.info.street}</li>
              <li>{props.info.city}</li>
              <li>{props.info.zipCode}</li>
            </ul>
          </div>
          <span className={classes.Method}>Delivery Method: {props.info.deliveryMethod}</span>
        </div>
      </section>
      <div className={classes.Price}>
        Price: <span>${props.price}</span>
      </div>
    </div>
  );
};

export default order;
