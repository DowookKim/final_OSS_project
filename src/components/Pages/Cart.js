import React from "react";
import './Cart.css';

const Cart = ({ cartItems }) => {
  console.log("Cart items:", cartItems); // Debugging line

  return (
    <div className="cart-container">
      <h2>Cart</h2>
      {cartItems.length > 0 ? (
        cartItems.map((book, index) => (
          <div key={index} className="cart-item">
            <img src={book.cover?._text} alt={book.title?._text} className="cart-book-cover" />
            <div className="cart-book-info">
              <h3>{book.title?._text}</h3>
              <p>Author: {book.author?._text}</p>
              <p>Price: {book.priceSales?._text}원</p>
            </div>
          </div>
        ))
      ) : (
        <p>Your cart is empty</p>
      )}
    </div>
  );
};

export default Cart;
