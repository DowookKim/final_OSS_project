import { Route, Routes } from "react-router-dom";
import "./App.css";
import Book from "./components/Book/Book";
import CreateBook from "./components/Book/CreateBook";
import EditBook from "./components/Book/EditBook";
import ShowBook from "./components/Book/ShowBook";
import Header from "./components/Common/Header";
import Home from "./components/Layout/Home";
import Cart from "./components/Pages/Cart";  // Cart 컴포넌트 불러오기
import BookList from "./components/Pages/Carosol";
import { useState } from "react";

function App() {
  const [cartItems, setCartItems] = useState([]); // 장바구니 상태

  return (
    <div className="App">
      <header className="container">
        <div className="">
          <Header />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/edit-book/:id" element={<EditBook />} />
            <Route path="/book/:id" element={<Book />} />
            <Route path="/create-book" element={<CreateBook />} />
            <Route path="/show-book" element={<ShowBook />} />
            {/* 장바구니 상태를 BookList에 전달 */}
            <Route 
              path="/booklist" 
              element={<BookList cartItems={cartItems} setCartItems={setCartItems} />} 
            />
            {/* 장바구니 상태를 Cart에 전달 */}
            <Route 
              path="/cart" 
              element={<Cart cartItems={cartItems} setCartItems={setCartItems} />} 
            />
          </Routes>
        </div>
      </header>
    </div>
  );
}

export default App;
