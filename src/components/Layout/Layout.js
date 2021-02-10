import React from 'react';
import classes from './Layout.module.css';

const layout = (props) => (
  <div className={classes.Layout}>
    <div>Toolbar</div>
    <main>{props.children}</main>
  </div>
);

export default layout;
