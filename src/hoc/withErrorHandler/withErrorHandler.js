import React, { Component } from 'react';

import Modal from '../../components/UI/Modal/Modal';

const withErrorHandler = (WrappedComponents, axios) => {
  return class extends Component {
    constructor(props) {
      super(props);
      this.state = {
        error: null,
      };

      this.reqInt = axios.interceptors.request.use((req) => {
        this.setState({ error: null });
        return req;
      });

      this.resInt = axios.interceptors.response.use(
        (res) => res,
        (error) => {
          this.setState({ error: error });
          return Promise.reject(error);
        }
      );
    }

    componentWillUnmount() {
      axios.interceptors.request.eject(this.reqInt);
      axios.interceptors.response.eject(this.resInt);
    }

    errorConfirmed = () => {
      this.setState({ error: null });
    };

    render() {
      return (
        <>
          <Modal show={this.state.error} hide={this.errorConfirmed}>
            {this.state.error ? '💥ERROR💥' + this.state.error.message : null}
          </Modal>
          <WrappedComponents {...this.props} />
        </>
      );
    }
  };
};

export default withErrorHandler;
