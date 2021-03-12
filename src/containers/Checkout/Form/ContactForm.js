import React, { Component } from 'react';
import classes from './ContactForm.module.css';
import { animateScroll } from 'react-scroll';

import Button from '../../../components/UI/Button/Button';

class ContactForm extends Component {
  state = {
    name: '',
    email: '',
    address: {
      street: '',
      postalCode: '',
    },
  };

  componentDidMount() {
    animateScroll.scrollToBottom();
  }

  render() {
    return (
      <div className={classes.ContactForm}>
        <form>
          <h4>Enter Contact Data</h4>
          <input type="text" name="name" placeholder="Your Full Name"></input>
          <input type="email" name="email" placeholder="Your email"></input>
          <input type="text" name="street" placeholder="Street"></input>
          <input type="number" name="postal" placeholder="Postal Code"></input>
          <Button btnType="Green" clicked>
            Submit Order!
          </Button>
        </form>
      </div>
    );
  }
}

export default ContactForm;
