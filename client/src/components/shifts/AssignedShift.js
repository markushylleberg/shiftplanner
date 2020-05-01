import React from 'react';
import './Shift.css';

const AssignedShift = (props) => {

    const startDatetime = new Date(props.startTime);
    const endDatetime = new Date(props.endTime);

    const startTimeMinutes = (startDatetime.getMinutes() < 10 ? '0' : '') + startDatetime.getMinutes();
    const endTimeMinutes = (endDatetime.getMinutes() < 10 ? '0' : '') + endDatetime.getMinutes();

    return (
        <div className="shift-entry">
            <p>{startDatetime.getDate()+'/'+startDatetime.getMonth()+' '+startDatetime.getHours()+':'+startTimeMinutes}</p>
            <p>{endDatetime.getDate()+'/'+endDatetime.getMonth()+' '+endDatetime.getHours()+':'+endTimeMinutes}</p>
            <p><b>{props.username}</b></p>
        </div>
    )
}

export default AssignedShift;