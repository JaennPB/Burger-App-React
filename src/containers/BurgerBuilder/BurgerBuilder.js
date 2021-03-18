import React, { Component } from 'react';
import { connect } from 'react-redux';

import axios from '../../axios-orders';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import classes from './BurgerBuilder.module.css';
import * as actionTypes from '../../store/actions';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';

class BurgerBuilder extends Component {
  state = {
    startOrder: false,
    loading: false,
    error: null,
  };

  async componentDidMount() {
    // console.log(this.props);
    try {
      const res = await axios.get('/ingredients.json');
      this.setState({
        ingredients: {
          salad: res.data.salad,
          bacon: res.data.bacon,
          cheese: res.data.cheese,
          meat: res.data.meat,
        },
      });
    } catch (error) {
      console.log('ERROR 💥', error);
      this.setState({ error: true });
    }
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

    let burger = this.state.error ? 'CANNOT LOAD INGREDIENTS' : <Spinner />;
    let orderSummary = null;
    if (this.props.ings) {
      burger = (
        <div className={classes.BurgerBuilder}>
          <BuildControls
            addIngredients={this.props.onIngredientAdd}
            removeIngredients={this.props.onIngredientRemove}
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

const mapStateToProps = (state) => {
  return {
    ings: state.ingredients,
    price: state.totalPrice,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onIngredientAdd: (ingName) =>
      dispatch({ type: actionTypes.ADD_INGREDIENT, ingredientName: ingName }),
    onIngredientRemove: (ingName) =>
      dispatch({
        type: actionTypes.REMOVE_INGREDIENT,
        ingredientName: ingName,
      }),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withErrorHandler(BurgerBuilder, axios));
