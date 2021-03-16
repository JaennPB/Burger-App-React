import React from 'react';

import classes from './Input.module.css';

const input = (props) => {
  let inputElement = null;
  let inputClasses = [classes.InputElement];

  if (!props.valid && props.shouldValidate && props.touched) {
    inputClasses.push(classes.Invalid);
  }

  if (props.valid && props.touched) {
    inputClasses.push(classes.Valid);
  }

  let errorMesage = null;

  if (!props.valid && props.touched) {
    errorMesage = (
      <p className={classes.ErrorMessage}>
        Please enter a valid value: {props.type}
      </p>
    );
  }

  if (props.elementType === 'input')
    inputElement = (
      <input
        className={inputClasses.join(' ')}
        {...props.elementConfig}
        value={props.value}
        onChange={props.clicked}
      />
    );
  if (props.elementType === 'select')
    inputElement = (
      <select
        className={inputClasses.join(' ')}
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
      {errorMesage}
    </div>
  );
};

export default input;
