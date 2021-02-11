import React from 'react';
import classes from './Modal.module.css';

const modal = (props) => {
  return (
    <div
      style={{
        transform: props.show ? 'translateY(0)' : 'traslateY(-100)',
        opacity: props.show ? '1' : '0',
      }}
      className={classes.Modal}
    >
      {props.children}
    </div>
  );
};

export default modal;
