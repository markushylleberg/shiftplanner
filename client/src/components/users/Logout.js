import React from 'react';
import './Logout.css';
import { useHistory } from 'react-router-dom';

const Logout = () => {

    const history = useHistory();

    const handleLogout = () => {
        fetch('/users/logout').then(res => {
            if (res.status === 200) {
                history.push('/users/login')
            }
            res.json()
        });
    }

    return (
        <button className="btn-small btn-red" onClick={handleLogout}>
            Logout
        </button>
    )
}

export default Logout;