import { useState } from 'react';

function CreateDegree() {

    const [inputs, setInputs] = useState({
        full_name: '',
        shortcode: '',
    });

    const [errors, setErrors] = useState({
        full_name: '',
        shortcode: '',
    });

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
          full_name: inputs.full_name.trim() === '',
          shortcode: inputs.shortcode.trim() === '',
        };

        setErrors(newErrors);
    
        return !Object.values(newErrors).includes(true);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        
        if (validateInput()) {
            fetch(`http://127.0.0.1:8000/api/degree/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(inputs), 
            }).then(() => {
                console.log("Degree creation successful.");
                alert("Degree created successfully.");
                window.location.reload();
            }).catch((error) => {
                console.error("Error creating degree:", error);
                alert("Error creating degree.");
            });
        }
    };

    function degreeForm() {
        return (
            <form onSubmit={handleSubmit}>
                <div>
                    <label>
                        Full Name:
                        <input
                            type="text"
                            name="full_name"
                            value={inputs.full_name}
                            onChange={handleChange}
                        />
                        {errors.full_name && <p>Full Name is required</p>}
                    </label>
                </div>
                <div>
                    <label>
                        Shortcode:
                        <input
                            type="text"
                            name="shortcode"
                            value={inputs.shortcode}
                            onChange={handleChange}
                        />
                        {errors.shortcode && <p>Shortcode is required</p>}
                    </label>
                </div>
                <button type="submit">Submit</button>
            </form>
        );
    }

    return (
        <div>
            <h1>Create Degree</h1>
            {degreeForm()}
        </div>
    );
}

export default CreateDegree;