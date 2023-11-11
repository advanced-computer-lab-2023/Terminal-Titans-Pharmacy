import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import axios from 'axios';

function Login() {
    const [formData, setFormData] = useState({
        username: '',
        password: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log('Form submitted:', formData);

        axios.post('http://localhost:8000/security/login', formData).then((response) => {
            console.log(response);
            if (response.data.success) {
                sessionStorage.setItem('token', response.data.Result.token);
                if (response.data.type === 'Admin') {
                    // go to admin page
                    
                }
                else if (response.data.type === 'Doctor') {
                    // go to doctor page
                }
                else {
                    // go to patient page
                    window.location.pathname = '/Health-Plus/patient';
                }
            }
            else {
                alert(response.data.message);

            }
        }).catch((error) => {
            console.log(error);
            alert(error.response.data.message);
        });
    };

    return (
        <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Username</Form.Label>
                <Form.Control
                    type="text"
                    placeholder="Enter username"
                    name="username"
                    value={formData.username}
                    onChange={handleChange}
                />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control
                    type="password"
                    placeholder="Password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                />
            </Form.Group>

            <Button variant="primary" type="submit">
                Submit
            </Button>

            <a href="http://localhost:3000/Health-Plus/registerPatient">Register as a patient</a>
            <br />
            <a href="http://localhost:3000/Health-Plus/registerPharmacist">Register as a pharmacist</a>
        </Form>
    );
}

export default Login;