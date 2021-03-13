import React from 'react';

import classes from './Input.module.css';

const input = (props) => {
  let inputElement = null;

  if (props.elementType === 'input')
    inputElement = (
      <input
        className={classes.InputElement}
        {...props.elementConfig}
        value={props.value}
        onChange={props.clicked}
      />
    );
  if (props.elementType === 'select')
    inputElement = (
      <select
        className={classes.InputElement}
        value={props.value}
        onChange={props.clicked}
      >
        {props.elementConfig.options.map((el) => (
          <option value={el.value} key={el.value}>
            {el.displayValue}
          </option>
        ))}
      </select>
    );

  return (
    <div className={classes.Input}>
      <label className={classes.Label}>{props.label}</label>
      {inputElement}
    </div>
  );
};

export default input;
