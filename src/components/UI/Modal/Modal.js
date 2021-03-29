import React, { Component } from 'react';

import classes from './Modal.module.css';
import Backdrop from '../Backdrop/Backdrop';

class Modal extends Component {
  shouldComponentUpdate(nextProps, nextState, nextContext) {
    return nextProps.show !== this.props.show || nextProps.show !== this.props.children;
  }

  render() {
    return (
      <React.Fragment>
        <Backdrop show={this.props.show} clicked={this.props.hide} />
        <div
          style={{
            opacity: this.props.show ? '1' : '0',
            visibility: this.props.show ? 'visible' : 'hidden',
          }}
          className={classes.Modal}
        >
          {this.props.children}
        </div>
      </React.Fragment>
    );
  }
}

export default Modal;
