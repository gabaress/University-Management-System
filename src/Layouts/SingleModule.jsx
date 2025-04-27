import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";

function SingleModule() {

    const { id } = useParams();
    const [module, setModule] = useState({});

    useEffect(() => {
        fetch(`http://127.0.0.1:8000/api/module/${id}`)
        .then(response => response.json())
        .then(data => {
            setModule(data);
        })
        .catch((error) => {
            console.error('Error:', error);
        });
    }, [id]);

    function getCohortLink(url) {
        let code = url.split("/")[url.split("/").length - 2];
        return (
            <Link to={`/cohort/${code}`}>
                {code}
            </Link>
        );
    }

    function renderCohortList(module) {
        return (
            <div>
                {module.map((cohort) => (
                    <div key={cohort}>
                        {getCohortLink(cohort)}
                    </div>
                ))}
            </div>
        );
    }

    function modulePlacard(module) {
        return (
            <div>
                <h2>{module.full_name}</h2>
                <p><strong>Code:</strong> {module.code}</p>
                <p><strong>CA Split:</strong> {module.ca_split}</p>
                <div>
                    <strong>Cohorts Under:</strong>
                    {module.delivered_to ? renderCohortList(module.delivered_to) : <p>None</p>}
                </div>
            </div>
        );
    }

    return (
        <div>
            {modulePlacard(module)}
        </div>
    );
}

export default SingleModule;