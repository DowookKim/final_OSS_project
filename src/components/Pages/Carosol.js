import axios from "axios";
import React, { useEffect, useState } from "react";
import convert from "xml-js";
import './BookList.css';
import AddressForm from './AddressForm';
import CartAlert from './CartAlert';
import Footer from './Footer';

const BookList = ({ cartItems, setCartItems }) => {
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
  console.log("Cart Clicked:", book); // 추가된 로그
  if (Array.isArray(cartItems)) {
    const isInCart = cartItems.some((cartItem) => cartItem.title?._text === book.title?._text);
    if (isInCart) {
      console.log("This book is already in the cart.");
    } else {
      setCartItems((prevItems) => {
        console.log("Adding to cart:", book); 
        return [...prevItems, book]; // Add book to cart
      });
      setIsAlertOpen(true); // Show cart alert
    }
  } else {
    console.error("cartItems is not an array or is undefined!");
  }
};


  const handlePopupClose = () => {
    setIsPopupOpen(false);
    setSelectedBook(null);
  };

  const handleAlertClose = () => {
    setIsAlertOpen(false);  // Close cart alert
  };

  const handleAddressSubmit = (data) => {
    console.log("Address and card information submitted:", data, "Selected book:", selectedBook);
  };

  return (
    <div className="book-list-container">
      {isPopupOpen && (
        <AddressForm onClose={handlePopupClose} onSubmit={handleAddressSubmit} />
      )}
      {isAlertOpen && (
        <CartAlert message="Added to cart." onClose={handleAlertClose} />
      )}

      {books.map((book, index) => (
        <div key={index} className="book-item">
          <img src={book.cover?._text} alt={book.title?._text} className="book-cover" />
          <div className="book-info">
            <h3 className="book-title">{book.title?._text}</h3>
            <p className="book-author">Author: {book.author?._text}</p>
            <p className="book-publisher">Publisher: {book.publisher?._text}</p>
            <p className="book-pubDate">Publication Date: {book.pubDate?._text}</p>
            <p className="book-price">
              Sale Price: {book.priceSales?._text} / Original Price: {book.priceStandard?._text}
            </p>
            <p className="book-mileage">Mileage: {book.mileage?._text}</p>
          </div>
          <div className="book-actions">
            <button className="btn-cart" onClick={() => handleCartClick(book)}>Add to Cart</button>
            <button className="btn-buy" onClick={() => handleBuyClick(book)}>Buy Now</button>
          </div>
        </div>
      ))}
      <Footer />
    </div>
  );
};

export default BookList;
