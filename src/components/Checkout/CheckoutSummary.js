import React from 'react';
import classes from './CheckoutSummary.module.css';
import { withRouter } from 'react-router-dom';

import Burger from '../Burger/Burger';
import Button from '../UI/Button/Button';

const checkoutSummary = (props) => {
  // console.log(props);
  return (
    <div className={classes.Summary}>
      <h1>This is your burger! Hope you enjoy it!</h1>
      <div className={classes.BurgerContainer}>
        <Burger ingredientsObject={props.ingredients} />
      </div>
      <Button btnType="Green" clicked={props.continueCheckout}>
        <p>Total: ${props.price.toFixed(2)}</p>Ready to Checkout?
      </Button>
      <Button btnType="Red" clicked={props.cancelCheckout}>
        Cancel
      </Button>
    </div>
  );
};

export default withRouter(checkoutSummary);
