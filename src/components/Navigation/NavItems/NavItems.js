import React from 'react';

import classes from './NavItems.module.css';
import NavItem from './NavItem/NavItem';

const navItems = (props) => {
  let authState = props.isAuth ? (
    <NavItem link="/logout">Logout</NavItem>
  ) : (
    <NavItem link="/login">Login / Signup</NavItem>
  );

  return (
    <ul className={classes.NavItems}>
      <NavItem link="/">Builder</NavItem>
      {props.isAuth && <NavItem link="/orders">Orders</NavItem>}
      {authState}
    </ul>
  );
};

export default navItems;
