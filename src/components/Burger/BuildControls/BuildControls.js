import React from 'react';

import classes from './BuildControls.module.css';
import Control from './Control/Control';

const controls = [
  { label: 'Salad', key: 'salad' },
  { label: 'Bacon', key: 'bacon' },
  { label: 'Cheese', key: 'cheese' },
  { label: 'Meat', key: 'meat' },
];

const controlsArray = controls.map((ctrl) => {
  return <Control label={ctrl.label} key={ctrl.key} />;
});

const buildControls = (props) => (
  <div className={classes.Container}>{controlsArray}</div>
);

export default buildControls;
