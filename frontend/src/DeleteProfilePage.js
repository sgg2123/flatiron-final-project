import React from 'react';
import Adapter from './Adapter'
import { Button } from 'semantic-ui-react'
import { withRouter } from 'react-router';
import { connect } from 'react-redux';

class DeleteProfilePage extends React.Component {
  handleDelete = (event) => {
    Adapter.deleteUser(this.props.currentUser)
    Adapter.logout();
    this.props.history.push('/');
  }

  handleCancel = () => {
    this.props.history.push('/profile');
  }

  render() {
    return (
      <div className="delete-profile-page">
        <h1>Are you sure, {this.props.currentUser.first_name}?</h1>
        <Button onClick={this.handleCancel}>Cancel</Button>
        <Button onClick={this.handleDelete}>Delete Account</Button>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    currentUser: state.currentUser,
  }
}

export default withRouter(connect(mapStateToProps, null)(DeleteProfilePage));
