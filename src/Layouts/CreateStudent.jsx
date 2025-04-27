import { useEffect, useState } from "react";

function CreateStudent() {

    const [inputs, setInputs] = useState({
        student_id: "",
        first_name: "",
        last_name: "",
        cohort: "",
    });

    const [errors, setErrors] = useState({
        student_id: "",
        first_name: "",
        last_name: "",
        cohort: "",
    });

    const [cohorts, setCohorts] = useState([]);
    const [selectedOption, setSelectedOption] = useState('');
    const [listErrors, setListErrors] = useState("");

    useEffect(() => {
        fetch(`http://127.0.0.1:8000/api/cohort/`)
        .then(response => response.json())
        .then(data => {
            setCohorts(data);
        })
        .catch((error) => {
            console.error("Error fetching cohorts:", error);
        });
    }, []);

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

    const handleForm = (event) => {
        if (event.target.value !== "") {
            setListErrors('');
        }

        setSelectedOption(event.target.value);
    };

    const validateInput = () => {
        const newErrors = {
            student_id: inputs.student_id.trim() === '',
            first_name: inputs.first_name.trim() === '',
            last_name: inputs.last_name.trim() === '',
            cohort: selectedOption === '',
        };

        if (selectedOption === '') {
            setListErrors('Please select a cohort.');
        }

        setErrors(newErrors);
    
        return !Object.values(newErrors).includes(true);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (validateInput()) {

            const toPost = {
                student_id: inputs.student_id,
                first_name: inputs.first_name,
                last_name: inputs.last_name,
                cohort: selectedOption,
            }
            
            fetch(`http://127.0.0.1:8000/api/student/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(toPost),
            })
            .then(() => {
                console.log("Student creation successful.")
                alert("Student created successfully.");
                window.location.reload();
            })
            .catch((error) => {
                console.error("Error creating student:", error);
                alert("Error creating student.");
            });
        }
    };

    const studentForm = () => {

        return (
            <form onSubmit={handleSubmit}>
                <div>
                    <label>
                        Student ID:
                        <input
                            type="text"
                            name="student_id"
                            value={inputs.student_id}
                            onChange={handleChange}
                        />
                        {errors.student_id && <p style={{ color: 'red' }}>Student ID is required</p>}
                    </label>
                </div>
                <div>
                    <label>
                        First Name:
                        <input
                            type="text"
                            name="first_name"
                            value={inputs.first_name}
                            onChange={handleChange}
                        />
                        {errors.first_name && <p style={{ color: 'red' }}>First Name is required</p>}
                    </label>
                </div>
                <div>
                    <label>
                        Last Name:
                        <input
                            type="text"
                            name="last_name"
                            value={inputs.last_name}
                            onChange={handleChange}
                        />
                        {errors.last_name && <p style={{ color: 'red' }}>Last Name is required</p>}
                    </label>
                </div>
                <div>
                    <label>
                        Cohort:
                        <select
                            value={selectedOption}
                            onChange={handleForm}
                        >
                            <option value="">Select a cohort</option>
                            {cohorts.map((cohort) => (
                                <option key={cohort.id} value={`http://127.0.0.1:8000/api/cohort/${cohort.id}/`}>
                                    {cohort.name}
                                </option>
                            ))}
                        </select>
                        {listErrors && <p style={{ color: 'red' }}>{listErrors}</p>}
                    </label>
                </div>
                <button type="submit">Submit</button>
            </form>
        )
    };

    return (
        <div>
            <h1>Create Student</h1>
            {studentForm()}
        </div>
    )
}

export default CreateStudent;