import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import './ResetPassword.css';

const ResetPassword = (props) => {

    const history = useHistory();

    const tokenParam = useParams(props.token);

    const [tokenIsValid, setTokenIsValid] = useState(0); 
    const [newPassword, setNewPassword] = useState('');
    const [confirmNewPassword, setConfirmNewPassword] = useState('');

    useEffect( () => {
        async function fetchData() {
            await fetch(`/users/resetpassword/${tokenParam.token}`, {
                method: 'GET'
            })
            .then( res => {
                if (res.status !== 200) {
                    console.log('token is not valid')
                } else {
                    setTokenIsValid(tokenIsValid+1);
                }
            })
        }
        fetchData();
    }, [tokenIsValid, tokenParam] );

    const handleNewPasswordSubmit = async (e) => {
        e.preventDefault();

        await fetch('/users/resetpassword', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                'newPassword': newPassword,
                'confirmNewPassword': confirmNewPassword,
                'token': tokenParam.token
            }),
        })
        .then( res => {
            if (res.status === 200) {
                history.push('/users/login');
            } else {
                console.log('Something went wrong with redirecting to login page.')
            }
        })
    }

    return (
            <div className="resetpass-container">
                <h1>Password reset</h1>
                { tokenIsValid ? (
                    <div>
                        <form onSubmit={handleNewPasswordSubmit}>
                        <div className="input-pair">
                            <label>New password</label>
                            <input value={newPassword} onChange={ (e) => setNewPassword(e.target.value) } type="password" />
                        </div>
                        <div className="input-pair">
                            <label>Confirm new password</label>
                            <input value={confirmNewPassword} onChange={ (e) => setConfirmNewPassword(e.target.value) } type="password" />
                        </div>
                            <button className="btn-big btn-green">Submit</button>
                        </form>
                    </div>
                ) : (
                    <div>
                        <h3>Error</h3>
                        <p class="resetpass-errormsg">Something went wrong - please try to request a new password again.</p>
                    </div>
                ) } 
            </div>
        )
}

export default ResetPassword;