import React from 'react';
import Adapter from './Adapter';
import { withRouter } from 'react-router';
import { Menu } from 'semantic-ui-react';

const LogoutButton = ({ to = "/login", history }) => {
    return (
      <Menu.Item
        className="logout-button"
        position="right"
        onClick={() => {
          Adapter.logout();
          history.push(to);
        }}
      >
        Logout
      </Menu.Item>
    )
}

export default withRouter(LogoutButton);
