import React, { Component } from 'react';

import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';

const INGREDIENTS_PRICE = {
  salad: 0.3,
  bacon: 1,
  cheese: 0.5,
  meat: 1.4,
};

class BurgerBuilder extends Component {
  state = {
    ingredients: {
      salad: 0,
      bacon: 0,
      cheese: 0,
      meat: 0,
    },
    totalPrice: 2,
    purchasable: false,
    startOrder: false,
  };

  updatePurchasableState = (ingredients) => {
    const totalIngredients = Object.values(ingredients).some(
      (item) => item > 0
    );

    this.setState({ purchasable: totalIngredients > 0 });
  };

  addIngredientsHandler = (type) => {
    const oldCount = this.state.ingredients[type];
    const updatedCount = oldCount + 1;

    const newIngObject = {
      ...this.state.ingredients,
    };
    newIngObject[type] = updatedCount;

    const itemPrice = INGREDIENTS_PRICE[type];
    const oldPrice = this.state.totalPrice;
    const newPrice = oldPrice + itemPrice;

    this.setState({ totalPrice: newPrice, ingredients: newIngObject });

    this.updatePurchasableState(newIngObject);
  };

  removeIngredientsHandler = (type) => {
    const oldCount = this.state.ingredients[type];
    if (!oldCount) return;
    const updatedCount = oldCount - 1;

    const newIngObject = {
      ...this.state.ingredients,
    };
    newIngObject[type] = updatedCount;

    const itemPrice = INGREDIENTS_PRICE[type];
    const oldPrice = this.state.totalPrice;
    const newPrice = oldPrice - itemPrice;

    this.setState({ totalPrice: newPrice, ingredients: newIngObject });

    this.updatePurchasableState(newIngObject);
  };

  startOrderHandler = () => {
    this.setState({ startOrder: true });
  };

  cancelOrderHandler = () => {
    this.setState({ startOrder: false });
  };

  orderCheckoutHandler = () => {
    alert('checking out');
  };

  render() {
    const copyIngredientsObject = {
      ...this.state.ingredients,
    };

    // chaging value to true or false on every render cycle
    for (let key in copyIngredientsObject) {
      copyIngredientsObject[key] = copyIngredientsObject[key] <= 0;
    }

    return (
      <>
        <Modal show={this.state.startOrder} hide={this.cancelOrderHandler}>
          <OrderSummary
            ingredients={this.state.ingredients}
            cancel={this.cancelOrderHandler}
            checkout={this.orderCheckoutHandler}
            total={this.state.totalPrice}
          />
        </Modal>
        <Burger ingredientsObject={this.state.ingredients} />
        <BuildControls
          addIngredients={this.addIngredientsHandler}
          removeIngredients={this.removeIngredientsHandler}
          disabledInfo={copyIngredientsObject}
          price={this.state.totalPrice}
          purchasableInfo={this.state.purchasable}
          orderNow={this.startOrderHandler}
        />
      </>
    );
  }
}

export default BurgerBuilder;
