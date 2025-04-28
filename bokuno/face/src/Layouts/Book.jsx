import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

function Book() {
    const { id } = useParams();
    const [book, setBook] = useState(null);

    useEffect(() => {
        fetch(`http://127.0.0.1:8000/api/book/${id}/`)
            .then((response) => response.json())
            .then((data) => {
                setBook(data);
            })
            .catch((error) => {
                console.error("Error:", error);
            });
    }, [id]);

    return (
        <div>
            {book ? (
                <>
                    <p>Title: {book.title}</p>
                    <p>
                        Author: {book.author.first_name} {book.author.last_name}
                    </p>
                    <p>Synposis: {book.synopsis}</p>
                </>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
}

export default Book;