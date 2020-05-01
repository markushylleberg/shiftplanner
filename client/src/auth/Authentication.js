import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

const Authentication = () => {

    const history = useHistory();

    const [authenticated, setAuthenticated] = useState(0);

    useEffect( () => {
        const isUserLoggedIn = async () => {
            await fetch('/users/authenticate', {
                method: 'GET'
            })
            .then( res => {
                if (res.status === 200) {
                    setAuthenticated(1);
                } else {
                    history.push('/users/login');
                }
                return res.status;
            })
        }
        isUserLoggedIn();
    }, [authenticated, history])

    return (null);
    // return authenticated;
}

export default Authentication;