import React, { Component } from 'react';
import classes from './Layout.module.css';
import Toolbar from '../Navigation/Toolbar/Toolbar';
import SideDrawer from '../Navigation/Sidedrawer/Sidedrawer';

class Layout extends Component {
  state = {
    showSideDrawer: false,
  };

  closeSideDrawerHandler = () => {
    this.setState({ showSideDrawer: false });
  };

  openSideDrawerHandler = () => {
    this.setState({ showSideDrawer: true });
  };

  render() {
    return (
      <>
        <Toolbar buttonToggle={this.openSideDrawerHandler} />
        <SideDrawer
          shouldShow={this.state.showSideDrawer}
          close={this.closeSideDrawerHandler}
        />
        <main className={classes.BurgerContent}>{this.props.children}</main>
      </>
    );
  }
}

export default Layout;
