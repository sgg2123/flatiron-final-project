import React, { Component } from 'react';

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
          localStorage.setItem('username', json.username);
          localStorage.setItem('token', json.token);
          this.props.history.push("/");
        } else {
          alert(json.errors)
        }

      })
  }

  render() {
    return (
      <div className="registration">
        <form onSubmit={this.handleSubmit}>
          <label htmlFor="username">Username</label>
          <input
            type="text"
            name="username"
            placeholder="Username"
            onChange={this.handleChange}
            value={this.state.username}
          />
          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            placeholder="Password"
            onChange={this.handleChange}
            value={this.state.password}
          />
        <label htmlFor="password">First Name</label>
          <input
            type="text"
            name="first_name"
            placeholder="First Name"
            onChange={this.handleChange}
            value={this.state.first_name}
          />
        <label htmlFor="password">Last Name</label>
          <input
            type="text"
            name="last_name"
            placeholder="Last Name"
            onChange={this.handleChange}
            value={this.state.last_name}
          />
          <input type="submit" value="Register" />
        </form>
      </div>
    )
  }
}

export default RegistrationForm;
