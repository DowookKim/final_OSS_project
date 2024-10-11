import React, { useEffect, useState } from "react";
import axios from "axios";
import convert from "xml-js";
import './BookList.css';
import CartAlert from './CartAlert';
import Footer from './Footer';

const BookList = ({ cartItems, setCartItems }) => {  // Props로 cartItems와 setCartItems 받기
  const [books, setBooks] = useState([]);  // 도서 목록 상태
  const [isAlertOpen, setIsAlertOpen] = useState(false);  // 알림창 상태
  const [selectedBook, setSelectedBook] = useState(null);  // 바로 구매할 때 선택된 책 상태
  const [isPopupOpen, setIsPopupOpen] = useState(false);  // 바로 구매할 때 팝업 상태

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await axios.get('/api/fetchBooks');  // 서버에서 책 목록 가져오기
        const result = convert.xml2js(response.data, { compact: true, spaces: 2 });
        const items = result?.object?.item || [];  // XML 데이터를 파싱해 books 상태에 저장
        setBooks(items);
      } catch (error) {
        console.error("Error fetching books", error);
      }
    };
    fetchBooks();
  }, []);

  // 장바구니에 책 추가
  const handleCartClick = (book) => {
    setCartItems((prevItems) => {
      const updatedCart = [...prevItems, book];  // 기존 장바구니 항목에 새 책 추가
      return updatedCart;
    });
    setIsAlertOpen(true);  // 장바구니 추가 후 알림창 열기
  };

  // 바로구매 버튼 클릭 시 호출
  const handleBuyClick = (book) => {
    setSelectedBook(book);  // 선택한 책을 상태에 저장
    setIsPopupOpen(true);  // 바로 구매 팝업 열기
  };

  // 팝업 닫기
  const handlePopupClose = () => {
    setIsPopupOpen(false);  // 팝업 닫기
    setSelectedBook(null);  // 선택된 책 초기화
  };

  // 알림창 닫기 함수
  const handleAlertClose = () => {
    setIsAlertOpen(false);  // 알림창 닫기
  };

  return (
    <div className="book-list-container">
      {/* 장바구니에 추가되었다는 알림창 */}
      {isAlertOpen && (
        <CartAlert message="장바구니에 추가되었습니다." onClose={handleAlertClose} />
      )}

      {/* 도서 목록 출력 */}
      {books.map((book, index) => (
        <div key={index} className="book-item">
          <img src={book.cover?._text} alt={book.title?._text} className="book-cover" />
          <div className="book-info">
            <h3 className="book-title">{book.title?._text}</h3>
            <p className="book-author">저자: {book.author?._text}</p>
            <p className="book-publisher">출판사: {book.publisher?._text}</p>
            <p className="book-pubDate">출판일: {book.pubDate?._text}</p>
            <p className="book-price">
              판매가: {book.priceSales?._text}원 / 정가: {book.priceStandard?._text}원
            </p>
            <p className="book-mileage">마일리지: {book.mileage?._text}점</p>
          </div>
          <div className="book-actions">
            {/* 장바구니 버튼 */}
            <button className="btn-cart" onClick={() => handleCartClick(book)}>장바구니</button>
            {/* 바로구매 버튼 추가 */}
            <button className="btn-buy" onClick={() => handleBuyClick(book)}>바로구매</button>
          </div>
        </div>
      ))}
      <Footer />
    </div>
  );
};

export default BookList;
