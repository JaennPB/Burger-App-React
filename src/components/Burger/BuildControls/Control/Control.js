import React from 'react';

import classes from './Control.module.css';

const control = (props) => (
  <div className={classes.BuildControl}>
    <div className={classes.Label}>{props.label}</div>
    <button
      className={classes.Less}
      onClick={props.removeIng}
      disabled={props.disabled}
    >
      -
    </button>
    <button className={classes.More} onClick={props.addIng}>
      +
    </button>
  </div>
);

export default control;
