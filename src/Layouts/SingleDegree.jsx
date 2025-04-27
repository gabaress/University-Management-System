import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";

function SingleDegree() {

    const { id } = useParams();
    const [degree, setDegree] = useState({});
    const [cohort, setCohort] = useState([]);

    useEffect(() => {
        console.log('Degree ID from URL:', id); // Log the extracted ID
        fetch(`http://127.0.0.1:8000/api/degree/${id}`)
            .then(response => response.json())
            .then(data => {
                console.log('Degree API Response:', data); // Log the degree data
                setDegree(data);
            })
            .catch((error) => {
                console.error('Error fetching degree:', error);
            });
    }, [id]);
    
    useEffect(() => {
        fetch(`http://127.0.0.1:8000/api/cohort/?degree=${id}`)
            .then(response => response.json())
            .then(data => {
                console.log('Cohort API Response:', data); // Log the cohort data
                setCohort(data);
            })
            .catch((error) => {
                console.error('Error fetching cohorts:', error);
            });
    }, [id]);

    function degreeRefHandler(degree) {
        return (
            <div>
                <div>
                    <h4>Cohorts for {degree.full_name}</h4>
                    <hr />
                    <div>
                        <p>{degree.shortcode}</p>
                    </div>
                </div>
            </div>
        );
    }
    function cohortRefHandler(data) {
        return (
            <div>
                {data.map((cohort, index) => (
                    <div key={index}>
                        <p>ID: {cohort.id}</p>
                        <h5>{cohort.name}</h5>
                        <p>Year: {cohort.year}</p>
                        <Link to={`/cohort/${cohort.id}`}>View Cohort</Link>
                        <br />
                    </div>
                ))}
            </div>
        );
    }

    return (
        <div>
            {degreeRefHandler(degree)}
            <ul>
                {cohortRefHandler(cohort)}
            </ul>
        </div>
    );
}

export default SingleDegree;