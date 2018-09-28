import React, { Component } from 'react';
import Adapter from './Adapter';
import { Form, Button } from 'semantic-ui-react'
import { setUser } from './actions';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';

class RegistrationForm extends Component {
  state = {
    username: "",
    password: "",
    first_name: "",
    last_name: "",
  }

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    })
  }

  handleSubmit = (event) => {
    event.preventDefault();

    fetch(`http://localhost:3000/api/v1/users/`, {
      method: 'POST',
      headers: {
        "Content-Type": 'application/json'
      },
      body: JSON.stringify(this.state)
    })
      .then(res => res.json())
      .then(json => {
        if (json.token) {
          localStorage.setItem('id', json.id);
          localStorage.setItem('token', json.token);
          Adapter.getUser()
          .then(user => {
            this.props.setUser(user);
          })
          this.props.history.push("/");
        } else {
          alert(json.errors)
        }

      })
  }

  render() {
    return (
      <div className="registration">
        <Form onSubmit={this.handleSubmit}>
          <Form.Field>
            <label htmlFor="username">Username</label>
            <input
              type="text"
              name="username"
              placeholder="Username"
              onChange={this.handleChange}
              value={this.state.username}
            />
          </Form.Field>

          <Form.Field>
            <label htmlFor="password">Password</label>
            <input
              type="password"
              name="password"
              placeholder="Password"
              onChange={this.handleChange}
              value={this.state.password}
            />
          </Form.Field>

          <Form.Field>
            <label htmlFor="first_name">First Name</label>
            <input
              type="text"
              name="first_name"
              placeholder="First Name"
              onChange={this.handleChange}
              value={this.state.first_name}
            />
          </Form.Field>
          <Form.Field>
            <label htmlFor="last_name">Last Name</label>
            <input
              type="text"
              name="last_name"
              placeholder="Last Name"
              onChange={this.handleChange}
              value={this.state.last_name}
            />
          </Form.Field>

          <Form.Field>
            <Button type="submit">Register</Button>
          </Form.Field>
        </Form>
      </div>
    )
  }
}

function mapDispatchToProps(dispatch) {
  return {
    setUser: (currentUser) => dispatch(setUser(currentUser)),
  }
}

export default withRouter(connect(null, mapDispatchToProps)(RegistrationForm));
