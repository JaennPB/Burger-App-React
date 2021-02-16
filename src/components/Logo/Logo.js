import React from 'react';

import classes from './Logo.module.css';
import logo from '../../assets/images/logo.png';

const appLogo = (props) => (
  <div className={classes.Logo}>
    <img src={logo} alt="my logo" />
    <span>BURGER MAKER</span>
  </div>
);

export default appLogo;
