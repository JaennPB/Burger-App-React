import React from 'react';

import classes from './BuildControls.module.css';
import Control from './Control/Control';

const controls = [
  { label: 'Salad', type: 'salad' },
  { label: 'Bacon', type: 'bacon' },
  { label: 'Cheese', type: 'cheese' },
  { label: 'Meat', type: 'meat' },
];

const buildControls = (props) => (
  <div className={classes.Container}>
    <div className={classes.Content}>
      <h4>Add ingredients</h4>
      {controls.map((ctrl) => {
        return (
          <Control
            key={ctrl.label}
            label={ctrl.label}
            addIng={() => props.addIngredients(ctrl.type)}
            removeIng={() => props.removeIngredients(ctrl.type)}
            disabled={props.disabledInfo[ctrl.type]}
          />
        );
      })}
      <p className={classes.Price}>Price: ${props.price.toFixed(2)}</p>
      <button
        className={classes.OrderButton}
        disabled={!props.purchasableInfo}
        onClick={props.orderNow}
      >
        ORDER NOW
      </button>
    </div>
  </div>
);

export default buildControls;
