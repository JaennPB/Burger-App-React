import React from 'react';

import classes from './NavItems.module.css';
import NavItem from './NavItem/NavItem';

const navItems = () => (
  <ul className={classes.NavItems}>
    <NavItem link="/">Builder</NavItem>
    <NavItem link="/orders">Orders</NavItem>
    <NavItem link="/contact">Contact</NavItem>
  </ul>
);

export default navItems;
