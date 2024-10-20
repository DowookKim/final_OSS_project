import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import Loader from '../Common/Loader';
import './Book.css';

const CreateBook = () => {
    const navigate = useNavigate();
    const createBookApi = "https://66ff38182b9aac9c997e8ef9.mockapi.io/api/oss/books";

    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [book, setBook] = useState({
        name: "",
        puname: "",
        byname: "",
        price: "",
        message: true,

        iamge: "", // 이미지 필드 추가
        isbn: "",  // ISBN 필드 추가
        pudate: "" // 발행일 필드 추가

    });

    const handleInput = (event) => {
        const { name, value } = event.target;
        setBook({ ...book, [name]: value });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        setIsLoading(true);
        try {
            const response = await fetch(createBookApi, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(book),
            });

            if (response.ok) {
                setBook({
                    name: "",
                    puname: "",
                    byname: "",
                    price: "",
                    message: true,

                    iamge: "", // 초기화
                    isbn: "",  // 초기화
                    pudate: "" // 초기화
                });
                navigate('/show-book');
            } else {
                setError('Form submission failed!');
            }
        } catch (error) {
            setError(error.message);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="form-container">
            <div className="form-card">
                <h2>Create Book</h2>
                {isLoading && <Loader />}
                {error && <div className="error-message">Error: {error}</div>}
                
                <form onSubmit={handleSubmit}>
                    <div className="input-group">
                        <label htmlFor="name">Book Name</label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={book.name}
                            onChange={handleInput}
                            required
                        />
                    </div>
                    <div className="input-group">
                        <label htmlFor="puname">Publishing Name</label>
                        <input
                            type="text"
                            id="puname"
                            name="puname"
                            value={book.puname}
                            onChange={handleInput}
                            required
                        />
                    </div>
                    <div className="input-group">
                        <label htmlFor="byname">Writer</label>
                        <input
                            type="text"
                            id="byname"
                            name="byname"
                            value={book.byname}
                            onChange={handleInput}
                            required
                        />
                    </div>
                    <div className="input-group">
                        <label htmlFor="price">Price</label>
                        <input
                            type="number"
                            id="price"
                            name="price"
                            value={book.price}
                            onChange={handleInput}
                            required
                        />
                    </div>
                    <div className="input-group">
                        <label htmlFor="message">Rental Status</label>
                        <select
                            id="message"
                            name="message"
                            value={book.message}
                            onChange={handleInput}
                        >
                            <option value="true">true</option>
                            <option value="false">false</option>
                        </select>
                    </div>
                    <div className="input-group">
                        <label htmlFor="iamge">Image URL</label>
                        <input
                            type="text"
                            id="iamge"
                            name="iamge"
                            value={book.iamge}
                            onChange={handleInput}
                        />
                    </div>
                    <div className="input-group">
                        <label htmlFor="isbn">ISBN</label>
                        <input
                            type="text"
                            id="isbn"
                            name="isbn"
                            value={book.isbn}
                            onChange={handleInput}
                        />
                    </div>
                    <div className="input-group">
                        <label htmlFor="pudate">Publish Date</label>
                        <input
                            type="date"
                            id="pudate"
                            name="pudate"
                            value={book.pudate}
                            onChange={handleInput}
                        />
                    </div>

                    <button type="submit" className="btn-submit">Submit</button>
                </form>
            </div>
        </div>
    );
};

export default CreateBook;
