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
    return (
      <div className={classes.Container}>
        {this.props.purchased && <Redirect to="/orders" />}
        <CheckoutSummary
          ingredients={this.props.ings}
          continueCheckout={this.continueCheckoutHandler}
          cancelCheckout={this.cancelCheckoutHandler}
          price={this.props.price}
        />
        <Route path={`${this.props.match.path}/fill-data`} component={ContactForm} />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    ings: state.burgerBuilder.ingredients,
    price: state.burgerBuilder.totalPrice,
    purchased: state.orders.purchased,
  };
};

export default connect(mapStateToProps)(Checkout);
