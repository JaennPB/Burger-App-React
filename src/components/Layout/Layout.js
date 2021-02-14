import React from 'react';
import classes from './Layout.module.css';
import Toolbar from '../Toolbar/Toolbar';

const layout = (props) => (
  <>
    <Toolbar />
    <main className={classes.BurgerContent}>{props.children}</main>
  </>
);

export default layout;
