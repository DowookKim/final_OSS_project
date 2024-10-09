import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import Loader from '../Common/Loader';
import './Book.css';
import Footer from '../Pages/Footer';

const CreateBook = () => {
    const navigate = useNavigate();
    const createBookApi = "https://66ff38182b9aac9c997e8ef9.mockapi.io/api/oss/books"
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [book, setBook] = useState({
        name: "",
        puname: "",
        byname: "",
        price: "",
        message: true,
    })

    const handelInput = (event) => {
        event.preventDefault();
        const { name, value } = event.target;
        console.log(name, value)
        setBook({ ...book, [name]: value });
    }

    const handelSubmit = async (event) => {
        event.preventDefault();
        console.log(book)
        try {
            setIsLoading(true);
            const response = await fetch(createBookApi, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(book),
            });

            if (response.ok) {
                console.log('Form submitted successfully!');
                setBook({
                    name: "",
                    puname: "",
                    byname: "",
                    price: "",
                    message: true,
                })
                navigate('/show-book');
            } else {
                console.error('Form submission failed!');
            }

        } catch (error) {
            setError(error.message);
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <div className='user-form'>
            <div className='heading'>
                {isLoading && <Loader />}
                {error && <p>Error: {error}</p>}
                <p>Book Form</p>
            </div>
            <form onSubmit={handelSubmit}>
                <div className="mb-3">
                    <label for="name" className="form-label">Name</label>
                    <input type="text" className="form-control" id="name" name="name" value={book.name} onChange={handelInput} />
                </div>
                <div className="mb-3 mt-3">
                    <label for="publishing_name" className="form-label">Publishing name</label>
                    <input type="text" className="form-control" id="puname" name="puname" value={book.puname} onChange={handelInput} />
                </div>
                <div className="mb-3">
                    <label for="byname" className="form-label">Writer</label>
                    <input type="text" className="form-control" id="byname" name="byname" value={book.byname} onChange={handelInput} />
                </div>
                <div className="mb-3">
                    <label for="price" className="form-label">Price</label>
                    <input type="number" className="form-control" id="price" name="price" value={book.price} onChange={handelInput} />
                </div>
                <div className="mb-3">
                    <label for="message" className="form-label">Rental status</label>
                    <input type="text" className="form-control" id="message" name="message" value={book.message} onChange={handelInput} />
                </div>
                <button type="submit" className="btn btn-primary submit-btn">Submit</button>
            </form>
            <Footer />
        </div>
    )
}

export default CreateBook