import * as actionTypes from './actions';

const INGREDIENTS_PRICE = {
  salad: 0.3,
  bacon: 1,
  cheese: 0.5,
  meat: 1.4,
};

const initialState = {
  ingredients: {
    salad: 0,
    bacon: 0,
    cheese: 0,
    meat: 0,
  },
  totalPrice: 4,
};

const reducer = (state = initialState, actions) => {
  switch (actions.type) {
    case actionTypes.ADD_INGREDIENT:
      return {
        ...state,
        ingredients: {
          ...state.ingredients,
          [actions.ingredientName]:
            state.ingredients[actions.ingredientName] + 1,
        },
        totalPrice:
          state.totalPrice + INGREDIENTS_PRICE[actions.ingredientName],
      };
    case actionTypes.REMOVE_INGREDIENT:
      return {
        ...state,
        ingredients: {
          ...state.ingredients,
          [actions.ingredientName]:
            state.ingredients[actions.ingredientName] - 1,
        },
        totalPrice:
          state.totalPrice - INGREDIENTS_PRICE[actions.ingredientName],
      };
  }
  return state;
};

export default reducer;
