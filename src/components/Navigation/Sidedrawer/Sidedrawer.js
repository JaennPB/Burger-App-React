import React from 'react';

import NavItems from '../NavItems/NavItems';
import classes from './Sidedrawer.module.css';
import Backdrop from '../../UI/Backdrop/Backdrop';

const sideDrawer = (props) => {
  let attachedClasses = [classes.SideDrawer, classes.Close];

  if (props.shouldShow) {
    attachedClasses.pop();
    attachedClasses.push(classes.Open);
  }
  return (
    <>
      <Backdrop show={props.shouldShow} clicked={props.close} />
      <div className={attachedClasses.join(' ')} onClick={props.close}>
        <nav>
          <NavItems isAuth={props.authCurrState} />
        </nav>
      </div>
    </>
  );
};

export default sideDrawer;
