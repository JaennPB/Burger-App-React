import React from 'react';
import Button from '../../UI/Button/Button';

const orderSumarry = (props) => {
  const ingredientsSummary = Object.entries(props.ingredients).map((pair) => {
    return (
      <li key={pair[0]}>
        <span style={{ textTransform: 'capitalize' }}>{pair[0]}</span> X
        {pair[1]}
      </li>
    );
  });

  return (
    <React.Fragment>
      <h3>Your order</h3>
      <ul>{ingredientsSummary}</ul>
      <p>Continue to checkout?</p>
      <div>Total Price: ${props.total.toFixed(2)}</div>
      <Button btnType="Green" clicked={props.checkout}>
        Checkout
      </Button>
      <Button btnType="Red" clicked={props.cancel}>
        Cancel
      </Button>
    </React.Fragment>
  );
};

export default orderSumarry;
