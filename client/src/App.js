import React, { useState } from 'react';

import Login from './components/users/Login';
import Register from './components/users/Register';
import ShiftOverview from './components/shifts/ShiftOverview';
import AddShift from './components/shifts/AddShift';
import MyShifts from './components/shifts/MyShifts';
import ForgotPassword from './components/users/ForgotPassword';
import ResetPassword from './components/users/ResetPassword';

import './App.css';

import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';

import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavLink,
  NavItem,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from 'reactstrap';

const App = () => {

  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  const toggleLink = () => {
    if (isOpen === true) {
      setIsOpen(false)
    }
  };

  return (
    <Router>
      <div className="App">
          <div>
            <Navbar color="light" light expand="md">
                <NavbarBrand>Shift Planner</NavbarBrand>
                <NavbarToggler onClick={toggle} />
                <Collapse isOpen={isOpen} navbar>
                  <Nav className="mr-auto" navbar>
                    <NavItem>
                        <Link className="nav-link" onClick={toggleLink} to="/users/login">Login</Link>
                    </NavItem>
                    <NavItem>
                      <Link className="nav-link" onClick={toggleLink} to="/users/register" className="nav-link">Sign up</Link>
                    </NavItem>
                    <NavItem>
                      <Link className="nav-link" onClick={toggleLink} to="/shifts" className="nav-link">View shifts</Link>
                    </NavItem>
                    <NavItem>
                      <Link className="nav-link" onClick={toggleLink} to="/myshifts" className="nav-link">My shifts</Link>
                    </NavItem>
                    <NavItem>
                      <Link className="nav-link" onClick={toggleLink} to="/addshift" className="nav-link">Add shift</Link>
                    </NavItem>
                  </Nav>
                </Collapse>
              </Navbar>
          </div>
        </div>
        <div className="page-wrapper">
          <Switch>
            <Route exact path="/users/login">
              <Login />
            </Route>
            <Route exact path="/users/register">
              <Register />
            </Route>
            <Route exact path="/shifts">
              <ShiftOverview />
            </Route>
            <Route exact path="/myshifts">
              <MyShifts />
            </Route>
            <Route exact path="/addshift">
              <AddShift />
            </Route>
            <Route path="/users/resetpassword/:token">
              <ResetPassword />
            </Route>
            <Route exact path="/users/forgotpassword">
              <ForgotPassword />
            </Route>
          </Switch>
        </div>
    </Router>
  );
}

export default App;
