import React from 'react';

import classes from './SideDrawerButton.module.css';

const sideDrawerButton = (props) => (
  <div className={classes.SideDrawerButton} onClick={props.clicked}>
    <div></div>
    <div></div>
    <div></div>
  </div>
);

export default sideDrawerButton;
