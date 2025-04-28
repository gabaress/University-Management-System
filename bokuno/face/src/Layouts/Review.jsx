import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function Review() {

    const [value, setValue] = useState(1);
    const [users, setUsers] = useState([]);
    const [reviews, setReviews] = useState([]);

    function handleChange(e) {
        setValue(e.target.value);
    }

    useEffect(() => {
        fetch(`http://127.0.0.1:8000/api/user/`)
            .then((response) => response.json())
            .then((data) => {
                setUsers(data);
                console.log(data);
            })
            .catch((error) => {
                console.error("Error:", error);
            });
    }, []);

    useEffect(() => {
        fetch(`http://127.0.0.1:8000/api/review/?user=${value}`)
            .then((response) => response.json())
            .then((data) => {
                setReviews(data);
                console.log(data);
            })
            .catch((error) => {
                console.error("Error:", error);
            });
    }, [value]);

    return (
        <div>
            <select value={value} onChange={handleChange}>
                {users.map((thing) => (
                    <option key={thing.id} value={thing.id}>
                        {thing.username}
                    </option>
                ))}
            </select>
            <br />
            <div>
                {reviews.map((review) => (
                    <div key={review.id}>
                        <p>Title: {review.book.title}</p>
                        <p>Author: {review.book.author.first_name} {review.book.author.last_name}</p>
                        <p>Review: {review.review_text}</p>
                        <p>Score: {review.review_score}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Review;