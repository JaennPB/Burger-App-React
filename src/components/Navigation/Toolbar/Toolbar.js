import React from 'react';

import classes from './Toolbar.module.css';
import AppLogo from '../../Logo/Logo';
import NavItems from '../NavItems/NavItems';
import SideDrawerButton from '../../UI/SideDrawerButton/SideDrawerButton';

const toolbar = (props) => (
  <header className={classes.Toolbar}>
    <div className={classes.AppLogo}>
      <AppLogo />
    </div>
    <nav>
      <NavItems />
    </nav>
    <SideDrawerButton clicked={props.buttonToggle} />
  </header>
);

export default toolbar;
