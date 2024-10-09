import axios from "axios";
import React, { useEffect, useState } from "react";
import convert from "xml-js"; // xml-js를 사용
import './BookList.css'; // 추가한 CSS 파일 import
import AddressForm from './AddressForm'; // AddressForm import
import CartAlert from './CartAlert'; // CartAlert import
import Footer from './Footer';

const BookList = () => {
  const [books, setBooks] = useState([]);
  const [isPopupOpen, setIsPopupOpen] = useState(false); // 주소 입력 팝업 상태
  const [isAlertOpen, setIsAlertOpen] = useState(false); // 장바구니 알림 상태
  const [selectedBook, setSelectedBook] = useState(null); // 선택한 책 정보

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        // Netlify 서버리스 함수로 요청
        const response = await axios.get('/api/fetchBooks');
        // xml-js를 사용하여 XML 데이터를 JSON으로 변환
        const result = convert.xml2js(response.data, { compact: true, spaces: 2 });
        const items = result?.object?.item || [];
        setBooks(items);
      } catch (error) {
        console.error("Error fetching books", error);
      }
    };
    fetchBooks();
  }, []);

  const handleBuyClick = (book) => {
    setSelectedBook(book); // 선택한 책 정보 저장
    setIsPopupOpen(true); // 주소 입력 팝업 열기
  };

  const handleCartClick = () => {
    setIsAlertOpen(true); // 장바구니 알림 팝업 열기
  };

  const handlePopupClose = () => {
    setIsPopupOpen(false); // 주소 입력 팝업 닫기
    setSelectedBook(null); // 선택한 책 정보 초기화
  };

  const handleAlertClose = () => {
    setIsAlertOpen(false); // 장바구니 알림 팝업 닫기
  };

  const handleAddressSubmit = (data) => {
    console.log("주소 및 카드 정보 제출:", data, "선택한 책:", selectedBook);
    // 여기에 API 호출이나 추가 로직을 구현할 수 있습니다.
  };

  return (
    <div className="book-list-container">
      {isPopupOpen && (
        <AddressForm onClose={handlePopupClose} onSubmit={handleAddressSubmit} />
      )}
      {isAlertOpen && (
        <CartAlert message="장바구니에 추가되었습니다." onClose={handleAlertClose} />
      )}

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
            <button className="btn-cart" onClick={handleCartClick}>장바구니</button>
            <button className="btn-buy" onClick={() => handleBuyClick(book)}>바로구매</button>
          </div>
        </div>
      ))}
      <Footer />
    </div>
  );
};

export default BookList;
