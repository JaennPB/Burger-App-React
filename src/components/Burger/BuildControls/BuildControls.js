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
    {controls.map((ctrl) => {
      return (
        <Control
          key={ctrl.label}
          label={ctrl.label}
          addIng={() => props.addIngredients(ctrl.type)}
        />
      );
    })}
  </div>
);

export default buildControls;
