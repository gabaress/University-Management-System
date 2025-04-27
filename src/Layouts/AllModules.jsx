import {useState, useEffect} from 'react';
import { Link } from 'react-router-dom';

function AllModules() {
    const [modules, setModules] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch('http://127.0.0.1:8000/api/module')
            .then(response => response.json())
            .then(data => {
                setModules(data);
                setLoading(false);
            })
            .catch(error => console.error('Error fetching modules:', error));
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <h1>All Modules</h1>
            <ul>
                {modules.map(module => (
                    <li key={module.code}>
                        <Link to={`/module/${module.code}`}>{module.full_name}</Link>
                    </li>
                ))}
            </ul>
        </div>
    );
}	

export default AllModules;