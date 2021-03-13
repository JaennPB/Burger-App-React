import React from 'react';
import classes from './Order.module.css';

const order = (props) => (
  <div className={classes.Order}>
    <h4>Order #1</h4>
    <section>
      <div className="Info">
        <p>Ingredients:</p>
        <p>salad X1</p>
        <p>...</p>
      </div>
      <div className="Contact">
        <p>Delivery Address:</p>
        <p>example...</p>
      </div>
    </section>
    <div className={classes.Price}>Price: $0 USD</div>
  </div>
);

export default order;
