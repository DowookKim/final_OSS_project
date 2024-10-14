import { Route, Routes } from "react-router-dom";
import "./App.css";
import Book from "./components/Book/Book";
import CreateBook from "./components/Book/CreateBook";
import EditBook from "./components/Book/EditBook";
import ShowBook from "./components/Book/ShowBook";
import Header from "./components/Common/Header";
import Home from "./components/Layout/Home";
import Cart from "./components/Pages/Cart";
import BookList from "./components/Pages/Carosol";
import { useState } from "react";

function App() {
  const [cartItems, setCartItems] = useState([]); // Initialize cartItems as an empty array


  return (
    <div className="App">
      <header className="container">
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/edit-book/:id" element={<EditBook />} />
          <Route path="/book/:id" element={<Book />} />
          <Route path="/create-book" element={<CreateBook />} />
          <Route path="/show-book" element={<ShowBook />} />
          <Route
            path="/booklist"
            element={<BookList cartItems={cartItems} setCartItems={setCartItems} />}
          />
          <Route path="/cart" element={<Cart cartItems={cartItems} />} /> {/* 장바구니 항목 전달 */}
        </Routes>
      </header>
    </div>
  );
}

export default App;