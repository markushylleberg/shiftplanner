import React, { useState } from 'react';
import './Shift.css';

const Shift = (props) => {

    const [isShiftAvailable, setShiftAvailablity] = useState('');

    const bookShift = async (id) => {
        setShiftAvailablity(0);
        await fetch('/shifts', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                'shiftId': id
            })
        })
    }

    const startTime = new Date(props.startTime);
    const endTime = new Date(props.endTime);

    const startTimeMinutes = (startTime.getMinutes() < 10 ? '0' : '') + startTime.getMinutes();
    const endTimeMinutes = (endTime.getMinutes() < 10 ? '0' : '') + endTime.getMinutes();

    const isAvailableDivStyle = (
        props.isAvailable === 0 ? 'shift-entry not-available' : 
        isShiftAvailable === 0 ? 'shift-entry not-available' : 
        'shift-entry'
    )

    const isAvailableBtnStyle = (
        props.isAvailable === 0 ?'btn-small btn-gray' :
        isShiftAvailable === 0 ? 'btn-small btn-gray' :
        'btn-small btn-blue'
    )

    return (
        <div className={isAvailableDivStyle}>
            <p>{startTime.getDate()+'/'+startTime.getMonth()+' '+startTime.getHours()+':'+startTimeMinutes}</p>
            <p>{endTime.getDate()+'/'+endTime.getMonth()+' '+endTime.getHours()+':'+endTimeMinutes}</p>
            <button className={isAvailableBtnStyle} onClick={ () => bookShift(props.id)}>Book shift</button>
        </div>
    )
}

export default Shift;