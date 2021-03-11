import React, { Component } from 'react';
import classes from './Layout.module.css';

import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import SideDrawer from '../../components/Navigation/Sidedrawer/Sidedrawer';

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
      <div className={classes.WholeContainer}>
        <Toolbar
          className={classes.Toolbar}
          buttonToggle={this.openSideDrawerHandler}
        />
        <SideDrawer
          shouldShow={this.state.showSideDrawer}
          close={this.closeSideDrawerHandler}
        />
        <main className={classes.BurgerContent}>{this.props.children}</main>
      </div>
    );
  }
}

export default Layout;
