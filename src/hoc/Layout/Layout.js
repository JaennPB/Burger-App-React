import React, { Component } from 'react';
import { connect } from 'react-redux';

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
        <Toolbar buttonToggle={this.openSideDrawerHandler} authCurrState={this.props.authState} />
        <SideDrawer
          shouldShow={this.state.showSideDrawer}
          close={this.closeSideDrawerHandler}
          authCurrState={this.props.authState}
        />
        <main className={classes.BurgerContent}>{this.props.children}</main>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    authState: state.auth.idToken != null,
  };
};

export default connect(mapStateToProps)(Layout);
