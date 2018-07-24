import React, { Fragment } from 'react';
import { NavLink } from 'react-router-dom';
import Adapter from './Adapter';

// <NavLink activeClassName="selected" exact to="/">Home</NavLink>
const NavBar = (props) => {
  return (
    <header className="nav">
        { Adapter.isLoggedIn() ?
            <Fragment>
              <NavLink activeClassName="selected" exact to="/">Home</NavLink>
              <NavLink activeClassName="selected" exact to="/profile">Profile</NavLink>
              <button onClick={() => {
                  Adapter.logout();
                  props.history.push("/login");
                }}>Logout</button>
            </Fragment>
          :
            <Fragment>
              <NavLink activeClassName="selected" exact to="/register">Register</NavLink>
              <NavLink activeClassName="selected" exact to="/login">Login</NavLink>
            </Fragment>
        }
    </header>
  )
}

export default NavBar;
