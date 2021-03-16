import React, { Component } from 'react';

import axios from '../../axios-orders';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import classes from './Orders.module.css';

import Spinner from '../../components/UI/Spinner/Spinner';
import Order from '../../components/Order/Order';

class Orders extends Component {
  state = {
    orders: [],
    loading: true,
  };

  async componentDidMount() {
    try {
      const res = await axios.get('/orders.json');
      // console.log(res.data);

      const fetchedOrders = [];
      for (let key in res.data) {
        fetchedOrders.push({ ...res.data[key], key: key });
      }
      this.setState({ orders: fetchedOrders, loading: false });
    } catch (err) {
      this.setState({ loading: false });
      // console.log(this.state.orders);
    }
  }

  render() {
    let orders = <Spinner />;
    if (!this.state.loading) {
      orders = this.state.orders.map((order) => {
        return (
          <Order
            key={order.key}
            orderNo={order.key}
            price={order.totalPrice.toFixed(2)}
            ingredients={order.ingredients}
            info={order.contactInfo}
          />
        );
      });
    }
    return <div className={classes.Orders}>{orders}</div>;
  }
}

export default withErrorHandler(Orders, axios);
