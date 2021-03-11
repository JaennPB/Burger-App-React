import React, { Component } from 'react';

import classes from './Checkout.module.css';
import CheckoutSummary from '../../components/Order/CheckoutSummary';

class Checkout extends Component {
  state = {
    ingredients: {
      meat: 1,
      cheese: 1,
      salad: 1,
      bacon: 1,
    },
  };

  render() {
    return (
      <div className={classes.Container}>
        <CheckoutSummary ingredients={this.state.ingredients} />
      </div>
    );
  }
}

export default Checkout;
