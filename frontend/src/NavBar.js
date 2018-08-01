import React, { Fragment } from 'react';
import { NavLink } from 'react-router-dom';
import Adapter from './Adapter';
import { Menu } from 'semantic-ui-react';
import LogoutButton from './LogoutButton.js'

const NavBar = (props) => {
  return (
    <header className="nav">
        { Adapter.isLoggedIn() ?
            <Menu style={{background: "none", flex: 1, webkitTextStroke: "1px black", fontSize: "20pt"}}>
              <Menu.Item  as={NavLink} exact to="/">HOME</Menu.Item>
              <Menu.Item  as={NavLink} exact to="/profile">PROFILE</Menu.Item>
              <LogoutButton />
            </Menu>
          :
            <Menu style={{background: "none", flex: 1, webkitTextStroke: "1px black", fontSize: "20pt"}}>
              <Menu.Item style={{position: "fixed", left:'10%'}} as={NavLink} exact to="/register">Register</Menu.Item>
              <Menu.Item style={{position: "fixed", right:'10%'}} as={NavLink} exact to="/login">Login</Menu.Item>
            </Menu>
        }
    </header>
  )
}

export default NavBar;
