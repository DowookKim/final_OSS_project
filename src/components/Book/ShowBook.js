import * as Tooltip from '@radix-ui/react-tooltip';
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Loader from "../Common/Loader";
import Footer from '../Pages/Footer';
import './ShowBook.css'; // Radix UI와 카드 레이아웃용 스타일

const ShowBook = () => {
  const showBookApi = "https://66ff38182b9aac9c997e8ef9.mockapi.io/api/oss/books";

  const [book, setBook] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortKey, setSortKey] = useState("name");
  const [sortOrder, setSortOrder] = useState("asc");

  const handelDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this book?")) return;

    setIsLoading(true);
    try {
      const response = await fetch(`${showBookApi}/${id}`, { method: "DELETE" });
      if (!response.ok) {
        throw new Error("Failed to delete item");
      }
      setBook(book.filter((item) => item.id !== id));
    } catch (error) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getBooks();
  }, []);

  const getBooks = () => {
    axios.get(showBookApi)
      .then((res) => setBook(res.data))
      .catch((err) => console.error(err));
  };

  const handleSort = (key) => {
    setSortKey(key);
    setSortOrder(sortOrder === "asc" ? "desc" : "asc");
  };

  const filteredBooks = book
    .filter(
      (item) =>
        item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.byname.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      if (sortKey === "price") {
        return sortOrder === "asc" ? a.price - b.price : b.price - a.price;
      }
      return sortOrder === "asc"
        ? a[sortKey].localeCompare(b[sortKey])
        : b[sortKey].localeCompare(a[sortKey]);
    });

  return (
    <div className="container">
      {isLoading && <Loader />}
      {error && <p>Error: {error}</p>}

      <div className="search-sort-controls">
        <input
          type="text"
          placeholder="Search by title or author"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="form-control mb-3"
        />

        <div className="sort-buttons">
          <button onClick={() => handleSort("name")} className="btn btn-secondary">
            Sort by Title {sortKey === "name" && (sortOrder === "asc" ? "↑" : "↓")}
          </button>
          <button onClick={() => handleSort("price")} className="btn btn-secondary">
            Sort by Price {sortKey === "price" && (sortOrder === "asc" ? "↑" : "↓")}
          </button>
        </div>
      </div>

      <div className="card-grid">
        {filteredBooks?.map((item) => (
          <div className="book-card" key={item.id}>
            <h3>{item.name}</h3>
            <p><strong>Author:</strong> {item.byname}</p>
            <p><strong>Publisher:</strong> {item.puname}</p>
            <p><strong>Price:</strong> ${item.price}</p>
            <p><strong>Status:</strong> {String(item.message)}</p>

            <div className="card-actions">
              <Tooltip.Provider>
                <Tooltip.Root>
                  <Tooltip.Trigger asChild>
                    <Link to={`/edit-book/${item.id}`} className="action-icon">
                      <i className="fa fa-pencil" aria-hidden="true"></i>
                    </Link>
                  </Tooltip.Trigger>
                  <Tooltip.Content>Edit Book</Tooltip.Content>
                </Tooltip.Root>

                <Tooltip.Root>
                  <Tooltip.Trigger asChild>
                    <Link to={`/book/${item.id}`} className="action-icon">
                      <i className="fa fa-eye" aria-hidden="true"></i>
                    </Link>
                  </Tooltip.Trigger>
                  <Tooltip.Content>View Book</Tooltip.Content>
                </Tooltip.Root>

                <i
                  className="fa fa-trash-o action-icon"
                  aria-hidden="true"
                  onClick={() => handelDelete(item.id)}
                ></i>
              </Tooltip.Provider>
            </div>
          </div>
        ))}
      </div>

      <Footer />
    </div>
  );
};

export default ShowBook;
