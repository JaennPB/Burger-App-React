import React, { Component } from 'react';
import axios from '../../axios-orders';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import classes from './BurgerBuilder.module.css';

import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';

const INGREDIENTS_PRICE = {
  salad: 0.3,
  bacon: 1,
  cheese: 0.5,
  meat: 1.4,
};

class BurgerBuilder extends Component {
  state = {
    ingredients: null,
    totalPrice: 2,
    purchasable: false,
    startOrder: false,
    loading: false,
    error: null,
  };

  async componentDidMount() {
    try {
      const res = await axios.get('/ingredients.json');
      this.setState({ ingredients: res.data });
    } catch (error) {
      console.log('ERROR 💥', error);
      this.setState({ error: true });
    }
  }

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

  orderCheckoutHandler = async () => {
    this.setState({ loading: true });
    const data = {
      ingredients: this.state.ingredients,
      totalPrice: this.state.totalPrice,
      customer: {
        name: 'Jaenn Poumian',
        address: {
          street: '101 Test Street',
          city: 'Test City',
          zipCode: '11100',
          country: 'Mexico',
        },
      },
      deliveryMethod: 'fastest',
    };
    try {
      await axios.post('/orders.json', data).then((data) => {
        console.log(data);
        this.setState({ loading: false, startOrder: false });
      });
    } catch (err) {
      console.log(err);
      this.setState({ loading: false, startOrder: false });
    }
  };

  render() {
    const copyIngredientsObject = {
      ...this.state.ingredients,
    };

    // chaging value to true or false on every render cycle
    for (let key in copyIngredientsObject) {
      copyIngredientsObject[key] = copyIngredientsObject[key] <= 0;
    }

    let burger = this.state.error ? 'CANNOT LOAD INGREDIENTS' : <Spinner />;
    let orderSummary = null;

    if (this.state.ingredients) {
      burger = (
        <div className={classes.BurgerBuilder}>
          <Burger ingredientsObject={this.state.ingredients} />
          <BuildControls
            addIngredients={this.addIngredientsHandler}
            removeIngredients={this.removeIngredientsHandler}
            disabledInfo={copyIngredientsObject}
            price={this.state.totalPrice}
            purchasableInfo={this.state.purchasable}
            orderNow={this.startOrderHandler}
          />
        </div>
      );
      orderSummary = (
        <OrderSummary
          ingredients={this.state.ingredients}
          cancel={this.cancelOrderHandler}
          checkout={this.orderCheckoutHandler}
          total={this.state.totalPrice}
        />
      );
    }

    if (this.state.loading) {
      orderSummary = <Spinner />;
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

export default withErrorHandler(BurgerBuilder, axios);
