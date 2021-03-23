import React, { Component } from 'react';
import { Route, Redirect } from 'react-router';
import { connect } from 'react-redux';

import classes from './Checkout.module.css';
import CheckoutSummary from '../../components/Checkout/CheckoutSummary';
import ContactForm from '../Checkout/Form/ContactForm';

class Checkout extends Component {
  continueCheckoutHandler = () => {
    this.props.history.replace('/checkout/fill-data');
  };

  cancelCheckoutHandler = () => {
    this.props.history.goBack();
  };

  render() {
    let summary = <Redirect to="/" />;
    if (this.props.ings) {
      const redirectAfterPurchase = this.props.purchased ? (
        <Redirect to="/orders" />
      ) : null;
      summary = (
        <div className={classes.Container}>
          {redirectAfterPurchase}
          <CheckoutSummary
            ingredients={this.props.ings}
            continueCheckout={this.continueCheckoutHandler}
            cancelCheckout={this.cancelCheckoutHandler}
            price={this.props.price}
          />
          <Route
            path={`${this.props.match.path}/fill-data`}
            component={ContactForm}
          />
        </div>
      );
    }
    return summary;
  }
}

const mapStateToProps = (state) => {
  return {
    ings: state.burgerBuilder.ingredients,
    price: state.burgerBuilder.totalPrice,
    purchased: state.submitOrder.purchased,
  };
};

export default connect(mapStateToProps)(Checkout);
