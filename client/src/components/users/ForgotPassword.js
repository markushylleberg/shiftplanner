import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import './ForgotPassword.css';

const ForgotPassword = () => {

    const history = useHistory();

    const [email, setEmail] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [submitted, setSubmitted] = useState(0);

    const handleForgotPassword = async (e) => {
        e.preventDefault();
        if (email !== ''){
            await fetch('/users/requestnewpassword', {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                method: 'POST',
                body: JSON.stringify({
                    'email': email
                })
            }).then( res => {
                if ( res.status === 200 ){
                    setSubmitted(submitted +1);
                } else {
                    setErrorMessage('This email is not in our system.')
                }
            })
        } else {
            setErrorMessage('Something went wrong - please make sure you have typed a valid email')
        }
    }

    return (
        <div className="forgotpass-container">
            { submitted === 0 ? (
                <div>
                <h1>Forgot password?</h1>
                    <p>Type your email address and we'll sent you a new password!</p>
                    <form className="mt" onSubmit={handleForgotPassword}>
                        <input value={email} onChange={ (e) => setEmail(e.target.value) } type="email" placeholder="Enter your email" />
                        <button className="btn-big btn-green">Send mail</button>
                    </form>
                    <p className="forgotpass-errormsg">{errorMessage}</p>
                </div>
            ) : (
                <div>
                    <p>Check your mail <i>{email}</i>!</p>
                </div>
            ) }
            <button className="link mt" onClick={ () => history.push('/users/login') }>Back to login</button>
        </div>
    )
}

export default ForgotPassword;