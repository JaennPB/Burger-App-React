import * as actionTypes from './actionTypes';
import axios from '../../axios-orders';

export const addIngredient = (ingName) => {
  return {
    type: actionTypes.ADD_INGREDIENT,
    ingredientName: ingName,
  };
};

export const removeIngredient = (ingName) => {
  return {
    type: actionTypes.REMOVE_INGREDIENT,
    ingredientName: ingName,
  };
};

const initIngredients = (data) => {
  return {
    type: actionTypes.INIT_INGREDIENTS,
    ingredients: data,
  };
};

const errorIngredients = () => {
  return {
    type: actionTypes.ERROR_INGREDIENTS,
  };
};

export const asyncFetchIngredients = () => {
  return async (dispatch) => {
    try {
      const res = await axios.get('/ingredients.json');
      dispatch(initIngredients(res.data));
    } catch {
      dispatch(errorIngredients());
    }
  };
};
