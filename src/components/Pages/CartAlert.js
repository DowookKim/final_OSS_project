// CartAlert.js
import React from 'react';
import './CartAlert.css'; // CSS 파일 추가

const CartAlert = ({ message, onClose }) => {
  return (
    <div className="cart-alert-overlay">
      <div className="cart-alert-content">
        <p>{message}</p>
        <button className="btn btn-primary" onClick={onClose}>닫기</button>
      </div>
    </div>
  );
};

export default CartAlert;
