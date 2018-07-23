import React from 'react';
import Adapter from './Adapter';
import { withRouter } from 'react-router';
import withColor from '../hocs/withColor';

const LogoutButton = ({ to = "/login", history, color }) => {
  console.log(color);
    return (
      <button
        className="logout-button"
        style={{ backgroundColor: color }}
        onClick={() => {
          Adapter.logout();
          history.push(to);
        }}
      >
        Logout
      </button>
    )
}

export default withColor(withRouter(LogoutButton));
