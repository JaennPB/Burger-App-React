import React, { Component } from 'react';

import Button from '../../UI/Button/Button';
import classes from './OrderSummary.module.css';

class OrderSummary extends Component {
  // change into a functional component later...
  // component did update only for debugging purposes

  componentDidUpdate(prevProps, prevState) {
    console.log('[OrderSummary] updated');
  }

  render() {
    const ingredientsSummary = Object.entries(this.props.ingredients).map(
      (pair) => {
        return (
          <li key={pair[0]}>
            <span style={{ textTransform: 'capitalize' }}>{pair[0]}</span> X
            {pair[1]}
          </li>
        );
      }
    );

    return (
      <div className={classes.OrderSummary}>
        <h3 className={classes.Title}>Your order</h3>
        <ul className={classes.Summary}>{ingredientsSummary}</ul>
        <div className={classes.Total}>
          Total Price: ${this.props.total.toFixed(2)}
        </div>
        <Button btnType="Green" clicked={this.props.checkout}>
          Checkout
        </Button>
        <Button btnType="Red" clicked={this.props.cancel}>
          Cancel
        </Button>
      </div>
    );
  }
}

export default OrderSummary;
