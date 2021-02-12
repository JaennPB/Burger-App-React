import React from 'react';

import classes from './Burger.module.css';
import BurgerIngredients from '../Burger/BurgerIngredients/BurgerIngredients';

const burger = (props) => {
  // Object.keys returns an array from the keys of an object [salad, bacon, cheese, meat]
  // we loop newly created array with map to return a new []
  let ingredientsArray = Object.keys(props.ingredientsObject).map((key) => {
    // for each key, return array/arrays  by passing the value of key into Array(value)
    // and spreading each object into own array inside an array [[undefined, undefined], [0], [undefined], [0]]
    return [...Array(props.ingredientsObject[key])].map((_, i) => {
      // looping through each created array and adding jsx
      // final result [[{jsx element}, {jsx element}], [], [{jsx element}], [] ]
      return <BurgerIngredients key={key + i} type={key} />;
    });
  });

  if (ingredientsArray.flat().length === 0) {
    ingredientsArray = <p className={classes.Text}>Please add ingredients!</p>;
  }

  return (
    <div className={classes.Burger}>
      <BurgerIngredients type="bread-top" />
      {ingredientsArray}
      <BurgerIngredients type="bread-bottom" />
    </div>
  );
};

export default burger;
