import { useState, useEffect } from 'react';

function CreateModule() {

    const [inputs, setInputs] = useState({
        code: "",
        full_name: "",
        delivered_to: [],
        ca_split: "",
    });

    const [errors, setErrors] = useState({
        code: "",
        full_name: "",
        delivered_to: [],
        ca_split: "",
    });

    const [selectedOptions, setSelectedOptions] = useState([]);
    const [listErrors, setListErrors] = useState("");

    const [cohorts, setCohorts] = useState([]);

    useEffect(() => {
        fetch(`http://127.0.0.1:8000/api/cohort/`)
            .then((response) => response.json())
            .then((data) => {
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
    
    const handleList = (event) => {
        const { options } = event.target;
        const selected = Array.from(options)
            .filter((option) => option.selected)
            .map((option) => option.value);
    
        setSelectedOptions(selected);
    
        if (selected.length > 0) {
            setListErrors('');
        }
    };

    const validateInput = () => {
        const newErrors = {
          code: inputs.code.trim() === '',
          full_name: inputs.full_name.trim() === '',
          delivered_to: selectedOptions.length === 0,
          ca_split: inputs.ca_split.trim() === '',
        };

        if (selectedOptions.length === 0) {
            setListErrors('Please select at least one cohort.');
        }

        setErrors(newErrors);
    
        return !Object.values(newErrors).includes(true);
    };

    const getName = (url) => {
        let id = url.split("/")[url.split("/").length - 2];
        let name = cohorts.filter((cohort) => cohort.id === id)[0].name;
        return name;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
    
        if (validateInput()) {
            // Use selectedOptions directly as it already contains valid URLs
            let toPost = {
                code: inputs.code.trim(),
                full_name: inputs.full_name.trim(),
                delivered_to: selectedOptions, // Use the full URLs
                ca_split: parseFloat(inputs.ca_split), // Convert CA Split to a number if required
            };
    
            console.log('Data being sent:', toPost); // Debugging log
    
            fetch(`http://127.0.0.1:8000/api/module/`, {
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
                            alert('Error creating module: ' + JSON.stringify(errorData));
                            throw new Error('Failed to create module');
                        });
                    }
                    console.log('Module created successfully.');
                    alert('Module created successfully.');
                    window.location.reload();
                })
                .catch((error) => {
                    console.error('Error creating module:', error);
                    alert('Error creating module.');
                });
        }
    };

    function moduleForm() {
        return (
            <form onSubmit={handleSubmit}>
                <div>
                    <label>
                        Code:
                        <input
                            type="text"
                            name="code"
                            value={inputs.code}
                            onChange={handleChange}
                        />
                        {errors.code && <p style={{ color: 'red' }}>Code is required</p>}
                    </label>
                </div>
                <div>
                    <label>
                        Full Name:
                        <input
                            type="text"
                            name="full_name"
                            value={inputs.full_name}
                            onChange={handleChange}
                        />
                        {errors.full_name && <p style={{ color: 'red' }}>Full Name is required</p>}
                    </label>
                </div>
                <div>
                    <label>
                        CA Split:
                        <input
                            type="text"
                            name="ca_split"
                            value={inputs.ca_split}
                            onChange={handleChange}
                        />
                        {errors.ca_split && <p style={{ color: 'red' }}>CA Split is required</p>}
                    </label>
                </div>
                <div>
                    <label>
                        Select Cohorts:
                        <select
                            multiple
                            value={selectedOptions}
                            onChange={handleList}
                        >
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
        );
    }

    return (
        <div>
            <h1>Create Module</h1>
            {moduleForm()}
        </div>
    );
}

export default CreateModule;