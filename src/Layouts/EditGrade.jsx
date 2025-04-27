import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';

function EditGrade() {

    let { id } = useParams();
    const [student, setStudent] = useState({});
    const [grades, setGrades] = useState([]);
    const [inputs, setInputs] = useState({
        ca: "",
        exam: "",
        gradeObject: null,
    });

    const [errors, setErrors] = useState({
        ca: "",
        exam: "",
        gradeObject: null,
    });

    const [selectedOption, setSelectedOption] = useState(null);
    const [listErrors, setListErrors] = useState("");

    useEffect(() => {
        fetch(`http://127.0.0.1:8000/api/student/${id}`)
        .then(response => response.json())
        .then(data => {
            setStudent(data);
        })
        .catch((error) => {
            console.error('Error:', error);
        });
    }, [id]);

    useEffect(() => {
        fetch(`http://127.0.0.1:8000/api/grade/?student=${id}`)
            .then((response) => response.json())
            .then((data) => {
                console.log("Grades fetched:", data); // Debugging log
                setGrades(data);
            })
            .catch((error) => {
                console.error("Error fetching grades:", error);
            });
    }, [id]);
    
    function getCohortLink(url) {
        let code = url?.split("/")[url?.split("/").length - 2];
        return (
            <Link to={`/cohorts/${code}`}>
                {code}
            </Link>
        );
    }

    function getMod(url) {
        let code = url?.split("/")[url?.split("/").length - 2];
        return code;
    }

    function studentRefHandler(student) {
        return (
            <div>
                <h2>Editing Grades for {student.first_name} {student.last_name}</h2>
                <p>Student ID: {student.student_id}</p>
                <p>Email: {student.email}</p>
                <p>Cohort: {getCohortLink(student.cohort)}</p>
            </div>
        );
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        setInputs((prev) => ({
          ...prev,
          [name]: value,
        }));
        
        if (errors[name] && value.trim() !== '') {
          setErrors((prev) => ({
            ...prev,
            [name]: false,
          }));
        }
    };

    const validateInput = () => {
        const newErrors = {
          ca: inputs.ca.trim() === '',
          exam: inputs.exam.trim() === '',
          gradeObject: selectedOption === null,
        };

        if (selectedOption === null) {
            setListErrors('Please select a module.');
        }

        setErrors(newErrors);
    
        return !Object.values(newErrors).includes(true);
    };

    const handleForm = (event) => {
        if (event.target.value !== null) {
            setListErrors('');
        }

        setSelectedOption(event.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
    
        if (validateInput()) {
            let toPost = {
                module: selectedOption.module,
                ca_mark: parseFloat(inputs.ca),
                exam_mark: parseFloat(inputs.exam),
                cohort: selectedOption.cohort,
                student: selectedOption.student,
            };
    
            fetch(`http://127.0.0.1:8000/api/grade/${selectedOption.id}/`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(toPost),
            })
                .then(() => {
                    console.log("Grade updated successfully.");
                    alert("Grade updated successfully.");
                    window.location.reload();
                })
                .catch((error) => {
                    console.error("Error updating grade:", error);
                    alert("Error updating grade.");
                });
        }
    };

    function gradeForm(grades) {
        return (
            <form onSubmit={handleSubmit}>
                <div>
                    <label>
                        CA Mark:
                        <input
                            type="text"
                            name="ca"
                            value={inputs.ca}
                            onChange={handleChange}
                        />
                        {errors.ca && <p style={{ color: 'red' }}>CA mark is required</p>}
                    </label>
                </div>
                <div>
                    <label>
                        Exam Mark:
                        <input
                            type="text"
                            name="exam"
                            value={inputs.exam}
                            onChange={handleChange}
                        />
                        {errors.exam && <p style={{ color: 'red' }}>Exam mark is required</p>}
                    </label>
                </div>
                <div>
                    <label>
                        Module:
                        <select
                            value={selectedOption?.id || ''}
                            onChange={(e) => {
                                const selectedGrade = grades.find(
                                    (grade) => grade.id === parseInt(e.target.value)
                                );
                                setSelectedOption(selectedGrade);
                                setListErrors('');
                            }}
                        >
                            <option value="">Select a module</option>
                            {grades.map((grade) => (
                                <option key={grade.id} value={grade.id}>
                                    {getMod(grade.module)}
                                </option>
                            ))}
                        </select>
                        {listErrors && <p style={{ color: 'red' }}>{listErrors}</p>}
                    </label>
                </div>
                <button type="submit">Submit</button>
            </form>
        );
    }

    return (
        <div>
            {studentRefHandler(student)}
            {gradeForm(grades)}
        </div>
    );
}

export default EditGrade;