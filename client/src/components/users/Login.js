import React, { useState } from 'react'
import { useHistory } from 'react-router-dom';
import "./Login.css";
import Authentication from '../../auth/Authentication';

const Login = () => {

    const history = useHistory();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setEmail('');
        setPassword('');
        
        await fetch('/users/login', {
            method: 'POST',
            headers: {'Content-Type':'application/json'},
            body: JSON.stringify({'username': email, 'password': password})
        })
        .then((res) => {
            if ( res.status === 200 ) {
                history.push('/shifts');
            } else {
                setErrorMessage('Wrong username or password - Please try again.')
            }
          })
    }

    return (
            <div className="login-form">
                <Authentication />
                <h1>Login</h1>
                <form onSubmit={handleSubmit}>
                    <div className="input-pair mt">
                        <label htmlFor="loginUser">Email</label>
                        <input value={email} onChange={(e) => setEmail(e.target.value)} id="loginEmail" name="loginEmail" type="text" />
                    </div>
                    <div className="input-pair mt">
                        <label htmlFor="loginUser">Password</label>
                        <input value={password} onChange={(e) => setPassword(e.target.value)} id="loginPassword" name="loginPassword" type="password" />
                    </div>
                    <button className="btn-big btn-green mt">Login</button>
                    <p className="login-errormsg">{errorMessage === '' ? '' : errorMessage}</p>
                </form>
                <div>
                    <button className="link" onClick={ () => history.push('/users/register') }>Sign up</button>
                </div>
                <div className="mt">
                    <button className="link" onClick={ () => history.push('/users/forgotpassword') }>Forgot password?</button>
                </div>
            </div>
    )
}

export default Login;