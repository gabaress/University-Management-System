import {useState, useEffect} from 'react';
import { Link } from 'react-router-dom';

function AllDegrees() {
    const [degrees, setDegrees] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch('http://127.0.0.1:8000/api/degree')
            .then(response => response.json())
            .then(data => {
                setDegrees(data);
                setLoading(false);
            })
            .catch(error => console.error('Error fetching degrees:', error));
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <h1>All Degrees</h1>
            <ul>
                {degrees.map(degree => (
                    <li key={degree.shortcode}>
                        <Link to={`/degree/${degree.shortcode}`}>{degree.full_name}</Link>
                    </li>
                ))}
            </ul>
        </div>
    );
}	

export default AllDegrees;