import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import * as actions from '../../../store/actions/indexActions';

class Logout extends Component {
  componentDidMount() {
    this.props.authLogout();
  }

  render() {
    return <Redirect to="/login" />;
  }
}

export default connect(null, actions)(Logout);
