import * as Dialog from '@radix-ui/react-dialog';
import * as Tooltip from '@radix-ui/react-tooltip';
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Loader from "../Common/Loader";
import './ShowBook.css'; // Radix의 스타일을 따로 적용하기 위해 CSS 파일 생성

const ShowBook = () => {
  const showBookApi = "https://66ff38182b9aac9c997e8ef9.mockapi.io/api/oss/books";

  const [book, setBook] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortKey, setSortKey] = useState("name");
  const [sortOrder, setSortOrder] = useState("asc");

  const handelDelete = async (id) => {
    console.log("id : -", id);
    setIsLoading(true);
    try {
      const response = await fetch(showBookApi.concat("/") + id, {
        method: "DELETE",
      });
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
    axios
      .get(showBookApi)
      .then((res) => {
        setBook(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
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
      } else {
        return sortOrder === "asc"
          ? a[sortKey].localeCompare(b[sortKey])
          : b[sortKey].localeCompare(a[sortKey]);
      }
    });

  return (
    <div className="mt-5">
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

      <table className="table-custom">
        <thead>
          <tr>
            <th>Count</th>
            <th>Book Name</th>
            <th>Publishing Name</th>
            <th>Writer</th>
            <th>Price</th>
            <th>Rental Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredBooks?.map((item, i) => {
            return (
              <tr key={i + 1}>
                <td>{i + 1}</td>
                <td>{item.name}</td>
                <td>{item.puname}</td>
                <td>{item.byname}</td>
                <td>{item.price}</td>
                <td>{String(item.message)}</td>
                <td>
                  {/* Radix Tooltip 적용 */}
                  <Tooltip.Provider>
                    <Tooltip.Root>
                      <Tooltip.Trigger asChild>
                        <Link to={`/edit-book/${item.id}`}>
                          <i className="fa fa-pencil" aria-hidden="true"></i>
                        </Link>
                      </Tooltip.Trigger>
                      <Tooltip.Content>Edit Book</Tooltip.Content>
                    </Tooltip.Root>
                    
                    <Tooltip.Root>
                      <Tooltip.Trigger asChild>
                        <Link to={`/book/${item.id}`}>
                          <i className="fa fa-eye" aria-hidden="true"></i>
                        </Link>
                      </Tooltip.Trigger>
                      <Tooltip.Content>View Book</Tooltip.Content>
                    </Tooltip.Root>

                    {/* 삭제 버튼을 Dialog로 변경 */}
                    <Dialog.Root>
                      <Dialog.Trigger asChild>
                        <i className="fa fa-trash-o" aria-hidden="true"></i>
                      </Dialog.Trigger>
                      <Dialog.Portal>
                        <Dialog.Overlay className="dialog-overlay" />
                        <Dialog.Content className="dialog-content">
                          <Dialog.Title>Are you sure you want to delete?</Dialog.Title>
                          <Dialog.Description>
                            Deleting this book cannot be undone.
                          </Dialog.Description>
                          <button
                            className="btn btn-danger"
                            onClick={() => handelDelete(item.id)}
                          >
                            Confirm Delete
                          </button>
                          <Dialog.Close asChild>
                            <button className="btn btn-secondary">Cancel</button>
                          </Dialog.Close>
                        </Dialog.Content>
                      </Dialog.Portal>
                    </Dialog.Root>
                  </Tooltip.Provider>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default ShowBook;
