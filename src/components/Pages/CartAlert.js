import React from 'react';
import './CartAlert.css'; // CSS file

const CartAlert = ({ message, onClose }) => {
  return (
    <div className="cart-alert-overlay">
      <div className="cart-alert-content">
        <p>{message}</p>
        <button className="btn btn-primary" onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

export default CartAlert;
