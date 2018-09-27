import React from 'react';
import Adapter from './Adapter'
import { Button } from 'semantic-ui-react'
import { withRouter } from 'react-router';

class DeleteProfilePage extends React.Component {
  constructor() {
    super();

    this.state = {
      currentUser: {},
    }
  }

  componentDidMount = () => {
    Adapter.getUser()
    .then(user => {
      this.setState({ currentUser: user })
    })
  }

  handleDelete = (event) => {
    Adapter.deleteUser(this.state.currentUser)
    Adapter.logout();
    this.props.history.push('/');
  }

  handleCancel = () => {
    this.props.history.push('/profile');
  }

  render() {
    return (
      <div className="delete-profile-page">
        <h1>Are you sure?</h1>
        <Button onClick={this.handleCancel}>Cancel</Button>
        <Button onClick={this.handleDelete}>Delete Account</Button>
      </div>
    )
  }
}

export default withRouter(DeleteProfilePage);
