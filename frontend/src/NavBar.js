import React, { Fragment } from 'react';
import { NavLink } from 'react-router-dom';
import Adapter from './Adapter';
import { Menu } from 'semantic-ui-react';
import LogoutButton from './LogoutButton.js'
import Logo from './Logo.js'
import { Route } from 'react-router-dom';


const NavBar = (props) => {
  return (
    <header className="nav">
        { Adapter.isLoggedIn() ?
            <Menu style={{background: "none", flex: 1, WebkitTextStroke: "1px black", fontSize: "20pt"}}>
              <div className="left-menu">
                <Menu.Item as={NavLink} exact to="/">Home</Menu.Item>
                <Menu.Item as={NavLink} exact to="/profile">Profile</Menu.Item>
              </div>
              <Route path="/" component={(props) => <Logo {...props} />} />
              <LogoutButton />
            </Menu>
          :
            <Menu style={{background: "rgba(255, 255, 255, 0.5)", flex: 1, WebkitTextStroke: "1px black", fontSize: "20pt"}}>
              <Menu.Item style={{color: "white", fontWeight: "bold", WebkitTextStroke: "1px black"}} as={NavLink} exact to="/register">Register</Menu.Item>
              <Route path="/" component={(props) => <Logo {...props} />} />
              <Menu.Item style={{color: "white", fontWeight: "bold", WebkitTextStroke: "1px black"}} as={NavLink} exact to="/login">Login</Menu.Item>
            </Menu>
        }
    </header>
  )
}

export default NavBar;
