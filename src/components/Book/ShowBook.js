import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Loader from "../Common/Loader";

const ShowBook = () => {
  const showBookApi = "https://66ff38182b9aac9c997e8ef9.mockapi.io/api/oss/books";

  const [book, setBook] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

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
        setUser(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  if (book.length < 0) {
    return <h1>no book found</h1>;
  } else {
    return (
      <div className="mt-5">
        {isLoading && <Loader />}
        {error && <p>Error: {error}</p>}
        <table className="table table-striped">
          <thead>
            <tr>
              <th>Book Name</th>
              <th>Publishing Name</th>
              <th>Writer</th>
              <th>Price</th>
              <th>Rental Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {book?.map((item, i) => {
              return (
                <tr key={i + 1}>
                  <td>{i + 1}</td>
                  <td>{item.name}</td>
                  <td>{item.puname}</td>
                  <td>{item.byname}</td>
                  <td>{item.price}</td>
                  <td>{item.message}</td>
                  <td>
                    <Link to={`/edit-book/${item.id}`}>
                      <i className="fa fa-pencil" aria-hidden="true"></i>
                    </Link>
                    <Link to={`/book/${item.id}`}>
                      <i className="fa fa-eye" aria-hidden="true"></i>
                    </Link>

                    <i
                      className="fa fa-trash-o"
                      aria-hidden="true"
                      onClick={() => handelDelete(item.id)}
                    ></i>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    );
  }
};

export default ShowBook;
