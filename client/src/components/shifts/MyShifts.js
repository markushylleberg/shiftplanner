import React, { useState, useEffect } from 'react';
import Logout from '../users/Logout.js';
import AssignedShift from './AssignedShift.js';
import Authentication from '../../auth/Authentication';
import './MyShifts.css';

const MyShifts = () => {

    const [myShifts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect( () => {
        const fetchMyShifts = async () => {
            await fetch('/myshifts', {
                method: 'GET'
            })
            .then(res => res.json())
            .then(myShiftsData => {
                console.log(myShiftsData);
                for (let i = 0; i < myShiftsData.length; i++) {
                    myShifts.push(myShiftsData[i]);
                }
                setLoading(false);
            })
        }
        fetchMyShifts()
    }, [myShifts])

    return (
        <div>
            <div className="myshifts-container">
                <Authentication />
                <h1>My shifts</h1>
                { myShifts.length === 0 ? (
                    <p>You have no booked shifts at the moment!</p>
                ) : (
                    <div className="myshifts-holder">
                        <div className="myshifts-desc">
                            <p>Start time</p>
                            <p>End time</p>
                            <p>Booked by</p>
                        </div>
                        { myShifts.map( (shift, index) => (
                            <AssignedShift key={index} startTime={shift.start_datetime} endTime={shift.end_datetime} username={shift.username} />
                        )) }
                    </div>
                ) }
            </div>
            <Logout />
        </div>
    );
}

export default MyShifts;