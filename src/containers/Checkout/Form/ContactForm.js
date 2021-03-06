import React, { Component } from 'react';
import { animateScroll } from 'react-scroll';
import { connect } from 'react-redux';

import classes from './ContactForm.module.css';
import withErrorHandler from '../../../hoc/withErrorHandler/withErrorHandler';
import axios from '../../../axios-orders';
import Button from '../../../components/UI/Button/Button';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Input from '../../../components/UI/Form/Input/Input';
import * as actions from '../../../store/actions/indexActions';
import { checkValidation } from '../../../shared/checkValidity';

class ContactForm extends Component {
  state = {
    contactInfo: {
      name: {
        elementType: 'input',
        value: '',
        elementConfig: {
          type: 'text',
          placeholder: 'Your Full Name',
        },
        validationRules: {
          required: true,
          length: {
            minLength: 2,
            maxLength: 30,
          },
        },
        isValid: false,
        touched: false,
      },
      number: {
        elementType: 'input',
        value: '',
        elementConfig: {
          type: 'number',
          placeholder: 'Your Phone Number',
        },
        validationRules: {
          required: true,
          length: {
            minLength: 8,
            maxLength: 15,
          },
          isNumeric: true,
        },
        isValid: false,
        touched: false,
      },
      street: {
        elementType: 'input',
        value: '',
        elementConfig: {
          type: 'text',
          placeholder: 'Street and Number',
        },
        validationRules: {
          required: true,
          length: {
            minLength: 5,
            maxLength: 30,
          },
        },
        isValid: false,
        touched: false,
      },
      city: {
        elementType: 'input',
        value: '',
        elementConfig: {
          type: 'text',
          placeholder: 'City',
        },
        validationRules: {
          required: true,
          length: {
            minLength: 5,
            maxLength: 20,
          },
        },
        isValid: false,
        touched: false,
      },
      zipCode: {
        elementType: 'input',
        value: '',
        elementConfig: {
          type: 'Number',
          placeholder: 'Zip Code',
        },
        validationRules: {
          required: true,
          length: {
            minLength: 5,
            maxLength: 5,
          },
          isNumeric: true,
        },
        isValid: false,
        touched: false,
      },
      deliveryMethod: {
        elementType: 'select',
        value: 'Delivery',
        elementConfig: {
          options: [
            {
              value: 'Delivery',
              displayValue: 'Delivery',
            },
            {
              value: 'Pickup',
              displayValue: 'Pickup',
            },
          ],
        },
        isValid: true,
        touched: false,
      },
    },
    formIsValid: false,
  };

  componentDidMount() {
    animateScroll.scrollToBottom();
  }

  orderHandler = (e) => {
    e.preventDefault();

    const formData = {};
    for (let ElementID in this.state.contactInfo) {
      formData[ElementID] = this.state.contactInfo[ElementID].value;
    }

    const orderData = {
      userId: this.props.userId,
      ingredients: this.props.ings,
      totalPrice: this.props.price,
      contactInfo: formData,
    };

    this.props.asyncOrderStart(orderData, this.props.token);
  };

  changeInputValueHandler = (event, element) => {
    const formObject = {
      ...this.state.contactInfo,
      [element]: {
        ...this.state.contactInfo[element],
        value: event.target.value,
        isValid: checkValidation(event.target.value, this.state.contactInfo[element].validationRules),
        touched: true,
      },
    };

    // checking that all previous fields are also valid
    let formIsValid = true;
    for (let element in formObject) {
      formIsValid = formObject[element].isValid && formIsValid;
    }

    this.setState({ contactInfo: formObject, formIsValid: formIsValid });
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

    let form = (
      <form onSubmit={this.orderHandler}>
        <h4>Enter Contact Data</h4>
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
        <Button btnType="Green" disabled={!this.state.formIsValid} className={classes.Button}>
          Order Now!
        </Button>
      </form>
    );
    if (this.props.loading) {
      form = <Spinner />;
    }

    return <div className={classes.ContactForm}>{form}</div>;
  }
}

const mapStateToProps = (state) => {
  return {
    ings: state.burgerBuilder.ingredients,
    price: state.burgerBuilder.totalPrice,
    loading: state.orders.loading,
    token: state.auth.idToken,
    userId: state.auth.userId,
  };
};

const mapDispatchToProps = actions;

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(ContactForm, axios));
