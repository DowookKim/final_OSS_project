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
      .then((res) => setBook(res.data))
      .catch((err) => console.error(err));
  };

  const handelInput = (e) => {
    const { name, value } = e.target;
    setBook({ ...book, [name]: value });
  };

  const handelSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await fetch(`${getBookApi}/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(book),
      });

      if (response.ok) {
        navigate("/show-book");
      } else {
        throw new Error("Update failed");
      }
    } catch (error) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="user-form">
      <div className="heading">
        {isLoading && <Loader />}
        {error && <p>Error: {error}</p>}
        <p>Edit Form</p>
      </div>
      <form onSubmit={handelSubmit}>
        {/* 나머지 입력 필드들 */}
        <div className="mb-3">
          <label htmlFor="iamge" className="form-label">
            Image URL
          </label>
          <input
            type="text"
            className="form-control"
            id="iamge"
            name="iamge"
            value={book.iamge || ""}
            onChange={handelInput}
          />
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
            Publish Date
          </label>
          <input
            type="date"
            className="form-control"
            id="pudate"
            name="pudate"
            value={book.pudate || ""}
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
