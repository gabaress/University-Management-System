import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

function SingleCohort() {
    const { id } = useParams();
    const [students, setStudent] = useState([]);
    const [cohort, setCohort] = useState({});
    const [modules, setModules] = useState([]);

    useEffect(() => {
        fetch(`http://127.0.0.1:8000/api/cohort/${id}`)
        .then(response => response.json())
        .then(data => {
            setCohort(data);
        })
        .catch((error) => {
            console.error('Error:', error);
        });
    }, [id]);

    useEffect(() => {
        fetch(`http://127.0.0.1:8000/api/student/?cohort=${id}`)
        .then(response => response.json())
        .then(data => {
            setStudent(data);
        })
        .catch((error) => {
            console.error('Error:', error);
        });
    }, [id]);

    useEffect(() => {
        fetch(`http://127.0.0.1:8000/api/module/?delivered_to=${id}`)
        .then(response => response.json())
        .then(data => {
            setModules(data);
        })
        .catch((error) => {
            console.error('Error:', error);
        });
    }, [id]);

    function cohortRefHandler(cohort) {
        return (
            <div>
                <h4>{cohort.name}</h4>
                <hr />
                <div>
                    <p>ID: {cohort.id}</p>
                    <p>Year: {cohort.year}</p>
                </div>
            </div>
        );
    }

    function studentRefHandler(students) {
        return (
            <div>
                {students.map((student, index) => (
                    <div key={index}>
                        <Link to={`/students/${student.student_id}`}>{student.first_name} {student.last_name}</Link>
                        <p>Student ID: {student.student_id}</p>
                        <p>Email: {student.email}</p>
                        <br />
                    </div>
                ))}
            </div>
        );
    }

    function moduleRefHandler(modules) {
        return (
            <div>
                <ul>
                    {modules.map((module, index) => (
                        <li key={index}>
                            <Link to={`/module/${module.code}`}>{module.code}</Link> - {module.full_name}
                        </li>
                    ))}
                </ul>
            </div>
        );
    }

    return (
        <div>
            {cohortRefHandler(cohort)}
            <h2>Modules</h2>
            {moduleRefHandler(modules)}
            <h2>Students</h2>
            {studentRefHandler(students)}
        </div>
    );
}

export default SingleCohort;