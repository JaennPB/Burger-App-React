import * as actionTypes from '../actions/actionTypes';
import { updateState } from '../utility';

const INGREDIENTS_PRICE = {
  salad: 0.3,
  bacon: 1,
  cheese: 0.5,
  meat: 1.4,
};

const initialState = {
  ingredients: null,
  totalPrice: 4,
  error: false,
};

const burgerBuilderReducer = (state = initialState, actions) => {
  switch (actions.type) {
    case actionTypes.ADD_INGREDIENT:
      return updateState(state, {
        ingredients: {
          ...state.ingredients,
          [actions.ingredientName]:
            state.ingredients[actions.ingredientName] + 1,
        },
        totalPrice:
          state.totalPrice + INGREDIENTS_PRICE[actions.ingredientName],
      });
    case actionTypes.REMOVE_INGREDIENT:
      return updateState(state, {
        ingredients: {
          ...state.ingredients,
          [actions.ingredientName]:
            state.ingredients[actions.ingredientName] - 1,
        },
        totalPrice:
          state.totalPrice - INGREDIENTS_PRICE[actions.ingredientName],
      });
    case actionTypes.INIT_INGREDIENTS:
      return updateState(state, {
        ingredients: {
          salad: actions.ingredients.salad,
          bacon: actions.ingredients.bacon,
          cheese: actions.ingredients.cheese,
          meat: actions.ingredients.meat,
        },
        error: false,
      });
    case actionTypes.ERROR_INGREDIENTS:
      return updateState(state, { error: true });
  }
  return state;
};

export default burgerBuilderReducer;
