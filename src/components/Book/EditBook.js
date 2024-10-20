import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Loader from "../Common/Loader";
import "./Book.css";

const EditBook = () => {
  const [book, setBook] = useState({});
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate();
  const getBookApi = "https://66ff38182b9aac9c997e8ef9.mockapi.io/api/oss/books";

  useEffect(() => {
    getBook();
  }, [id]);

  const getBook = () => {
    axios
      .get(`${getBookApi}/${id}`)
      .then((item) => {
        setBook(item.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handelInput = (e) => {
    const { name, value } = e.target;
    setBook({ ...book, [name]: value });
  };

  const handelSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    fetch(`${getBookApi}/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(book),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        setIsLoading(false);
        navigate("/show-book");
      })
      .catch((error) => {
        setError(error.message);
        setIsLoading(false);
      });
  };

  return (
    <div className="user-form">
      <div className="heading">
        {isLoading && <Loader />}
        {error && <p>Error: {error}</p>}
        <p>Edit Form</p>
      </div>
      <form onSubmit={handelSubmit}>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">
            Name
          </label>
          <input
            type="text"
            className="form-control"
            id="name"
            name="name"
            value={book.name || ""}
            onChange={handelInput}
          />
        </div>
        <div className="mb-3 mt-3">
          <label htmlFor="puname" className="form-label">
            Publishing Name
          </label>
          <input
            type="text"
            className="form-control"
            id="puname"
            name="puname"
            value={book.puname || ""}
            onChange={handelInput}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="byname" className="form-label">
            Writer
          </label>
          <input
            type="text"
            className="form-control"
            id="byname"
            name="byname"
            value={book.byname || ""}
            onChange={handelInput}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="price" className="form-label">
            Price
          </label>
          <input
            type="text"
            className="form-control"
            id="price"
            name="price"
            value={book.price || ""}
            onChange={handelInput}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="message" className="form-label">
            Rental Status
          </label>
          <select
            className="form-control"
            id="message"
            name="message"
            value={book.message || ""}
            onChange={handelInput}
          >
            <option value="true">Available</option>
            <option value="false">Not Available</option>
          </select>
        </div>
        <div className="mb-3">
          <label htmlFor="isbn" className="form-label">
            ISBN
          </label>
          <input
            type="text"
            className="form-control"
            id="isbn"
            name="isbn"
            value={book.isbn || ""}
            onChange={handelInput}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="pudate" className="form-label">
            Publication Date
          </label>
          <input
            type="date"
            className="form-control"
            id="pudate"
            name="pudate"
            value={book.pudate ? book.pudate.slice(0, 10) : ""}
            onChange={handelInput}
          />
        </div>
        <button type="submit" className="btn btn-primary submit-btn">
          EDIT
        </button>
      </form>
    </div>
  );
};

export default EditBook;
