import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import './Register.css';

const Register = () => {

    const history = useHistory();

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [message, setMessage] = useState('');

    const handleSignUp = async (e) => {
        e.preventDefault();
        await fetch('/users/register', {
            method: 'POST',
            headers: {'Content-Type':'application/json'},
            body: JSON.stringify({
                'first_name': firstName,
                'last_name': lastName,
                'email': email,
                'username': username,
                'password': password,
                'confirmPassword': confirmPassword
            })
        })
        .then(res => {
            // if (res.status !== 200) {
            //     setMessage('Something went wrong - please make sure you have entered all field and password is minimum 8 characters.')
            // } else {
            //     setMessage('You have successfully signed up! Go to login page to login.')
            // }
            return res.json();
        })
        .then(response => {
            setMessage(response.response);
        })
    }

    return (
        <div className="register-container">
            <h1 className="mt">Sign up</h1>
            <form className="mt" onSubmit={handleSignUp}>
                <div className="input-pair">
                    <label>First name</label>
                    <input value={firstName} onChange={(e) => setFirstName(e.target.value)} type="text" />
                </div>
                <div className="input-pair">
                    <label>Last name</label>
                    <input value={lastName} onChange={(e) => setLastName(e.target.value)} type="text" />
                </div>
                <div className="input-pair">
                    <label>Email</label>
                    <input value={email} onChange={(e) => setEmail(e.target.value)} type="text" />
                </div>
                <div className="input-pair">
                    <label>Username</label>
                    <input value={username} onChange={(e) => setUsername(e.target.value)} type="text" />
                </div>
                <div className="input-pair">
                    <label>Password</label>
                    <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" />
                </div>
                <div className="input-pair">
                    <label>Confirm password</label>
                    <input value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} type="password" />
                </div>
                <button className="btn-big btn-green">Sign up!</button>
            </form>
            <p className="register-errormsg">{ message }</p>
            <button className="link" onClick={() => history.push('/users/login')}>Already got an user?</button>
        </div>
    );
}

export default Register;