import React from 'react';

const Menu = ({ menuItems }) => {
  return (
    <div>
      <h3>Menu</h3>
      <ul>
        {menuItems.map((item, index) => (
          <li key={index}>{item.name} - {item.price}</li>
        ))}
      </ul>
    </div>
  );
};

export default Menu;
