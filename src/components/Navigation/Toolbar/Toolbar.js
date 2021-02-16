import React from 'react';

import classes from './Toolbar.module.css';
import AppLogo from '../../Logo/Logo';

const toolbar = (props) => (
  <header className={classes.Toolbar}>
    <AppLogo />
    <nav>...</nav>
  </header>
);

export default toolbar;
