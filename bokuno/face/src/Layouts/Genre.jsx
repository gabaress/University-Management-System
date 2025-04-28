import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function Genre() {

    const [value, setValue] = useState("horror");
    const [genres, setGenres] = useState([]);
    const [books, setBooks] = useState([]);

    function handleChange(e) {
        setValue(e.target.value);
    }

    useEffect(() => {
        fetch(`http://127.0.0.1:8000/api/genre/`)
            .then((response) => response.json())
            .then((data) => {
                setGenres(data);
            })
            .catch((error) => {
                console.error("Error:", error);
            });
    }, []);

    useEffect(() => {
        fetch(`http://127.0.0.1:8000/api/book/?genre=${value}`)
            .then((response) => response.json())
            .then((data) => {
                setBooks(data);
            })
            .catch((error) => {
                console.error("Error:", error);
            });
    }, [value]);

    return (
        <div>
            <select value={value} onChange={handleChange}>
                {genres.map((thing) => (
                    <option key={thing.name} value={thing.name}>
                        {thing.name}
                    </option>
                ))}
            </select>
            <br />
            <div>
                {books.map((book) => (
                    <div key={book.id}>
                        <p>ID: {book.id}</p>
                        <p>Title: {book.title}</p>
                        <Link to={`/book/${book.id}`}>{book.title}</Link>
                        <p>Synopsis: {book.synopsis}</p>
                        <p>Author: {book.author.first_name} {book.author.last_name}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Genre;