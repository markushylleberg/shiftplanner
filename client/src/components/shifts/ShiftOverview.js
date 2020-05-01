import React, { useState, useEffect } from 'react';

import Shift from './Shift.js';
import Logout from '../users/Logout.js';
import Authentication from '../../auth/Authentication';

import './ShiftOverview.css';

const ShiftOverview = () => {

  const [shifts] = useState([]);
  const [isLoading, setLoading] = useState(true);
  
  useEffect( () => {
    async function fetchData() {
      await fetch('/shifts', {
        method: 'GET'
      })
      .then( res => res.json())
      .then( shiftsData => {
        // console.log(shiftsData);
        for (let i = 0; i < shiftsData.length; i++) {
          shifts.push(shiftsData[i]);
        }
        setLoading(false);
       })
    }
    fetchData();
  }, [shifts])
  
    return (
      <div>
        <div className="shiftoverview-container">
          <Authentication />
            <h1>View shifts</h1>
            <div className="shifts-desc">
              <p>Start time</p>
              <p>End time</p>
              <p>Book</p>
            </div>
            <div className="all-shifts mt">
                <h3>{ isLoading ? 'Loading' : '' }</h3>
                <h3>{ shifts.length === 0 ? 'Login to see available shifts' : '' }</h3>
                  {shifts.map( (shift, index) => (
                    <Shift key={index} id={shift.id} startTime={shift.start_datetime} endTime={shift.end_datetime} isAvailable={shift.is_available} />
                  ))}
            </div>
        </div>
            <Logout />
      </div>
    );
}

export default ShiftOverview;