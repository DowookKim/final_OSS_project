import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./Book.css";
const EditBook = () => {
  const [book, setBook] = useState([]);
  const { id } = useParams();
  const getBookApi = "https://66ff38182b9aac9c997e8ef9.mockapi.io/api/oss/books";

  useEffect(() => {
    getBook();
  }, []);

  const getBook = () => {
    axios
      .get(getBookApi.concat("/") + id)
      .then((item) => {
        setBook(item.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="user mt-5">
      <table className="table table-bordered">
    <thead>
      <tr>
        <th>Firstname</th>
        <th>Lastname</th>
        
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>Book Name</td>
        <td>{book.name}</td>
      </tr>
      <tr>
        <td>Publishing name</td>
        <td>{book.puname}</td>
      </tr>
      <tr>
        <td>Writer</td>
        <td>{book.byname}</td>
      </tr>
      <tr>
        <td>price</td>
        <td>{book.price}</td>
      </tr>
      <tr>
        <td>Rental Status</td>
        <td>{book.message}</td>
      </tr>
    </tbody>
  </table>
    </div>
  );
};
export default EditBook;
