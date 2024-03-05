import React from 'react';

const Order = ({ orderedItems }) => {
  return (
    <div>
      <h3>Order Summary</h3>
      <ul>
        {orderedItems.map((item, index) => (
          <li key={index}>{item.name} - {item.price}</li>
        ))}
      </ul>
    </div>
  );
};

export default Order;
