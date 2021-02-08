import { checkPropTypes } from 'prop-types';
import React from 'react';

import classes from './Burger.module.css';
import BurgerIngredients from '../Burger/BurgerIngredients/BurgerIngredients';

const burger = (props) => {
  const ingredientsArray = Object.keys(props.ingredientsObject).map(
    // [salad, bacon, cheese, meat]
    (ingKey) => {
      return [...Array(props.ingredientsObject[ingKey])].map((_, i) => {
        // i.e: salad: 2 = [undefined, undefined]
        return <BurgerIngredients key={ingKey + i} type={ingKey} />;
      });
    }
  );

  console.log(ingredientsArray);
  return (
    <div className={classes.Burger}>
      <BurgerIngredients type="bread-top" />
      {ingredientsArray}
      <BurgerIngredients type="bread-bottom" />
    </div>
  );
};

export default burger;
