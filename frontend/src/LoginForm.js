import React, { Component } from 'react';
import Adapter from './Adapter';
import { Form, Button } from 'semantic-ui-react'
import { setUser } from './actions';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';

class LoginForm extends Component {
  state = {
    username: "",
    password: "",
  }

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    })
  }

  handleSubmit = (event) => {
    event.preventDefault();

    Adapter.login(this.state.username, this.state.password)
      .then(res => res.json())
      .then(json => {
        if (json.token) {
          localStorage.setItem('id', json.id);
          localStorage.setItem('token', json.token);
          Adapter.getUser()
          .then(user => {
            this.props.setUser(user);
          })
          .then(this.props.history.push("/"));
        } else {
          alert(json.errors)
        }
      });
  }

  render() {
    return (
      <div className="login">
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
            <Button type="submit">Login</Button>
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

export default withRouter(connect(null, mapDispatchToProps)(LoginForm));
