import React from 'react';

const orderSumarry = (props) => {
  const ingredientsSummary = Object.entries(props.ingredients).map((pair) => {
    return (
      <li key={pair[0]}>
        <span style={{ textTransform: 'capitalize' }}>{pair[0]}</span> X
        {pair[1]}
      </li>
    );
  });

  return (
    <React.Fragment>
      <h3>Your order</h3>
      <ul>{ingredientsSummary}</ul>
      <p>Continue to checkout?</p>
    </React.Fragment>
  );
};

export default orderSumarry;
