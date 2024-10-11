import { Route, Routes } from "react-router-dom";
import "./App.css";
import Book from "./components/Book/Book";
import CreateBook from "./components/Book/CreateBook";
import EditBook from "./components/Book/EditBook";
import ShowBook from "./components/Book/ShowBook";
import Header from "./components/Common/Header";
import Home from "./components/Layout/Home";
import Cart from "./components/Pages/Cart";
import BookList from "./components/Pages/Carosol"; // Make sure this is correctly imported
import { useState } from "react";

function App() {
  const [cartItems, setCartItems] = useState([]); // State to store cart items

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
            <Route 
              path="/booklist" 
              element={<BookList cartItems={cartItems} setCartItems={setCartItems} />} 
            /> {/* Pass cart state to BookList */}
            <Route path="/cart" element={<Cart cartItems={cartItems} />} /> {/* Pass cart items */}
          </Routes>
        </div>
      </header>
    </div>
  );
}

export default App;
