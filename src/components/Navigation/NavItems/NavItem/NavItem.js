import React from 'react';
import { NavLink } from 'react-router-dom';

import classes from './NavItem.module.css';

const navItem = (props) => (
  <li className={classes.NavItem}>
    <NavLink to={props.link} exact activeClassName={classes.Active}>
      {props.children}
    </NavLink>
  </li>
);

export default navItem;
