import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import Button from '../../components/UI/Button/Button';
import Input from '../../components/UI/Form/Input/Input';
import Spinner from '../../components/UI/Spinner/Spinner';
import classes from './Auth.module.css';
import * as actions from '../../store/actions/indexActions';
import { checkValidation } from '../../shared/checkValidity';

class Auth extends Component {
  state = {
    contactInfo: {
      // username: {
      //   elementType: 'input',
      //   value: '',
      //   elementConfig: {
      //     type: 'text',
      //     placeholder: 'Username',
      //   },
      //   validationRules: {
      //     required: true,
      //     length: {
      //       minLength: 5,
      //       maxLength: 15,
      //     },
      //   },
      //   isValid: false,
      //   touched: false,
      // },
      email: {
        elementType: 'input',
        value: '',
        elementConfig: {
          type: 'email',
          placeholder: 'Your E-Mail',
        },
        validationRules: {
          required: true,
          length: {
            minLength: '123@gmail.com'.length,
            maxLength: '123@gmail.com'.length + 30,
          },
          isEmail: true,
        },
        isValid: false,
        touched: false,
      },
      password: {
        elementType: 'input',
        value: '',
        elementConfig: {
          type: 'password',
          placeholder: 'Password',
        },
        validationRules: {
          required: true,
          length: {
            minLength: 6,
            maxLength: 20,
          },
        },
        isValid: false,
        touched: false,
      },
    },
    signUp: true,
  };

  changeInputValueHandler = (event, element) => {
    // when copying: always access origianl object to copy even inside nested paths
    const formObject = {
      ...this.state.contactInfo,
      [element]: {
        ...this.state.contactInfo[element],
        value: event.target.value,
        isValid: checkValidation(event.target.value, this.state.contactInfo[element].validationRules),
        touched: true,
      },
    };

    this.setState({ contactInfo: formObject });
  };

  startAuthHandler = (e) => {
    e.preventDefault();
    this.props.asyncAuthentication(
      // this.state.contactInfo.username.value, // TODOOOO!!!!!!!!!!!!
      this.state.contactInfo.email.value,
      this.state.contactInfo.password.value,
      this.state.signUp
    );
  };

  switchAuthMode = () => {
    this.setState((prevState) => {
      return { signUp: !prevState.signUp };
    });
  };

  render() {
    const formArray = [];
    const formObject = this.state.contactInfo;

    for (let key in formObject) {
      formArray.push({
        key: key,
        config: formObject[key],
      });
    }

    let authSection = (
      <>
        <form onSubmit={this.startAuthHandler}>
          <h4>{this.state.signUp ? 'Enter your info to Sign Up!' : 'Welcome back!'}</h4>
          {formArray.map((el) => {
            return (
              <Input
                key={el.key}
                elementType={el.config.elementType}
                elementConfig={el.config.elementConfig}
                type={el.config.elementConfig.placeholder}
                valid={el.config.isValid}
                shouldValidate={el.config.validationRules}
                touched={el.config.touched}
                value={el.config.value}
                clicked={(event) => this.changeInputValueHandler(event, el.key)}
              />
            );
          })}
          <Button btnType="Green" className={classes.Button}>
            {this.state.signUp ? 'Sign Up!' : 'Login!'}
          </Button>
        </form>
        <Button clicked={this.switchAuthMode} btnType="Red">
          Switch to {this.state.signUp ? 'Log In' : 'Sign Up'}
        </Button>
      </>
    );

    if (this.props.loading) {
      authSection = <Spinner />;
    }

    let errorMessage = null;
    if (this.props.error && this.props.error.message === 'INVALID_PASSWORD') {
      errorMessage = <p className={classes.ErrorMessage}>INVALID PASSWORD!</p>;
    } else if (this.props.error && this.props.error.message === 'EMAIL_EXISTS') {
      errorMessage = <p className={classes.ErrorMessage}>USER ALREADY EXISTS! PLEASE LOGIN INSTEAD</p>;
    } else if (this.props.error && this.props.error.message === 'INVALID_EMAIL') {
      errorMessage = <p className={classes.ErrorMessage}>PLEASE ENTER YOUR CREDENTIALS</p>;
    } else if (this.props.error && this.props.error.message === 'EMAIL_NOT_FOUND') {
      errorMessage = <p className={classes.ErrorMessage}>USER NOT FOUND! PLEASE SIGN UP INSTEAD!</p>;
    } else if (this.props.error) {
      errorMessage = <p className={classes.ErrorMessage}>{this.props.error.message}</p>;
    }

    let redirect = null;
    if (this.props.isAuth && this.props.building) {
      redirect = <Redirect to="/checkout" />;
    } else if (this.props.isAuth && !this.props.building) {
      redirect = <Redirect to="/" />;
    }

    return (
      <div className={classes.Auth}>
        {redirect}
        {authSection}
        {errorMessage}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    loading: state.auth.loading,
    error: state.auth.error,
    building: state.burgerBuilder.building,
    isAuth: state.auth.idToken !== null,
  };
};

const mapDispatchToProps = actions;

export default connect(mapStateToProps, mapDispatchToProps)(Auth);
