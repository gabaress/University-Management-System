import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

function SingleStudent() {

    const { id } = useParams();
    const [student, setStudent] = useState({});
    const [grades, setGrades] = useState([]);
    const [cohortID, setCohortID] = useState("");

    useEffect(() => {
        fetch(`http://127.0.0.1:8000/api/student/${id}`)
        .then(response => response.json())
        .then(data => {
            setStudent(data);
            setCohortID(data.cohort.split("/")[data.cohort.split("/").length - 2]);
        })
        .catch((error) => {
            console.error('Error:', error);
        });
    }, [id]);

    useEffect(() => {
        fetch(`http://127.0.0.1:8000/api/grade/?student=${id}`)
        .then(response => response.json())
        .then(data => {
            setGrades(data);
        })
        .catch((error) => {
            console.error('Error:', error);
        });
    }, [id]);

    function getMod(url) {
        let id = url.split("/")[url.split("/").length - 2];
        return (
            <Link to={`/module/${id}`}>
                {id}
            </Link>
        );
    }

    function studentRefHandler(student) {
        return (
            <div>
                <h2>{student.first_name} {student.last_name}</h2>
                <p>ID: {student.student_id}</p>
                <p>Cohort: {cohortID}</p>
                <p>Email: {student.email}</p>
            </div>
        );
    }

    function gradesRefHandler(grades) {
        return (
            <div>
                <h2>Modules + Grades</h2>
                <Link to="edit">Edit Grades</Link>
                <table>
                    <thead>
                        <tr>
                            <th>Module</th>
                            <th>CA Mark</th>
                            <th>Exam Mark</th>
                            <th>Total Grade</th>
                        </tr>
                    </thead>
                    <tbody>
                        {grades.map((grade) => (
                            <tr key={grade.module}>
                                <td>{getMod(grade.module)}</td>
                                <td>{grade.ca_mark}</td>
                                <td>{grade.exam_mark}</td>
                                <td>{grade.total_grade}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        );
    }

    return (
        <div>
            {studentRefHandler(student)}
            {gradesRefHandler(grades)}
        </div>
    );
}

export default SingleStudent;