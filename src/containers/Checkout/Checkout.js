import React, { Component } from 'react';
import { Route } from 'react-router';

import classes from './Checkout.module.css';
import CheckoutSummary from '../../components/Order/CheckoutSummary';
import ContactForm from '../Checkout/Form/ContactForm';

class Checkout extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ingredients: this.props.location.state.ingredients,
      totalPrice: this.props.location.state.price,
    };
  }

  componentDidMount() {
    console.log(this.props);
  }

  continueCheckoutHandler = () => {
    this.props.history.replace('/checkout/fill-data');
  };

  cancelCheckoutHandler = () => {
    this.props.history.goBack();
  };

  render() {
    return (
      <div className={classes.Container}>
        <CheckoutSummary
          ingredients={this.state.ingredients}
          continueCheckout={this.continueCheckoutHandler}
          cancelCheckout={this.cancelCheckoutHandler}
          price={this.state.totalPrice}
        />
        <Route
          path={`${this.props.match.path}/fill-data`}
          component={ContactForm}
        />
      </div>
    );
  }
}

export default Checkout;
