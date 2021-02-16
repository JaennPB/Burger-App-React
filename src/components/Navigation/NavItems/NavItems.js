import React from 'react';

import classes from './NavItems.module.css';
import NavItem from './NavItem/NavItem';

const navItems = () => (
  <ul className={classes.NavItems}>
    <NavItem link="/" active>
      Burger Builder
    </NavItem>
    <NavItem link="/">Checkout</NavItem>
    <NavItem link="/">Contact</NavItem>
  </ul>
);

export default navItems;
