import React, { Component } from 'react';

import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';

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

  render() {
    const copyIngredientsObject = {
      ...this.state.ingredients,
    };

    // chaging value to true or false on every render cycle
    for (let key in copyIngredientsObject) {
      copyIngredientsObject[key] = copyIngredientsObject[key] <= 0;
    }

    return (
      <React.Fragment>
        <Burger ingredientsObject={this.state.ingredients} />
        <BuildControls
          addIngredients={this.addIngredientsHandler}
          removeIngredients={this.removeIngredientsHandler}
          disabledInfo={copyIngredientsObject}
          price={this.state.totalPrice}
          purchasableInfo={this.state.purchasable}
        />
      </React.Fragment>
    );
  }
}

export default BurgerBuilder;
