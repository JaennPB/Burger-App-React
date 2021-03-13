import React, { Component } from 'react';
import classes from './ContactForm.module.css';
import { animateScroll } from 'react-scroll';
import axios from '../../../axios-orders';

import Button from '../../../components/UI/Button/Button';
import Spinner from '../../../components/UI/Spinner/Spinner';

class ContactForm extends Component {
  state = {
    contactInfo: {
      name: '',
      email: '',
      address: {
        street: '',
        city: '',
        zipCode: '',
      },
      deliveryMethod: '',
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
      contactInfo: {
        name: 'Jaenn Poumian',
        email: 'test@gmail.com',
        address: {
          street: '101 Test Street',
          city: 'Celaya',
          zipCode: '38090',
        },
        deliveryMethod: 'Delivery',
      },
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

  render() {
    let form = (
      <form>
        <h4>Enter Contact Data</h4>
        <input type="text" name="name" placeholder="Your Full Name"></input>
        <input type="email" name="email" placeholder="Your email"></input>
        <input type="text" name="street" placeholder="Street"></input>
        <input type="number" name="postal" placeholder="Postal Code"></input>
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
