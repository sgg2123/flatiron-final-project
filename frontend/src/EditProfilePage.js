import React from 'react';
import Adapter from './Adapter'
import { Form, Button } from 'semantic-ui-react'
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import { setUser } from './actions';

class EditProfilePage extends React.Component {
  handleSubmit = (event) => {
    const username = event.target.username.value
    const firstName = event.target.first_name.value
    const lastName = event.target.last_name.value
    const password = event.target.password.value
    const updatedUser = {id: this.props.currentUser.id, username, first_name: firstName, last_name: lastName}

    Adapter.editUser(this.props.currentUser, username, firstName, lastName, password)
    .then(this.props.setUser(updatedUser))
    .then(this.props.history.push('/profile'))
  }

  render() {
    return (
      <div className="edit-profile-page">
        <Form onSubmit={(event)=>this.handleSubmit(event)}>
          <Form.Field>
            <label htmlFor="username">Username</label>
            <input
              type="text"
              name="username"
              defaultValue={this.props.currentUser.username}
            />
          </Form.Field>

          <Form.Field>
            <label htmlFor="first_name">First Name</label>
            <input
              type="text"
              name="first_name"
              defaultValue={this.props.currentUser.first_name}
            />
          </Form.Field>

          <Form.Field>
            <label htmlFor="last_name">Last Name</label>
            <input
              type="text"
              name="last_name"
              defaultValue={this.props.currentUser.last_name}
            />
          </Form.Field>

          <p></p>

          <Form.Field>
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              name="password"
              placeholder="Enter password to save changes"
            />
          </Form.Field>

          <Button type="submit">Update Profile</Button>

        </Form>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    currentUser: state.currentUser,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    setUser: (user) => dispatch(setUser(user)),
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(EditProfilePage));
