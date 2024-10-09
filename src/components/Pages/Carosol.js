import axios from "axios";
import React, { useEffect, useState } from "react";
import convert from "xml-js"; // xml-js를 사용
import './BookList.css'; // 추가한 CSS 파일 import

const BookList = () => {
  const [books, setBooks] = useState([]);

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

  return (
    <div className="book-list-container">
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
            <button className="btn-cart">장바구니</button>
            <button className="btn-buy">바로구매</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default BookList;
