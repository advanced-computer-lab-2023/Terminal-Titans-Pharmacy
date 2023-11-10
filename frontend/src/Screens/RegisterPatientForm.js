// import React from "react";
import React, { useState, useEffect } from 'react';
import "../Styles/LoginForm.css";
import validator from 'validator'
import axios from 'axios';
// import * as fs from 'fs';
// import { type } from "os";
// import { Binary } from "mongodb";

function PatientRegistrationForm() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [dateOfBirth, setDateOfBirth] = useState('');
    const [mobile, setMobileNumber] = useState('');
    const [emergencyNumber, setEmergencyNumber] = useState('');
    const [first, setEmergencyFirtName] = useState('');
    const [last, setEmergencyLastName] = useState('');
    const [gender, setGender] = useState('');
    const [emergencyRel, setEmergencyRelation] = useState('');

    const [errorMessagePass, setErrorMessagePass] = useState('')
    const [errorMessageEmail, setErrorMessageEmail] = useState('')


    const validatePass = (value) => {
        setPassword(value);
        if (value !== '' && validator.isStrongPassword(value, {
            minLength: 8, minLowercase: 1,
            minUppercase: 1, minNumbers: 1, minSymbols: 0
        })) {
            setErrorMessagePass('Is Strong Password')
        } else {

            setErrorMessagePass('Password has to be 8 characters long and contain at least 1 lowercase, 1 uppercase, 1 number ')
        }
    }
    const validateEmail = (value) => {
        setEmail(value);
        if (validator.isEmail(value)) {
            setErrorMessageEmail('')
        } else {

            setErrorMessageEmail('Enter a valid email')
        }
    }
    const handleRegister = async (event) => {
        event.preventDefault(); // Prevent the default form submission behavior

        let data={
            'username':username,
            'password':password,
            'dateOfBirth':dateOfBirth,
            'name':name,
            'email':email,
            'mobile':mobile,
            'first':first,
            'last':last,
            'gender':gender,
            'emergencyNumber':emergencyNumber,
            'emergencyRel':emergencyRel
        }
        axios.post('http://localhost:8000/security/patient/', data).then((response) => {
            console.log(response.data);
            if (response.data.success) {
                sessionStorage.setItem('token', response.data.token);
                window.location.pathname = '/Health-Plus/patient';
                // go to page patient
            }
            else {
                alert(response.data.message);

            }
        })
            .catch(error => {
                alert(error.response.data.message);
            });
    }

    return (
        <div>
            <div id="login-form">
                <h1>Sign up</h1>
                <form>
                    <label htmlFor="name">name:</label>
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                    <label htmlFor="username">Username:</label>
                    <input
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                    <label htmlFor="password">Password:</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => validatePass(e.target.value)}></input> <br />
                    {errorMessagePass === '' ? null :
                        <span style={{
                            color: 'red',
                        }}>{errorMessagePass}</span>}
                    <br />
                    <label htmlFor="email">Email:</label>
                    <input
                        type="text"
                        value={email}
                        onChange={(e) => validateEmail(e.target.value)}></input> <br />
                    {errorMessageEmail === '' ? null :
                        <span style={{
                            color: 'red',
                        }}>{errorMessageEmail}</span>}
                    <label htmlFor="dateOfBirth">Date of Birth:</label>
                    <input
                        type="Date"
                        value={dateOfBirth}
                        onChange={(e) => setDateOfBirth(e.target.value)}
                    />
                    <label htmlFor="gender">Gender</label>
                    <input
                        type="text"
                        value={gender}
                        onChange={(e) => setGender(e.target.value)}
                    />
                    <label htmlFor="mobile">Mobile Number:</label>
                    <input
                        type="text"
                        value={mobile}
                        onChange={(e) => setMobileNumber(e.target.value)}
                    />
                    <label htmlFor="emergencyNumber">Emergency Number:</label>
                    <input
                        type="text"
                        value={emergencyNumber}
                        onChange={(e) => setEmergencyNumber(e.target.value)}
                    />
                    <label htmlFor="emergencyNumber">Emergency Relation:</label>
                    <input
                        type="text"
                        value={emergencyRel}
                        onChange={(e) => setEmergencyRelation(e.target.value)}
                    />
                    <label htmlFor="first">Emergency First Name:</label>
                    <input
                        type="text"
                        value={first}
                        onChange={(e) => setEmergencyFirtName(e.target.value)}
                    />
                    <label htmlFor="last">Emergency Last Name:</label>
                    <input
                        type="text"
                        value={last}
                        onChange={(e) => setEmergencyLastName(e.target.value)}
                    />


                    <button type="submit" onClick={handleRegister}>Register</button>

                </form>
            </div>

        </div>
    );
}

export default PatientRegistrationForm;