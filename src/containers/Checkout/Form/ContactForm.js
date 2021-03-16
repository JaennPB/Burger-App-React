import React, { Component } from 'react';
import classes from './ContactForm.module.css';
import { animateScroll } from 'react-scroll';
import axios from '../../../axios-orders';

import Button from '../../../components/UI/Button/Button';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Input from '../../../components/UI/Form/Input/Input';

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
        },
        isValid: false,
        touched: false,
      },
      deliveryMethod: {
        elementType: 'select',
        value: '',
        elementConfig: {
          options: [
            {
              value: 'delivery',
              displayValue: 'Delivery',
            },
            {
              value: 'pickup',
              displayValue: 'Pickup',
            },
          ],
        },
        isValid: true,
        touched: false,
      },
    },
    ingredients: null,
    totalPrice: null,
    loading: false,
    formIsValid: false,
  };

  componentDidMount() {
    animateScroll.scrollToBottom();
  }

  orderHandler = async (e) => {
    e.preventDefault();
    // console.log(this.props.ingredients, this.props.price);
    this.setState({ loading: true });

    const formData = {};
    for (let ElementID in this.state.contactInfo) {
      formData[ElementID] = this.state.contactInfo[ElementID].value;
    }

    const data = {
      ingredients: this.props.ingredients,
      totalPrice: this.props.price,
      contactInfo: formData,
    };
    try {
      await axios.post('/orders.json', data).then((data) => {
        // console.log(data);
        this.setState({ loading: false });

        this.props.history.replace('/orders');
      });
    } catch (err) {
      console.log(err);
      this.setState({ loading: false });
    }
  };

  checkValidation = (value, rules) => {
    let valid = true;

    if (!rules) return true;

    if (rules.required) {
      valid = value.trim() !== '' && valid;
    }

    if (rules.length) {
      valid =
        value.length >= rules.length.minLength &&
        value.length <= rules.length.maxLength &&
        valid;
    }

    return valid;
  };

  changeInputValueHandler = (event, element) => {
    const formObject = {
      ...this.state.contactInfo,
    };
    const elementObject = {
      ...formObject[element],
    };
    elementObject.value = event.target.value;
    elementObject.isValid = this.checkValidation(
      elementObject.value,
      elementObject.validationRules
    );
    elementObject.touched = true;
    formObject[element] = elementObject;
    // console.log(elementObject);

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
        <Button
          btnType="Green"
          disabled={!this.state.formIsValid}
          className={classes.Button}
        >
          Order Now!
        </Button>
      </form>
    );
    if (this.state.loading) {
      form = <Spinner />;
    }

    return <div className={classes.ContactForm}>{form}</div>;
  }
}

export default ContactForm;
