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
      },
      email: {
        elementType: 'input',
        value: '',
        elementConfig: {
          type: 'email',
          placeholder: 'Your E-Mail',
        },
      },
      street: {
        elementType: 'input',
        value: '',
        elementConfig: {
          type: 'text',
          placeholder: 'Street and Number',
        },
      },
      city: {
        elementType: 'input',
        value: '',
        elementConfig: {
          type: 'text',
          placeholder: 'City',
        },
      },
      zipCode: {
        elementType: 'input',
        value: '',
        elementConfig: {
          type: 'Number',
          placeholder: 'Zip Code',
        },
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
      },
    },
    ingredients: null,
    totalPrice: null,
    loading: false,
  };

  componentDidMount() {
    animateScroll.scrollToBottom();
  }

  orderHandler = async (e) => {
    e.preventDefault();
    // console.log(this.props.ingredients, this.props.price);

    this.setState({ loading: true });
    const data = {
      ingredients: this.props.ingredients,
      totalPrice: this.props.price,
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

  changeInputValueHandler = (event, element) => {
    const copyOfFormObject = {
      ...this.state.contactInfo,
    };
    const copyOfElementObject = {
      ...copyOfFormObject[element],
    };
    copyOfElementObject.value = event.target.value;
    copyOfFormObject[element] = copyOfElementObject;
    this.setState({ contactInfo: copyOfFormObject });
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
      <form>
        <h4>Enter Contact Data</h4>
        {formArray.map((el) => {
          return (
            <Input
              key={el.key}
              elementType={el.config.elementType}
              elementConfig={el.config.elementConfig}
              value={el.config.value}
              clicked={(event) => this.changeInputValueHandler(event, el.key)}
            />
          );
        })}
        <Button btnType="Green" clicked={this.orderHandler}>
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
