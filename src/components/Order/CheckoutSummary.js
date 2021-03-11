import React from 'react';
import classes from './CheckoutSummary.module.css';

import Burger from '../Burger/Burger';
import Button from '../UI/Button/Button';

const checkoutSummary = (props) => {
  const test = () => {
    console.log('hi');
  };

  return (
    <div className={classes.Summary}>
      <h1>Enjoy your meal!</h1>
      <div className={classes.BurgerContainer}>
        <Burger ingredientsObject={props.ingredients} />
      </div>
      <Button btnType="Green" clicked={test}>
        Continue with order
      </Button>
      <Button btnType="Red" clicked={test}>
        Go back
      </Button>
    </div>
  );
};

export default checkoutSummary;
