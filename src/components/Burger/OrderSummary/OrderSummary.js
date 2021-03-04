import React from 'react';

import Button from '../../UI/Button/Button';
import classes from './OrderSummary.module.css';

const orderSummary = (props) => {
  const ingredientsSummary = Object.entries(props.ingredients).map((pair) => {
    return (
      <li key={pair[0]}>
        <span style={{ textTransform: 'capitalize' }}>{pair[0]}</span> X
        {pair[1]}
      </li>
    );
  });

  return (
    <div className={classes.OrderSummary}>
      <h3 className={classes.Title}>Your order</h3>
      <ul className={classes.Summary}>{ingredientsSummary}</ul>
      <div className={classes.Total}>
        Total Price: ${props.total.toFixed(2)}
      </div>
      <Button btnType="Green" clicked={props.checkout}>
        Checkout
      </Button>
      <Button btnType="Red" clicked={props.cancel}>
        Cancel
      </Button>
    </div>
  );
};

export default orderSummary;
