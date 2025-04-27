import {useState, useEffect} from 'react';
import { Link } from 'react-router-dom';

function AllCohorts() {
    const [cohorts, setCohorts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch('http://127.0.0.1:8000/api/cohort')
            .then(response => response.json())
            .then(data => {
                setCohorts(data);
                setLoading(false);
            })
            .catch(error => console.error('Error fetching cohorts:', error));
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <h1>All Cohorts</h1>
            <ul>
                {cohorts.map(cohort => (
                    <li key={cohort.id}>
                        <Link to={`/cohort/${cohort.id}`}>{cohort.name}</Link>
                    </li>
                ))}
            </ul>
        </div>
    );
}	

export default AllCohorts;