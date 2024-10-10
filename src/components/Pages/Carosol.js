import axios from "axios";
import React, { useEffect, useState } from "react";
import convert from "xml-js"; 
import './BookList.css'; 
import AddressForm from './AddressForm'; 
import CartAlert from './CartAlert'; 
import Footer from './Footer';

const BookList = ({ cartItems, setCartItems }) => { // Accept cart state as props
  const [books, setBooks] = useState([]);
  const [isPopupOpen, setIsPopupOpen] = useState(false); 
  const [isAlertOpen, setIsAlertOpen] = useState(false); 
  const [selectedBook, setSelectedBook] = useState(null); 

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await axios.get('/api/fetchBooks');
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
    setSelectedBook(book); 
    setIsPopupOpen(true); 
  };

  const handleCartClick = (book) => {
    console.log("Adding to cart:", book); // Debugging line
    setCartItems((prevItems) => [...prevItems, book]); // Use functional update to avoid async issues
    setIsAlertOpen(true); 
  };

  const handlePopupClose = () => {
    setIsPopupOpen(false); 
    setSelectedBook(null); 
  };

  const handleAlertClose = () => {
    setIsAlertOpen(false); 
  };

  const handleAddressSubmit = (data) => {
    console.log("주소 및 카드 정보 제출:", data, "선택한 책:", selectedBook);
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
            <button className="btn-cart" onClick={() => handleCartClick(book)}>장바구니</button>
            <button className="btn-buy" onClick={() => handleBuyClick(book)}>바로구매</button>
          </div>
        </div>
      ))}
      <Footer />
    </div>
  );
};

export default BookList;
