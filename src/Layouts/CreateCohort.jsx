import { useState, useEffect } from 'react';

function CreateCohort() {
    
    const [inputs, setInputs] = useState({
        id: "",
        year: "",
        degree: "",
    });

    const [errors, setErrors] = useState({
        id: "",
        year: "",
        degree: "",
    });

    const [degrees, setDegrees] = useState([]);
    const [selectedOption, setSelectedOption] = useState('');
    const [listErrors, setListErrors] = useState("");

    useEffect(() => {
        fetch(`http://127.0.0.1:8000/api/degree/`)
            .then((response) => response.json())
            .then((data) => {
                setDegrees(data);
            })
            .catch((error) => {
                console.error("Error fetching degrees:", error);
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

    const validateInput = () => {
        const newErrors = {
          id: inputs.id.trim() === '',
          year: inputs.year.trim() === '',
          degree: selectedOption === '',
        };

        if (selectedOption === '') {
            setListErrors('Please select a degree.');
        }

        setErrors(newErrors);
    
        return !Object.values(newErrors).includes(true);
    };

    const handleForm = (event) => {
        if (event.target.value !== "") {
            setListErrors('');
        }

        setSelectedOption(event.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        
        if (validateInput()) {
    
            let toPost = {
                id: inputs.id,
                year: parseInt(inputs.year),
                degree: selectedOption,
            };

            fetch(`http://127.0.0.1:8000/api/cohort/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(toPost),
            })
                .then((response) => {
                    if (!response.ok) {
                        return response.json().then((errorData) => {
                            console.error('Error response from server:', errorData);
                            alert('Error creating cohort: ' + JSON.stringify(errorData));
                            throw new Error('Failed to create cohort');
                        });
                    }
                    console.log("Cohort creation successful.");
                    alert("Cohort created successfully.");
                    window.location.reload();
                })
                .catch((error) => {
                    console.error("Error creating cohort:", error);
                    alert("Error creating cohort.");
                });
        }
    };

    function cohortForm() {
        return (
            <form onSubmit={handleSubmit}>
                <div>
                    <label>
                        ID:
                        <input
                            type="text"
                            name="id"
                            value={inputs.id}
                            onChange={handleChange}
                        />
                        {errors.id && <p style={{ color: 'red' }}>ID is required</p>}
                    </label>
                </div>
                <div>
                    <label>
                        Year:
                        <input
                            type="text"
                            name="year"
                            value={inputs.year}
                            onChange={handleChange}
                        />
                        {errors.year && <p style={{ color: 'red' }}>Year is required</p>}
                    </label>
                </div>
                <div>
                    <label>
                        Degree:
                        <select
                            value={selectedOption}
                            onChange={handleForm}
                        >
                            <option value="">Select a degree</option>
                            {degrees.map((degree) => (
                                <option key={degree.shortcode} value={`http://127.0.0.1:8000/api/degree/${degree.shortcode}/`}>
                                    {degree.full_name}
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
            <h1>Create Cohort</h1>
            {cohortForm()}
        </div>
    );
}

export default CreateCohort;