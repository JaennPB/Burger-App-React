import React from 'react';

import classes from './Control.module.css';

const control = (props) => (
  <div className={classes.BuildControl}>
    <div className={classes.Label}>{props.label}</div>
    <button className={classes.Less}>-</button>
    <button className={classes.More}>+</button>
  </div>
);

export default control;
