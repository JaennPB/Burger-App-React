import React from 'react';

import classes from './Toolbar.module.css';
import AppLogo from '../../Logo/Logo';
import NavItems from '../NavItems/NavItems';

const toolbar = (props) => (
  <header className={classes.Toolbar}>
    <AppLogo />
    <nav>
      <NavItems />
    </nav>
  </header>
);

export default toolbar;
