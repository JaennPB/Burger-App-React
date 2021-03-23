import React, { Component } from 'react';
import { connect } from 'react-redux';

import axios from '../../axios-orders';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import classes from './BurgerBuilder.module.css';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';
import * as actions from '../../store/actions/indexActions';

class BurgerBuilder extends Component {
  // ONLY UI STATE, ALL FUNCTIONAL STATE MOVED TO REDUX
  state = {
    startOrder: false,
  };

  componentDidMount() {
    this.props.asyncFetchIngredients();
  }

  updatePurchasableState = (ingredients) => {
    const totalIngredients = Object.values(ingredients).some(
      (item) => item > 0
    );

    return totalIngredients > 0;
  };

  startOrderHandler = () => {
    this.setState({ startOrder: true });
  };

  cancelOrderHandler = () => {
    this.setState({ startOrder: false });
  };

  orderCheckoutHandler = () => {
    this.props.orderStartRedirect();
    this.props.history.push('/checkout');
  };

  render() {
    const copyIngredientsObject = {
      ...this.props.ings,
    };

    // chaging value to true or false on every render cycle
    for (let key in copyIngredientsObject) {
      copyIngredientsObject[key] = copyIngredientsObject[key] <= 0;
    }

    let burger = this.props.error ? (
      <div className={classes.BurgerBuilder}>
        'COULD NOT LOAD INGREDIENTS... TRY AGAIN.
      </div>
    ) : (
      <Spinner />
    );
    let orderSummary = null;
    if (this.props.ings) {
      burger = (
        <div className={classes.BurgerBuilder}>
          <BuildControls
            addIngredients={this.props.addIngredient}
            removeIngredients={this.props.removeIngredient}
            disabledInfo={copyIngredientsObject}
            price={this.props.price}
            purchasableInfo={this.updatePurchasableState(this.props.ings)}
            orderNow={this.startOrderHandler}
          />
          <Burger ingredientsObject={this.props.ings} />
        </div>
      );
      orderSummary = (
        <OrderSummary
          ingredients={this.props.ings}
          cancel={this.cancelOrderHandler}
          checkout={this.orderCheckoutHandler}
          total={this.props.price}
        />
      );
    }

    return (
      <>
        <Modal show={this.state.startOrder} hide={this.cancelOrderHandler}>
          {orderSummary}
        </Modal>
        {burger}
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    ings: state.burgerBuilder.ingredients,
    price: state.burgerBuilder.totalPrice,
    error: state.burgerBuilder.error,
  };
};

const mapDispatchToProps = actions;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withErrorHandler(BurgerBuilder, axios));
