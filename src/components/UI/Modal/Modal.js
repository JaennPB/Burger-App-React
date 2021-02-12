import React from 'react';
import classes from './Modal.module.css';
import Backdrop from '../Backdrop/Backdrop';

const modal = (props) => {
  return (
    <React.Fragment>
      <Backdrop show={props.show} hideModal={props.hide} />
      <div
        style={{
          opacity: props.show ? '1' : '0',
          visibility: props.show ? 'visible' : 'hidden',
        }}
        className={classes.Modal}
      >
        {props.children}
      </div>
    </React.Fragment>
  );
};

export default modal;
