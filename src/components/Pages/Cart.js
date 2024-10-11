import React from "react";
import './Cart.css'; // 스타일 파일 추가

const Cart = ({ cartItems, setCartItems }) => {

  // 장바구니에서 항목 제거
  const handleRemoveFromCart = (indexToRemove) => {
    setCartItems((prevItems) => prevItems.filter((_, index) => index !== indexToRemove));
  };

  return (
    <div className="cart-container">
      <h2>장바구니</h2>

      {/* 장바구니가 비어있는 경우 */}
      {cartItems.length === 0 ? (
        <p>장바구니에 상품이 없습니다.</p>
      ) : (
        <div className="cart-items">
          {cartItems.map((book, index) => (
            <div key={index} className="cart-item">
              <img src={book.cover?._text} alt={book.title?._text} className="cart-item-cover" />
              <div className="cart-item-info">
                <h3>{book.title?._text}</h3>
                <p>저자: {book.author?._text}</p>
                <p>출판사: {book.publisher?._text}</p>
                <p>가격: {book.priceSales?._text}원</p>
              </div>
              {/* 항목 제거 버튼 */}
              <button className="btn-remove" onClick={() => handleRemoveFromCart(index)}>
                제거
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Cart;
