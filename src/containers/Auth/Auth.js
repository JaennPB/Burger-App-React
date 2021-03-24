import React, { Component } from 'react';

import Button from '../../components/UI/Button/Button';
import Input from '../../components/UI/Form/Input/Input';
import classes from './Auth.module.css';

class Auth extends Component {
  state = {
    contactInfo: {
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
  };

  checkValidation = (value, rules) => {
    let valid = true;

    if (!rules) return true;

    if (rules.required) {
      valid = value.trim() !== '' && valid;
    }

    if (rules.length) {
      valid = value.length >= rules.length.minLength && value.length <= rules.length.maxLength && valid;
    }

    if (rules.isEmail) {
      const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
      valid = pattern.test(value) && valid;
    }

    return valid;
  };

  changeInputValueHandler = (event, element) => {
    const formObject = {
      ...this.state.contactInfo,
      [element]: {
        ...this.state.contactInfo[element],
        value: event.target.value,
        isValid: this.checkValidation(event.target.value, this.state.contactInfo[element].validationRules),
        touched: true,
      },
    };

    this.setState({ contactInfo: formObject });
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

    return (
      <div className={classes.Auth}>
        <form>
          <h4>Enter email and password</h4>
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
            LOG IN!
          </Button>
        </form>
      </div>
    );
  }
}

export default Auth;
