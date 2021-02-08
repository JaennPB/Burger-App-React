import React, { Component } from 'react';
import Burger from '../../components/Burger/Burger';

class BurgerBuilder extends Component {
  state = {
    ingredients: {
      salad: 2,
      bacon: 1,
      cheese: 1,
      meat: 2,
    },
  };

  render() {
    return (
      <React.Fragment>
        <Burger ingredientsObject={this.state.ingredients} />
        <div>Burger controls</div>
      </React.Fragment>
    );
  }
}

export default BurgerBuilder;
