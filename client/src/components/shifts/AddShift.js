import React, { useState, useEffect } from 'react';
import Logout from '../users/Logout.js';
import { useHistory } from 'react-router-dom';
import './AddShift.css';

const AddShift = () => {

    const [startDateTime, setStartDateTime] = useState('');
    const [endDateTime, setEndDateTime] = useState('');

    const history = useHistory();

    useEffect( () => {
        async function authenticate() {
            await fetch('/addshift', {
                method: 'GET'
            })
            .then( res => {
                if ( res.status !== 200 ){
                    history.push('/shifts');
                }
                return res.json()
            })
            .then( response => {

            })
        }
        authenticate();
    }, [history] )

    const handleNewShift = async (e) => {
        e.preventDefault();

        await fetch('/addshift', {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            method: 'POST',
            body: JSON.stringify({
                'startDateTime': startDateTime,
                'endDateTime': endDateTime
            })
        });
        history.push('/shifts')
    }

    return (
        <div>
            <div className="addshift-container">
                <h1>Add shift</h1>
                <form onSubmit={handleNewShift}>
                    <input value={startDateTime} onChange={ (e) => setStartDateTime(e.target.value) } type="datetime-local" placeholder="Shift start time" />
                    <input value={endDateTime} onChange={ (e) =>setEndDateTime(e.target.value) } type="datetime-local" placeholder="Shift end time" />
                    <button className="btn-big btn-blue">Add new shift</button>
                </form>
            </div>
            <Logout />
        </div>
    )
}

export default AddShift;